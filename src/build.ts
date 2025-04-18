import { promises as fs } from "fs";
import { basename, dirname, join, resolve } from "path";
import Config from "./config";

let YAML;

export async function createBuildFile(): Promise<any> {
	const editor = atom.workspace.getActiveTextEditor();

	if (!editor) {
		atom.notifications.addWarning(`No active editor`, {
			dismissable: false,
		});

		return;
	} else if (editor.getGrammar().scopeName !== "source.nsis") {
		atom.notifications.addWarning(`Unsupported document type`, {
			dismissable: false,
		});

		return;
	}

	const script = editor.getPath();
	const { isHeaderFile } = await import("./util");

	if (isHeaderFile(script)) {
		const processHeaders = String(Config.get("processHeaders"));

		if (processHeaders === "Disallow") {
			const notification = atom.notifications.addWarning(
				"Creating build-files for headers is blocked by default. You can allow this in the package settings, or mute this warning.",
				{
					dismissable: true,
					buttons: [
						{
							text: "Open Settings",
							className: "icon icon-gear",
							async onDidClick() {
								notification.dismiss();

								await atom.workspace.open(
									`atom://config/packages/language-nsis`,
									{
										pending: true,
										searchAllPanes: true,
									},
								);

								return;
							},
						},
						{
							text: "Cancel",
							onDidClick() {
								notification.dismiss();

								return;
							},
						},
					],
				},
			);

			atom.beep();
			return;
		} else if (processHeaders === "Disallow & Never Ask Me") {
			atom.beep();
			return;
		}
	}

	const currentFilePath =
		atom.workspace?.getActiveTextEditor()?.getPath() || null;

	if (!currentFilePath) {
		const notification = atom.notifications.addWarning("File not saved", {
			dismissable: true,
			detail:
				"You need to save this file manually before you can create a build-file",
			buttons: [
				{
					text: "OK",
					onDidClick() {
						notification.dismiss();
					},
				},
			],
		});

		return;
	}

	const scriptFile = basename(currentFilePath);
	const currentPath = dirname(currentFilePath);
	const buildFileSyntax = String(Config.get("buildFileSyntax"));
	const buildFileName = `.atom-build.${buildFileSyntax.toLowerCase()}`;
	const buildFilePath = join(currentPath, buildFileName);

	const { fileExists } = await import("./util");

	if (await fileExists(buildFilePath)) {
		const fileExistsNotification = atom.notifications.addWarning(
			"File exists",
			{
				dismissable: true,
				detail: "Do you really want to overwrite your existing build file?",
				buttons: [
					{
						text: "Overwrite",
						async onDidClick() {
							fileExistsNotification.dismiss();

							saveBuildFile({
								script: scriptFile,
								syntax: buildFileSyntax,
								fileName: buildFileName,
								filePath: buildFilePath,
							});

							return;
						},
					},
					{
						text: "Abort",
						onDidClick() {
							fileExistsNotification.dismiss();

							return;
						},
					},
				],
			},
		);
	} else {
		saveBuildFile({
			script: scriptFile,
			syntax: buildFileSyntax,
			fileName: buildFileName,
			filePath: buildFilePath,
		});
	}
}

async function saveBuildFile(options) {
	const { findPackagePath, getMakensisPath, isLoadedAndActive } = await import(
		"./util"
	);
	const useWineToRun = Config.get("useWineToRun");
	const hasWineProvider = isLoadedAndActive("build-makensis-wine");
	const wineProviderPath = (await findPackagePath("build-makensis-wine"))[0];

	const args = [];

	const verbosity = parseInt(
		String(Config.get("compilerOptions.verbosity")),
		10,
	);
	if (verbosity) args.push(`-V${verbosity}`);

	const strictMode = Config.get("compilerOptions.strictMode");
	if (strictMode) args.push("-WX");

	const buildFile = {
		name: options.scriptFile,
		cmd:
			useWineToRun && hasWineProvider
				? resolve(wineProviderPath, "lib", "makensis-wine.sh")
				: await getMakensisPath(),
		sh: useWineToRun && hasWineProvider,
		args: [...args, "{FILE_ACTIVE}"],
		cwd: "{FILE_ACTIVE_PATH}",
		errorMatch:
			'(\\r?\\n)(?<message>.+)(\\r?\\n)Error in script "(?<file>[^"]+)" on line (?<line>\\d+) -- aborting creation process',
		warningMatch:
			"[^!]warning: (?<message>.*) \\((?<file>(\\w{1}:)?[^:]+):(?<line>\\d+)\\)",
	};

	if (options.syntax === "yaml") {
		YAML = await import("yaml");
	}

	const stringifier =
		options.syntax === "yaml"
			? YAML.stringify(buildFile)
			: JSON.stringify(buildFile, null, 2);

	// Save build file
	try {
		await fs.writeFile(options.filePath, stringifier, "utf-8");
	} catch (error) {
		console.log(error);
		atom.notifications.addError(`Failed to write ${options.fileName}`, {
			detail: error,
			dismissable: false,
		});

		return;
	}

	await atom.workspace.open(options.filePath);
}

import { showHelp } from "./makensis";

export default {
	async init(): Promise<void> {
		const SelectListView = (await import("atom-select-list")).default;

		this.selectListView = new SelectListView({
			emptyMessage: "No command matches your search.",
			items: [],

			filterKeyForItem(item: string): string {
				return item;
			},

			elementForItem(item: string): HTMLElement {
				const element = document.createElement("li");
				const html = item;
				element["innerHTML"] = html;

				return element;
			},

			didConfirmSelection: async (item) => {
				this.cancel();

				const { openURL } = await import("./util");
				await openURL(String(item));
			},

			didCancelSelection: () => {
				this.cancel();
			},
		});

		this.selectListView.element.classList.add("nsis-command-list");
	},

	dispose(): void {
		this.cancel();
		this.selectListView.destroy();
	},

	cancel(): void {
		if (this.panel != null) {
			this.panel.destroy();
		}

		this.panel = null;

		if (this.previouslyFocusedElement) {
			this.previouslyFocusedElement.focus();
			this.previouslyFocusedElement = null;
		}
	},

	attach(): void {
		this.previouslyFocusedElement = document.activeElement;

		if (this.panel == null) {
			this.panel = atom.workspace.addModalPanel({ item: this.selectListView });
		}

		this.selectListView.focus();
		this.selectListView.reset();
	},

	async toggle(): Promise<void> {
		if (this.panel != null) {
			this.cancel();
		} else {
			await showHelp(this.selectListView);
			this.attach();
		}
	},
};

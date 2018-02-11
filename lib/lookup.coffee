SelectListView = require "atom-select-list"

module.exports = Lookup =
  init: ->
    @selectListView = new SelectListView(
      emptyMessage: "No command matches your search."
      items: []

      filterKeyForItem: (item) -> item

      elementForItem: (item) ->
        element = document.createElement "li"
        html = item
        element.innerHTML = html
        element

      didConfirmSelection: (item) =>
        { openURL } = require "./util"

        @cancel()
        openURL(item)

      didCancelSelection: () =>
        @cancel()
    )

    @selectListView.element.classList.add "nsis-command-list"

  dispose: ->
    @cancel()
    @selectListView.destroy()

  cancel: ->
    if @panel?
      @panel.destroy()

    @panel = null

    if @previouslyFocusedElement
      @previouslyFocusedElement.focus()
      @previouslyFocusedElement = null

  attach: ->
    @previouslyFocusedElement = document.activeElement

    if not @panel?
      @panel = atom.workspace.addModalPanel(item: @selectListView)

    @selectListView.focus()
    @selectListView.reset()

  toggle: ->
    if @panel?
      @cancel()
    else
      { showHelp } = require "./makensis"

      showHelp(@selectListView)
      @attach()

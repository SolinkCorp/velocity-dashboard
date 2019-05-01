React = require 'react'
_ = require 'underscore'
ReactCSSTransitionGroup = require 'react-addons-css-transition-group'
{DragDropContext} = require 'react-dnd'
dndBackend = require 'react-dnd-html5-backend'

defaults =
    widgetWidth: 250
    widgetHeight: 250
    margin: 15

Dashboard = React.createClass
  displayName: 'Dashboard'

  getInitialState: ->
    boardWidth: 0

  componentDidMount: ->
    window.addEventListener 'resize', @getBoardWidth, false;
    @setBoardWidth()

  componentDidUpdate: ->
    @setBoardWidth()

  componentWillUnmount: ->
    window.removeEventListener 'resize', @getBoardWidth;

  getBoardWidth: ->
    # Debounce the resizing calculation
    clearTimeout @resizeTimeout
    @resizeTimeout = setTimeout @setBoardWidth, 250

  setBoardWidth: ->
    boardWidth = if !@refs.dashboard then 0 else @refs.dashboard.getBoundingClientRect().width
    if @state.boardWidth != boardWidth
      @setState boardWidth: boardWidth

  childComponentsForConfig: (components, widgets, sizeConfig) ->
    { menu } = @props
    { boardWidth } = @state
    componentsById = getComponentsById(components)
    instances = widgets.map (widget, index) =>
      if componentsById[widget.widgetId]
        React.cloneElement componentsById[widget.widgetId],
          key: index
          onHide: => @hideWidget(index)
          config: widget.config
          index: index
          sizeConfig: sizeConfig
          onDrop: @moveWidget
          widgetTitle: if widget.config then widget.config.title else null
          widgetDescription: widget.description
          widgetMenu: menu
          boardWidth: boardWidth
    _(instances).compact()

  hideWidget: (index) ->
    widgets = [].concat @props.widgets

    widgets.splice(index, 1)

    @props.onWidgetsChange widgets

  widgetChange: (index, newConfig) ->
    widgets = [].concat @props.widgets

    widgets[index] =
      widgetId: widgets[index].widgetId
      config: newConfig

    @props.onWidgetsChange allConfigs

  moveWidget: (sourceIndex, targetIndex) ->
    widgets = [].concat @props.widgets
    if sourceIndex < targetIndex
      targetIndex--
    widgets.splice(targetIndex, 0, widgets.splice(sourceIndex, 1)[0]);
    @props.onWidgetsChange widgets

  render: ->
    {
      children,
      title,
      className,
      widgets,
      widgetHeight = defaults.widgetHeight,
      widgetWidth = defaults.widgetWidth,
      widgetMargin = defaults.margin,
      componentWidthForTesting,
    } = @props
    sizeConfig = {widgetHeight, widgetWidth, widgetMargin}

    childrenForCurrentConfig = @childComponentsForConfig(children, widgets, sizeConfig)

    <div className={"dashboard #{className}"} ref="dashboard">
      <section
        className={"dashboard-content"}
        style={
          gridGap: widgetMargin
          gridAutoRows: widgetHeight
          gridTemplateColumns: "repeat(auto-fill, minmax(#{widgetWidth}px, 1fr))"
        }
      >
        {childrenForCurrentConfig}
      </section>
      <ReactCSSTransitionGroup
        transitionName="widget-panel"
        transitionEnterTimeout={500}
        transitionLeaveTimeout={500}
        transitionEnter={true}
        transitionLeave={true}
      >
      </ReactCSSTransitionGroup>
    </div>

module.exports = DragDropContext(dndBackend)(Dashboard)
module.exports.defaults = defaults

getComponentsById = (components) ->
  byId = {}
  components.forEach (comp) ->
    byId[comp.props.id] = comp
  byId

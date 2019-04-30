React = require 'react'
Title = require './Title'
Layout = require './Layout'
componentWidthMixin = require 'react-component-width-mixin'
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

  mixins: [componentWidthMixin]

  # optimize re-render to exclude width changes unless they affect column count
  shouldComponentUpdate: (nextProps, nextState) ->
    @layout.reset(nextState.componentWidth)
    cc1 = @layout.columnCount()
    @layout.reset(@state.componentWidth)
    cc2 = @layout.columnCount()
    nextProps != @props or cc1 != cc2

  childComponentsForConfig: (components, widgets, sizeConfig, columnCount) ->
    { menu } = @props
    componentsById = getComponentsById(components)
    instances = widgets.map (widget, index) =>
      if componentsById[widget.widgetId]
        withPositions = @layout.setWidgetPosition(componentsById[widget.widgetId], widget.config)
        React.cloneElement withPositions,
          key: index
          onHide: => @hideWidget(index)
          config: widget.config
          index: index
          sizeConfig: sizeConfig
          columnCount: columnCount
          onDrop: @moveWidget
          widgetTitle: if widget.config then widget.config.title else null
          widgetDescription: widget.description
          widgetMenu: menu
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
      titleHeight = 50,
      maxColumns = 5,
      componentWidthForTesting,
    } = @props
    # {moveMode, componentWidth} = @state
    { componentWidth } = @state
    sizeConfig = {widgetHeight, widgetWidth, widgetMargin, titleHeight, maxColumns}

    @layout = layout = new Layout(sizeConfig)
    layout.reset(componentWidthForTesting or componentWidth)
    childrenForCurrentConfig = @childComponentsForConfig(children, widgets, sizeConfig, layout.columnCount())

    contentWidth = layout.columnCount() * (widgetWidth + widgetMargin) - widgetMargin
    if layout.columnCount() is 1
        contentWidth = '90%'

    <div className={"dashboard #{className}"}>
      <section className={"dashboard-content columns-#{layout.columnCount()}"} style={width: contentWidth}>
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

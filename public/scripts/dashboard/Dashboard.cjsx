React = require 'react'
Title = require './Title'
Layout = require './Layout'
componentWidthMixin = require 'react-component-width-mixin'
_ = require 'underscore'
ReactCSSTransitionGroup = require 'react-addons-css-transition-group'
AddWidgetPanel = require './AddWidgetPanel'
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
    nextProps != @props or nextState.editMode != @state.editMode or cc1 != cc2

  getInitialState: ->
    editMode: false

  childComponentsForConfig: (components, widgets, editMode, sizeConfig, columnCount) ->
    { menu } = @props
    componentsById = getComponentsById(components)
    instances = widgets.map (widget) =>
      if componentsById[widget.widgetId]
        withPositions = @layout.setWidgetPosition(componentsById[widget.widgetId], widget.config)
        React.cloneElement withPositions,
          key: widget.instanceId
          onHide: => @hideWidget(widget.instanceId)
          config: widget.config
          instanceId: widget.instanceId
          sizeConfig: sizeConfig
          columnCount: columnCount
          onDrop: @moveWidget
          widgetTitle: if widget.config then widget.config.title else null
          widgetDescription: widget.description
          widgetMenu: menu
    _(instances).compact()

  hideWidget: (instanceId) ->
    allConfigs = [].concat @props.widgets

    index = _(allConfigs).findIndex (widgets) ->
      widgets.instanceId is instanceId

    allConfigs.splice(index, 1)

    @props.onWidgetsChange allConfigs

  widgetChange: (instanceId, newConfig) ->
    allConfigs = [].concat @props.widgets

    index = _(allConfigs).findIndex (widgets) ->
      widgets.instanceId is instanceId

    allConfigs[index] =
      widgetId: allConfigs[index].widgetId
      instanceId: instanceId
      config: newConfig

    @props.onWidgetsChange allConfigs

  addWidget: (id, config) ->
    console.warn config
    widgets = [].concat @props.widgets
    widgets.push
      widgetId: id
      instanceId: Math.floor(Math.random() * 100000)
      config: if config then config else {}
    @props.onWidgetsChange widgets

  moveWidget: (draggingWidgetId, targetWidgetId) ->
    widgets = [].concat @props.widgets
    targetIndex = _(widgets).findIndex (widget) -> widget.instanceId is targetWidgetId
    sourceIndex = _(widgets).findIndex (widget) -> widget.instanceId is draggingWidgetId
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
      editMode,
      componentWidthForTesting,
    } = @props
    # {editMode, moveMode, componentWidth} = @state
    { componentWidth } = @state
    children = [].concat(children)
    sizeConfig = {widgetHeight, widgetWidth, widgetMargin, titleHeight, maxColumns}

    @layout = layout = new Layout(sizeConfig)
    layout.reset(componentWidthForTesting or componentWidth)
    childrenForCurrentConfig = @childComponentsForConfig(children, widgets, editMode, sizeConfig, layout.columnCount())

    contentWidth = layout.columnCount() * (widgetWidth + widgetMargin) - widgetMargin
    if layout.columnCount() is 1
        contentWidth = '90%'

    <div className={"dashboard #{className} #{if editMode then 'editing' else ''}"}>
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
        {
          if editMode
            addPanelChildren = children.map (child) =>
              preview = if child.props.previewComp then React.createElement(child.props.previewComp) else <div className='default-preview' key={child.props.id}>No Preview</div>
              <div className='widget-preview' key={child.props.id} onClick={=>@addWidget(child.props.id, child.props.defaultConfig)}>
                <div className='no-click'>
                  {preview}
                  <i className="add-icon zmdi zmdi-add" />
                </div>
              </div>
            <AddWidgetPanel>{addPanelChildren}</AddWidgetPanel>
        }
      </ReactCSSTransitionGroup>
    </div>

module.exports = DragDropContext(dndBackend)(Dashboard)
module.exports.defaults = defaults

getComponentsById = (components) ->
  byId = {}
  components.forEach (comp) ->
    byId[comp.props.id] = comp
  byId

React = require 'react'
{drop, target, collectDropTarget, ItemTypes, widgetSource, collectDragable} = require './dnd'
{DropTarget, DragSource} = require 'react-dnd'

Widget = React.createClass

    displayName: 'Widget'

    propTypes:
        contentComp: React.PropTypes.func
        configComp: React.PropTypes.func
        previewComp: React.PropTypes.func

    getInitialState: ->
        editMode: false

    toggleEditMode: ->
        @setState editMode: !@state.editMode

    componentWillReceiveProps: (nextProps) ->
        if !nextProps.dashEditable and @state.editMode
            @setState editMode: false

    hide: ->

    render: ->
        {instanceId, height, width, col, row, dashEditable, draggable, config, onConfigChange, onHide, contentComp, configComp, sizeConfig, columnCount} = @props
        {connectDragSource, isDragging, connectDropTarget, isOver} = @props
        width = config?.width or width or 1
        height = config?.height or height or 1
        {editMode} = @state
        {widgetHeight, widgetWidth, widgetMargin, titleHeight} = sizeConfig

        styles =
            height: height * (widgetHeight + widgetMargin) - widgetMargin
            width: if columnCount is 1 then '100%' else width * (widgetWidth + widgetMargin) - widgetMargin
            left: Math.max(0, col * (widgetWidth + widgetMargin))
            top: row * (widgetHeight + widgetMargin)

        classes = ['widget']
        classes.push 'draggable' if draggable
        classes.push 'drag-over' if isOver

        rendered =
            <div className={classes.join(' ')} style={styles}>
                {
                  if isOver
                      <div className='drop-prompt' style={height: widgetHeight}/>
                }
                <div className='widget-inner'>
                  <section className='action-bar'>
                    {
                      if dashEditable
                        if editMode
                            <a className='action-button edit-widget-button close-button' onClick={@toggleEditMode}>
                              <i className='zmdi zmdi-check'></i>
                            </a>
                        else
                          <span>
                            {
                              if configComp
                                <a className='action-button edit-widget-button' onClick={@toggleEditMode}>
                                  <i className='zmdi zmdi-settings'></i>
                                </a>
                            }
                            <a className='action-button hide-widget-button' onClick={onHide}>
                              <i className='zmdi zmdi-close'></i>
                            </a>
                          </span>
                    }
                  </section>
                  {
                    comp = if dashEditable and editMode
                        if configComp
                            <div>
                                <div className='config-comp'>{React.createElement(configComp, {instanceId, config, onConfigChange})}</div>
                                <i className='zmdi zmdi-settings background-watermark'></i>
                            </div>
                        else
                            <div/>
                    else
                        if contentComp then React.createElement(contentComp, {instanceId, config}) else <div/>
                  }
                </div>
            </div>

        if draggable
            connectDragSource(connectDropTarget(rendered))
        else
            rendered

module.exports = DragSource(ItemTypes.WIDGET, widgetSource, collectDragable)(DropTarget(ItemTypes.WIDGET, target, collectDropTarget)(Widget))

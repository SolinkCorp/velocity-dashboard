React = require 'react'
{
  drop,
  target,
  collectDropTarget,
  ItemTypes,
  widgetSource,
  collectDragable,
  connectDragLayer
} = require './dnd'
{
  DropTarget,
  DragSource,
  DragLayer
} = require 'react-dnd'


Widget = React.createClass
  displayName: 'Widget'

  propTypes:
    contentComp: React.PropTypes.func

  getInitialState: ->
    showInfo: false
    showMenu: false
    isReady: false

  toggleInfo: ->
    { showInfo } = @state

    if !showInfo
      document.addEventListener('click', @closeInfo)

    @setState
      showInfo: !showInfo
      showMenu: false

  closeInfo: ->
    document.removeEventListener('click', @closeInfo)
    @setState showInfo: false

  toggleMenu: ->
    { showMenu } = @state

    if !showMenu
      document.addEventListener('click', @closeMenu)

    @setState
      showMenu: !showMenu
      showInfo: false

  closeMenu: ->
    document.removeEventListener('click', @closeMenu)
    @setState showMenu: false

  render: ->
    {
      instanceId,
      height,
      width,
      col,
      row,
      config,
      onHide,
      contentComp,
      sizeConfig,
      columnCount,
      connectDragSource,
      connectDropTarget,
      connectDragPreview,
      isDragging,
      isOver,
      widgetTitle,
      widgetDescription,
      widgetMenu,
    } = @props
    { showMenu, showInfo, isReady } = @state

    { widgetHeight, widgetWidth, widgetMargin, titleHeight } = sizeConfig
    width = config?.width or width or 1
    height = config?.height or height or 1

    styles =
      height: height * (widgetHeight + widgetMargin) - widgetMargin
      width: if columnCount is 1 then '100%' else width * (widgetWidth + widgetMargin) - widgetMargin
      left: Math.max(0, col * (widgetWidth + widgetMargin))
      top: row * (widgetHeight + widgetMargin)

    classes = ['widget']
    classes.push 'is-dragging' if isDragging
    classes.push 'drag-over' if isOver

    infoClass = ['info']
    infoClass.push 'active' if showInfo
    menuClass = ['menu']
    menuClass.push 'active' if showMenu

    rendered =
      <div className={classes.join(' ')} style={styles}>
        {
          if isOver
            <div className='drop-prompt' style={height: widgetHeight}/>
        }
        <div className='widget-inner'>
          {
            connectDragSource(
              <header className='widget-header draggable'>
                {
                  if widgetTitle
                    <h3 className='widget-title'>{ widgetTitle }</h3>
                }
                <section className='action-bar'>
                  {
                    if widgetDescription
                      <span className='action'>
                        <a className='action-button hide-widget-button' onClick={@toggleInfo}>
                          <i className='zmdi zmdi-info_outline'></i>
                        </a>
                        <p className={infoClass.join(' ')}>
                          { widgetDescription }
                        </p>
                      </span>
                  }
                  {
                    if widgetMenu
                      <span className='action'>
                        <a className='action-button hide-widget-button' onClick={@toggleMenu}>
                          <i className='zmdi zmdi-uniF19B'></i>
                        </a>
                        <ul className={menuClass.join(' ')}>
                          {
                            widgetMenu.map (item, index) ->
                              <li key={index}>
                                <a onClick={()-> item.handler(instanceId)}>{ item.title }</a>
                              </li>
                          }
                        </ul>
                      </span>
                  }
                </section>
              </header>
            )
          }
          {
            if contentComp
              React.createElement(contentComp, {instanceId, config})
          }
        </div>
      </div>

    connectDropTarget(connectDragPreview(rendered))

dragLayer = DragLayer((connectDragLayer))(Widget)
dropTarget = DropTarget(ItemTypes.WIDGET, target, collectDropTarget)(dragLayer)
dragSource = DragSource(ItemTypes.WIDGET, widgetSource, collectDragable)
module.exports = dragSource(dropTarget)

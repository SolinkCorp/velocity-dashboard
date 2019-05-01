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
      boardWidth,
      col,
      config,
      connectDragPreview,
      connectDragSource,
      connectDropTarget,
      contentComp,
      height,
      index,
      isDragging,
      isOver,
      onHide,
      row,
      sizeConfig,
      widgetDescription,
      widgetMenu,
      widgetTitle,
      width,
    } = @props
    { showMenu, showInfo, isReady } = @state

    { widgetHeight, widgetWidth, widgetMargin } = sizeConfig
    width = config?.width or width or 1
    height = config?.height or height or 1
    promptHeight = height * (widgetHeight + widgetMargin) - widgetMargin

    # Ensure widget only spans as many columns as are available, at most
    widgetSpan = width
    spanWidth = widgetSpan * (widgetWidth + widgetMargin) - widgetMargin
    while 0 < boardWidth < spanWidth
      widgetSpan--
      spanWidth = widgetSpan * (widgetWidth + widgetMargin) - widgetMargin

    styles =
      gridRow: "span #{height}"
      gridColumn: "span #{widgetSpan}"

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
            <div className='drop-prompt' style={height: promptHeight}/>
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
                            widgetMenu.map (item, menuIndex) ->
                              <li key={menuIndex} className={item.type}>
                                {
                                  if item.title && item.type is 'action'
                                    <a onClick={()-> item.handler(index)}>{ item.title }</a>
                                }
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
              React.createElement(contentComp, {index, config})
          }
        </div>
      </div>

    connectDropTarget(connectDragPreview(rendered))

dragLayer = DragLayer((connectDragLayer))(Widget)
dropTarget = DropTarget(ItemTypes.WIDGET, target, collectDropTarget)(dragLayer)
dragSource = DragSource(ItemTypes.WIDGET, widgetSource, collectDragable)
module.exports = dragSource(dropTarget)

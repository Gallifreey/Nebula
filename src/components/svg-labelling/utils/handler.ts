import type { Options } from '@antv/x6'
import { Graph } from '@antv/x6'
import { Transform } from '@antv/x6-plugin-transform'
import { Selection } from '@antv/x6-plugin-selection'
import { History } from '@antv/x6-plugin-history'
import type { BBOXEntry, SizeType, entryType } from '~@/types/history'
import { hexToRgba, updateByUniqueID } from '~@/utils/tools'
import Bus from '~@/utils/bus'

const history = useHistoryStore()
const config = useConfigStore()
const buffer = useBufferStore()
const stack: Array<[string, any]> = []
const MENU_PADDING = 10
export const BACKGROUND_ID = 'bg_image'
export const GRAPH_OPTIONS: Omit<Partial<Options.Manual>, 'container'> = {
  grid: {
    size: 1,
  },
  mousewheel: {
    enabled: true,
    zoomAtMousePosition: true,
    modifiers: 'ctrl',
    minScale: 0.1,
    maxScale: 5,
  },
  background: {
    color: '#f5f5f5',
  },
  panning: {
    enabled: true,
    modifiers: 'ctrl',
  },
  translating: {
    restrict: {
      x: 0,
      y: 0,
      width: 1005,
      height: 671,
    },
  },
  interacting: {
    nodeMovable(view: any) {
      return view.cell.id !== BACKGROUND_ID
    },
  },
}
export function graphInit(container: HTMLElement) {
  const graph = new Graph({
    container,
    ...GRAPH_OPTIONS,
  })
  registerPlugins(graph)
  registerNodes()
  registerEvents(graph)
  registerKeys(container, graph)
  return graph
}

function registerPlugins(graph: Graph) {
  // register all plugins
  graph.use(
    new Transform({
      resizing: {
        restrict: true,
        enabled(node: any) {
          return node.id !== BACKGROUND_ID
        },
      },
    }),
    new Selection({
      enabled: true,
      multiple: true,
      rubberband: true,
      movable: true,
      showNodeSelectionBox: true,
    }),
    new History({
      enabled: true,
    }),
  )
}

function registerEvents(graph: Graph) {
  // register all events
  const setting = history.setting
  graph.on('node:click', ({ view, node }) => {
    if (view.cell.isNode() && view.cell.id !== BACKGROUND_ID) {
      setting.clicked = true
      const pos = graph.localToGraph(view.cell.getBBox())
      const bbox = view.container.getBoundingClientRect()
      setting.popover = true
      setting.menuPos = {
        x: pos.x + bbox.width + MENU_PADDING,
        y: pos.y,
      }
      buffer.selectedEntry = node
    }
    else {
      setting.clicked = false
      setting.popover = false
    }
  })
  graph.on('node:mousedown', ({ view, node }) => {
    if (node.id === BACKGROUND_ID) {
      history.setting.labelling = true
      const bbox = view.container.getBoundingClientRect()
      history.setSelecionPos({
        x: bbox.x,
        y: bbox.y,
      }, 'start')
      handleSelection(graph)
    }
    else {
      node.toFront()
    }
  })
  graph.on('node:mousemove', ({ view }) => {
    if (history.isLabelling()) {
      const bbox = view.container.getBoundingClientRect()
      history.setSelecionPos({
        x: bbox.x,
        y: bbox.y,
      }, 'end')
      handleSelectionMove(graph)
    }
  })
  graph.on('node:mouseup', () => {
    history.setting.labelling = false
  })
  graph.on('node:contextmenu', ({ x, y }) => {
    if (config.get('currentPGType') === 'classification') {
      setting.popover = true
      setting.menuPos = {
        x: x + config.get('contextMenuWidth') / 2,
        y,
      }
    }
  })
  graph.on('node:resizing', () => {
    setting.popover = false
  })
  graph.on('node:moved', ({ view }) => {
    if (setting.clicked && view.cell.isNode() && view.cell.id !== BACKGROUND_ID) {
      const pos = graph.localToGraph(view.cell.getBBox())
      const bbox = view.container.getBoundingClientRect()
      setting.popover = true
      setting.menuPos = {
        x: pos.x + bbox.width + MENU_PADDING,
        y: pos.y,
      }
    }
    else {
      setting.popover = false
    }
  })
  graph.on('node:resized', ({ view }) => {
    if (view.cell.isNode() && view.cell.id !== BACKGROUND_ID) {
      const pos = graph.localToGraph(view.cell.getBBox())
      const bbox = view.container.getBoundingClientRect()
      setting.popover = true
      setting.menuPos = {
        x: pos.x + bbox.width + MENU_PADDING,
        y: pos.y,
      }
    }
    else {
      setting.popover = false
    }
  })
  graph.on('node:mouseenter', ({ node }) => {
    if (node && node.id !== BACKGROUND_ID) {
      stack.push(['rect/stroke', node.getAttrs().rect.stroke])
      stack.push(['rect/strokeWidth', node.getAttrs().rect.strokeWidth])
      node.attr('rect/stroke', 'blue')
      node.attr('rect/strokeWidth', 2)
    }
  })
  graph.on('node:mouseleave', ({ node }) => {
    if (node && node.id !== BACKGROUND_ID) {
      node.attr(stack[0][0], stack[0][1])
      node.attr(stack[1][0], stack[1][1])
    }
  })
  graph.on('node:change:position', ({ node }) => {
    updateByUniqueID(buffer.currentData, 'bid', node.data.id, ['x', 'y'], [node.position().x, node.position().y])
  })
  graph.on('node:change:size', ({ node }) => {
    updateByUniqueID(buffer.currentData, 'bid', node.data.id, ['height', 'width'], [node.size().width, node.size().height])
  })
}

function registerNodes() {
  // register all nodes
}

function registerKeys(container: HTMLElement, graph: Graph) {
  // register all keys
  container.setAttribute('tabindex', '0')
  container.addEventListener('keyup', (e: KeyboardEvent) => {
    const key = e.key
    switch (key) {
      case 'ArrowRight':
        Bus.emit('on-right-press')
        break
      case 'ArrowLeft':
        Bus.emit('on-left-press')
        break
      case 's':
      case 'S':
        Bus.emit('on-save-press')
        break
      case 'a':
      case 'A':
        Bus.emit('on-node-add', graph)
        break
    }
  })
}

function switchBackground(graph: Graph, url: string, size: SizeType) {
  graph.clearCells()
  addNode(graph, {
    shape: 'image',
    x: 0,
    y: 0,
    width: size.width,
    height: size.height,
    imageUrl: url,
    zIndex: -1,
    id: BACKGROUND_ID,
  })
  // 初始化节点
  initNodes(graph)
}

export function switchToNext(graph: Graph, url: string, size: SizeType) {
  // 保存历史
  const nodes = graph.getNodes().filter((node) => {
    return node.id !== BACKGROUND_ID
  })
  if (nodes) {
    for (const node of nodes)
      console.log(node.getBBox())
  }
  switchBackground(graph, url, size)
  graph.centerContent()
}

export function addNode(graph: Graph, attrs: any) {
  graph.addNode(attrs)
}

export function handleSelection(graph: Graph) {
  graph.addNode({
    id: 'selection',
    shape: 'rect',
    position: {
      x: history.setting.selectionPos.start.x,
      y: history.setting.selectionPos.start.y,
    },
    size: {
      height: 0,
      width: 0,
    },
    attrs: {
      rect: {
        'fill': 'blue',
        'stroke': 'blue',
        'strokeWidth': 1,
      },
    },
  })
}

export function handleSelectionMove(graph: Graph) {
  const node = graph.getCellById('selection')
  if (node) {
    node.attr('size', {
      height: 10,
      width: 10,
    })
  }
}

Bus.on('on-node-add', (graph: Graph) => {
  if (config.get('currentPGType') === 'detection')
    createBBOX(graph)
})

function createBBOX(graph: Graph, x: number = 0, y: number = 0, height: number = 100, width: number = 100, color: string = '#6565ff', text: string = '新建标签', id: number = -1) {
  const node = {
    shape: 'rect',
    position: {
      x,
      y,
    },
    size: {
      height,
      width,
    },
    attrs: {
      rect: {
        'fill': hexToRgba(color, 0.5),
        'stroke': 'black',
        'strokeWidth': 1,
      },
      text: {
        'fontSize': 14,
        'fill': 'white',
        'textAnchor': 'middle',
        'textVerticalAnchor': 'middle',
        'text': text,
      },
    },
    data: {
      id,
      type: 'bbox',
    },
  }
  addNode(graph, node)
}

function initNodes(graph: Graph) {
  const currentData = buffer.currentData
  if (currentData) {
    for (const label of currentData)
      createBBOX(graph, label.x, label.y, label.width, label.height, label.color, label.name, label.bid)
  }
}

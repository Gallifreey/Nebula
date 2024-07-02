import type { Options } from '@antv/x6'
import { Graph } from '@antv/x6'
import { Transform } from '@antv/x6-plugin-transform'
import { Selection } from '@antv/x6-plugin-selection'
import { History } from '@antv/x6-plugin-history'
import { Keyboard } from '@antv/x6-plugin-keyboard'
import type { SizeType, entryType } from '~@/types/history'
import { hexToRgba } from '~@/utils/tools'

const history = useHistoryStore()
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
  registerKeys()
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
    new Keyboard({
      enabled: true,
    }),
  )
}

function registerEvents(graph: Graph) {
  // register all events
  const setting = history.setting
  graph.on('node:click', ({ view }) => {
    if (view.cell.isNode() && view.cell.id !== BACKGROUND_ID) {
      setting.clicked = true
      const pos = graph.localToGraph(view.cell.getBBox())
      const bbox = view.container.getBoundingClientRect()
      setting.popover = true
      setting.menuPos = {
        x: pos.x + bbox.width + MENU_PADDING,
        y: pos.y,
      }
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
}

function registerNodes() {
  // register all nodes
}

function registerKeys() {
  // register all keys
}

function switchBackground(graph: Graph, url: string, size: SizeType) {
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
}

export function switchToNext(graph: Graph, url: string, size: SizeType) {
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

export function createEntry(graph: Graph, args: entryType) {
  if (args.type === 'bbox') {
    const node = graph.createNode({
      shape: 'rect',
      position: {
        x: args.bbox.x,
        y: args.bbox.y,
      },
      size: {
        height: args.bbox.height,
        width: args.bbox.width,
      },
      attrs: {
        rect: {
          'fill': hexToRgba(args.color, 0.5),
          'stroke': args.color,
          'strokeWidth': 1,
        },
        text: {
          'fontSize': 14,
          'fill': 'white',
          'textAnchor': 'middle',
          'textVerticalAnchor': 'middle',
          'text': args.label,
        },
      },
    })
    graph.addNode(node)
    history.push({
      id: node.id,
      type: 'bbox',
      bbox: node.getBBox(),
      label: args.label,
      color: args.color,
    })
  }
}

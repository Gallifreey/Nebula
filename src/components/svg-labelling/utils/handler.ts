import type { Options } from '@antv/x6'
import { Graph } from '@antv/x6'
import { Transform } from '@antv/x6-plugin-transform'
import { Selection } from '@antv/x6-plugin-selection'
import { History } from '@antv/x6-plugin-history'
import { Keyboard } from '@antv/x6-plugin-keyboard'
import type { SizeType } from '~@/types/history'

// eslint-disable-next-line unused-imports/no-unused-vars
const history = useHistoryStore()
export const BACKGROUND_ID = 'bg_image'
export function graphInit(graphOptions: Partial<Options.Manual>) {
  const graph = new Graph(graphOptions)
  registerPlugins(graph)
  registerNodes()
  registerEvents()
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

function registerEvents() {
  // register all events
}

function registerNodes() {
  // register all nodes
}

function registerKeys() {
  // register all keys
}

function switchBackground(_: string, __: SizeType) {

}

export function switchToNext(url: string, size: SizeType) {
  switchBackground(url, size)
}

export function addNode(graph: Graph, type: string, attrs: any) {
  graph.addNode({
    shape: type,
    ...attrs,
  })
}

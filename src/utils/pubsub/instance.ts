import { Blocker } from "./Blocker"
import { Publisher } from "./Publisher"
import { Subscriber } from "./Subscriber"

export enum ETopic {
  rerender = "rerender",
}

const reactRenderBlockerIns = new Blocker<ETopic>()

const reactRenderPublisherIns = new Publisher<ETopic>(reactRenderBlockerIns)

const reactRenderSubscriberIns = new Subscriber<ETopic>(reactRenderBlockerIns)

export { reactRenderBlockerIns, reactRenderPublisherIns, reactRenderSubscriberIns }

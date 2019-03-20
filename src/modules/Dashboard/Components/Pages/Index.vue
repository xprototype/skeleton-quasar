<!--suppress HtmlUnknownTarget -->
<template>
  <q-page padding>
    <h5>The Project</h5>
    <p>
      The mainly purpose of this project is to provide models of possible abstractions that can be made to decouple your
      code from the fw code. You will see unusual approaches to routers, component organization and modularization.
    </p>
    <p>
      One of the pillars of this project is to expose a possible pattern of component implementation that will be
      called Prototype Presentation Design (PPD). Below you can see a template of how this pattern works.
    </p>
    <div class="text-center">
      <img
        src="~assets/ppd/general.png"
        alt="Prototype Presentation Design model diagram"
      >
    </div>

    <h5>Prototype Presentation Design</h5>
    <p>
      Prototype Presentation Design will guide you not to use business logic within your components. The mantra is to
      keep Web Components (or another render screen strategy) just as a presentation layer and never create business
      logic within this layer.
      PPD corrects the gap that is created by this strategy with scope management. So you declare your behaviors and
      properties imperatively in a structure that represents the prototype of the component in question and this
      structure will be associated with the component that will be rendered in the way that is most convenient.
    </p>

    <h6>Prototype Strategy</h6>
    <p>
      The Prototype is a resource that group the properties of domain of entity and specify your behaviour. The main
      prototype will be capable of provide a minimum set of resources to construct the mainly objective of your nature.
      It must be extensible and provide gateways to be specialized in specific contexts.
    </p>
    <p>
      The behaviours of prototype structure are designed to be executed in others scopes. So the project base must be
      capable to keep the resources provided by prototype available in the behaviours created for it.
    </p>
    <div class="text-center">
      <img
        src="~assets/ppd/controller.png"
        alt="Prototype Presentation Design controller diagram"
      >
    </div>
    <p>
      How you can see in image above to say what a project implements PDD requires a layer dedicated to provide the
      resources defined in prototype to screen rendering layer.
    </p>

    <h6>The "Test menu"</h6>
    <p>
      In Test menu available in drawer there is a draft about a possible implementation of Prototype Presentation
      Design. You can see the source code of the example <a :href="href">here</a>.
      This link points to folder in Github of namespace of Test. There you can see the folder structure used to compose
      the entity.
    </p>
  </q-page>
</template>

<script type="text/javascript">
export default {
  name: 'PageIndex',
  data: () => ({
    href: 'https://github.com/xprototype/skeleton-quasar/tree/master/src/domains/Example/Test'
  })
}
</script>

<style
  lang="stylus"
  scoped
>
  img
    width 100%
</style>

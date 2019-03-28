/* eslint-disable no-underscore-dangle */
import Skeleton from './Skeleton'
import { lang } from 'src/app/Util/Lang'
import { apply } from 'src/app/Util'

import Field from 'src/app/Prototype/Prototype/Field'
import FieldForm from 'src/app/Prototype/Prototype/FieldForm'
import FieldIs from 'src/app/Prototype/Prototype/FieldIs'
import FieldTable from 'src/app/Prototype/Prototype/FieldTable'
import Action from 'src/app/Prototype/Prototype/Action'

/**
 * @typedef {Prototype}
 */
export default class Prototype extends Skeleton {
  /**
   * @type {Array}
   */
  static mixins = [Field, FieldForm, FieldIs, FieldTable, Action]

  /**
   * @type {boolean}
   */
  i18n = true

  /**
   * @param {Function} callback
   */
  locale (callback = undefined) {
    this.namespace = this.domain.replace(/\//, '.')
    const map = (piece) => piece.charAt(0).toUpperCase() + piece.substring(1)
    const domain = this.namespace.split('.').map(map).join('/')
    const locale = this.$i18n.locale

    import(/* webpackChunkName: "lang-[request]" */ `src/domains/${domain}/${locale}`)
      .then((messages) => {
        const translations = apply({}, `domains.${this.namespace}`, messages.default)
        this.$i18n.mergeLocaleMessage(locale, translations)
      })
      .finally(callback)
  }

  /**
   * @param {String|Array} key
   * @param {string} [fallback]
   * @returns {String|Object}
   */
  $lang (key, fallback = '') {
    return lang(key, fallback)
  }

  /**
   * @override
   */
  configure () {
    // will override by prototypes
  }

  /**
   * @override
   */
  configureIndex () {
    this.fetchRecords()
  }

  /**
   * @override
   */
  configureAdd () {}

  /**
   * Configs para quando o scope for 'edit'
   * @override
   */
  configureEdit () {
    this.fetchRecord(this.$route.params[this.primaryKey])
  }

  /**
   * @override
   */
  configureView () {
    Object.keys(this.components).forEach(key => {
      this.setFieldAttrs(key, { readonly: true })
    })
    this.fetchRecord(this.$route.params[this.primaryKey])
  }

  /**
   */
  add () {
    this.$browse(`${this.path}/add`, true)
  }

  /**
   */
  back () {
    this.$browse(-1)
  }

  /**
   * @param {Object} record
   * @param {Array} records
   * @returns {Object}
   */
  view ({ record, records }) {
    if (Array.isArray(records) && records.length) {
      record = records[0]
    }
    if (record) {
      this.$browse(`${this.path}/${record[this.primaryKey]}`, true)
    }
  }

  /**
   * @param {Object} record
   * @param {Array} records
   * @returns {Object}
   */
  edit ({ record, records }) {
    if (Array.isArray(records) && records.length) {
      record = records[0]
    }
    if (record) {
      this.$browse(`${this.path}/${record[this.primaryKey]}/edit`, true)
    }
  }

  /**
   * @param {Object} record
   * @returns {Object}
   */
  cancel (record) {
    this.$browse(`${this.path}`, true)
  }

  /**
   * @param {string} scope
   * @param {Object} record
   * @returns {Object}
   */
  save (scope, record) {
    let method = 'create'
    if (scope !== 'create') {
      method = 'update'
    }

    this.$q.loading.show()
    const success = (response) => {
      if (this.debuggers) {
        window.alert(JSON.stringify(response))
      }
      this.$message.success(this.$lang(`prototype.operation.${scope}.success`))
      if (scope === 'create') {
        this.$browse(`${this.path}/${response[this.primaryKey]}/edit`, true)
      }
    }
    const fail = () => undefined
    const always = () => this.$q.loading.hide()

    return this.service[method](record).then(success).catch(fail).finally(always)
  }

  /**
   */
  defaults () {
    const prototype = this

    this.hook('created:default', function () {
      /**
       */
      const run = () => {
        // Call component setup method
        if (this.setup && typeof this.setup === 'function') {
          this.setup()
        }

        // Call global prototype configure
        prototype.configure.call(this)

        // Call configure of each field
        this.configure()

        if (this.scope === 'index') {
          // Call configure to index scope
          return prototype.configureIndex.call(this)
        }

        if (this.scope === 'update') {
          // Call configure to update scope
          return prototype.configureEdit.call(this)
        }

        if (this.scope === 'read') {
          // Call configure to read scope
          return prototype.configureView.call(this)
        }

        if (this.scope === 'create') {
          // Call configure to create scope
          return prototype.configureAdd.call(this)
        }
      }
      // load i18n async
      if (prototype.i18n) {
        prototype.locale.call(this, run)
        return
      }
      run()
    })

    this.action('add')
      .actionScopes(['index'])
      .actionPositions(['table-top'])
      .actionLabel(this.$lang('prototype.action.add.label'))
      .actionIcon('add')
      .actionColor('primary')

    this.action('back')
      .actionScopes(['index', 'create', 'read', 'update'])
      .actionPositions(['form-footer'])
      .actionLabel(this.$lang('prototype.action.back.label'))
      .actionIcon('reply')

    this.action('cancel')
      .actionFloatRight()
      .actionScopes(['index', 'create', 'read', 'update'])
      .actionPositions(['form-footer'])
      .actionLabel(this.$lang('prototype.action.cancel.label'))
      .actionIcon('close')

    this.action('refresh')
      .actionFloatRight()
      .actionHidden()
      .actionScopes(['index'])
      .actionIcon('refresh')
      .actionNoMinWidth()

    this.action('save')
      .actionScopes(['create', 'update'])
      .actionPositions(['form-footer'])
      .actionFloatRight()
      .actionLabel(this.$lang('prototype.action.save.label'))
      .actionIcon('save')
      .actionColor('primary')
      .actionOn('click', function () {
        this.$v.$touch()
        if (this.$v.$error || this.hasErrors) {
          this.$message.error(this.$lang('prototype.action.save.validation'))
          return
        }
        if (this.debuggers) {
          window.alert(JSON.stringify(this.getRecord()))
        }
        return prototype.save.call(this, this.scope, this.getRecord())
      })

    this.action('view')
      .actionScopes(['index'])
      .actionPositions(['table-top', 'table-cell'])
      .actionLabel(this.$lang('prototype.action.view.label'))
      .actionIcon('visibility')

    this.action('edit')
      .actionScopes(['index'])
      .actionPositions(['table-top', 'table-cell'])
      .actionLabel(this.$lang('prototype.action.edit.label'))
      .actionColor('primary')
      .actionIcon('edit')

    this.action('destroy')
      .actionScopes(['index'])
      .actionPositions(['table-top', 'table-cell'])
      .actionLabel(this.$lang('prototype.action.destroy.label'))
      .actionColor('negative')
      .actionIcon('delete')
  }
}

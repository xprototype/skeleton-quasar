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
    const domain = this.domain.split('/').map(map).join('/')
    const locale = this.$i18n.locale

    import(/* webpackChunkName: "lang-[request]" */ `src/domains/${domain}/${locale}`)
      .then((messages) => {
        const translations = apply({}, `domains.${this.namespace}`, messages.default)
        this.$i18n.mergeLocaleMessage(locale, translations)
        if (callback) {
          callback()
        }
      })
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
  configureCreate () {}

  /**
   * Configs para quando o scope for 'edit'
   * @override
   */
  configureEdit () {
  }

  /**
   * @override
   */
  configureView () {
    Object.keys(this.components).forEach(key => {
      this.setFieldAttrs(key, { readonly: true })
    })
  }

  /**
   */
  create () {
    this.$router.push(`/dashboard/test/create`)
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
      this.$router.push(`/dashboard/test/${record[this.primaryKey]}`)
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
      this.$router.push(`/dashboard/test/${record[this.primaryKey]}/edit`)
    }
  }

  /**
   * @param {Object} record
   * @returns {Object}
   */
  cancel (record) {
    this.$router.push(`/dashboard/test`)
  }

  /**
   * @param {Object} record
   * @param {Function} success
   * @param {Function} [fail]
   * @returns {Object}
   */
  save (record, success, fail = undefined) {
    if (fail) {
      return this.service.save(record).then(success).catch(fail)
    }
    return this.service.save(record).then(success)
  }

  /**
   */
  defaults () {
    const prototype = this

    this.hook('created:default', function () {
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

        if (this.scope === 'edit') {
          // Call configure to edit scope
          return prototype.configureEdit.call(this)
        }

        if (this.scope === 'view') {
          // Call configure to view scope
          return prototype.configureView.call(this)
        }

        if (this.scope === 'create') {
          // Call configure to create scope
          return prototype.configureCreate.call(this)
        }
      }
      // load i18n async
      if (prototype.i18n) {
        prototype.locale.call(this, run)
        return
      }
      run()
    })

    this.action('create')
      .actionScopes(['index'])
      .actionPositions(['table-top'])
      .actionLabel(lang('prototype.action.create.label'))
      .actionIcon('add')
      .actionColor('primary')

    this.action('cancel')
      .actionFloatRight()
      .actionScopes(['index', 'create', 'view', 'edit'])
      .actionPositions(['form-footer'])
      .actionLabel(lang('prototype.action.cancel.label'))
      .actionIcon('close')

    this.action('refresh')
      .actionFloatRight()
      .actionHidden()
      .actionScopes(['index'])
      .actionIcon('refresh')
      .actionNoMinWidth()

    this.action('save')
      .actionScopes(['create', 'edit'])
      .actionFloatRight()
      .actionLabel(lang('prototype.action.save.label'))
      .actionIcon('save')
      .actionColor('primary')
      .actionTextColor('grey-9')
      .actionOn('click', function () {
        this.$v.$touch()
        if (this.$v.$error || this.hasErrors) {
          this.$message.toast(this.$lang('prototype.action.save.validation'), 'error')
          return
        }
        const success = () => {
          this.$message.toast(this.$lang('prototype.action.save.success'))
        }
        return prototype.save.call(this, this.getRecord(), success)
      })

    this.action('edit')
      .actionScopes(['index'])
      .actionPositions(['table-top', 'table-cell'])
      .actionLabel(lang('prototype.action.edit.label'))
      .actionColor('primary')
      .actionIcon('edit')

    this.action('destroy')
      .actionScopes(['index'])
      .actionPositions(['table-top', 'table-cell'])
      .actionLabel(lang('prototype.action.destroy.label'))
      .actionColor('negative')
      .actionIcon('delete')

    this.action('view')
      .actionScopes(['index'])
      .actionPositions(['table-top', 'table-cell'])
      .actionLabel(lang('prototype.action.view.label'))
      .actionIcon('search')
  }
}

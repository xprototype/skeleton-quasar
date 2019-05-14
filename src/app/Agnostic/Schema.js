/* eslint-disable no-underscore-dangle */
import Skeleton from './Skeleton'

import Field from 'src/app/Agnostic/Schema/Field'
import FieldForm from 'src/app/Agnostic/Schema/FieldForm'
import FieldIs from 'src/app/Agnostic/Schema/FieldIs'
import FieldTable from 'src/app/Agnostic/Schema/FieldTable'
import Action from 'src/app/Agnostic/Schema/Action'
import { POSITIONS, SCOPES } from 'src/app/Agnostic/enum'

/**
 * @typedef {Schema}
 */
export default class Schema extends Skeleton {
  /**
   * @type {Array}
   */
  static mixins = [Field, FieldForm, FieldIs, FieldTable, Action]

  /**
   * @override
   */
  configure () {
    // will override by prototypes
  }

  /**
   * @override
   */
  configureIndex () {}

  /**
   * @override
   */
  configureAdd () {}

  /**
   * Configs para quando o scope for 'edit'
   * @override
   */
  configureEdit () {}

  /**
   * @override
   */
  configureView () {
    Object.keys(this.components).forEach(key => {
      this.setFieldAttrs(key, { readonly: true, disable: true })
    })
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
   * @param {Schema} schema
   * @param {string} scope
   * @param {Object} record
   * @returns {Object}
   */
  save (schema, scope, record) {
    let method = 'create'
    if (scope !== SCOPES.SCOPE_ADD) {
      method = 'update'
    }

    this.$q.loading.show()
    const success = (response) => {
      if (this.debuggers) {
        window.alert(JSON.stringify(response))
      }
      this.$message.success(this.$lang(`prototype.operations.${scope}.success`))
      if (scope === SCOPES.SCOPE_ADD) {
        this.$browse(`${this.path}/${response[this.primaryKey]}/edit`, true)
      }
    }
    const fail = () => undefined
    const always = () => this.$q.loading.hide()

    return schema.service[method](record).then(success).catch(fail).finally(always)
  }

  /**
   */
  defaults () {
    // initialize hooks
    this.defaultCreated()
    this.defaultRequestRecords()
    this.defaultRequestRecord()

    // initialize actions
    this.defaultActions()
  }

  /**
   */
  defaultCreated () {
    const schema = this

    this.hook('created:default', function () {
      // Call component initialize method
      if (this.initialize && typeof this.initialize === 'function') {
        this.initialize()
      }

      // Call global prototype configure
      schema.configure.call(this)

      // Call configure of each field
      this.configure()

      if (this.scope === SCOPES.SCOPE_INDEX) {
        // Call configure to index scope
        return schema.configureIndex.call(this, schema)
      }

      if (this.scope === SCOPES.SCOPE_EDIT) {
        // Call configure to update scope
        return schema.configureEdit.call(this, schema)
      }

      if (this.scope === SCOPES.SCOPE_VIEW) {
        // Call configure to read scope
        return schema.configureView.call(this, schema)
      }

      if (this.scope === SCOPES.SCOPE_ADD) {
        // Call configure to create scope
        return schema.configureAdd.call(this, schema)
      }
    })
  }

  /**
   */
  defaultRequestRecords () {
    const schema = this

    this.hook('request:records', function ({ parameters, filters }) {
      return schema.service.search(parameters, filters)
    })
  }

  /**
   */
  defaultRequestRecord () {
    const schema = this

    this.hook('request:record', function ({ id }) {
      if ([SCOPES.SCOPE_VIEW, SCOPES.SCOPE_EDIT].includes(this.scope)) {
        return schema.service.read(id)
      }
      return new Promise(function (resolve, reject) {
        reject()
      })
    })
  }

  /**
   */
  defaultActions () {
    const schema = this

    this.addAction('add')
      .actionScopes([SCOPES.SCOPE_INDEX])
      .actionPositions([POSITIONS.POSITION_TABLE_TOP])
      .actionIcon('add')
      .actionColor('primary')

    this.addAction('back')
      .actionScopes([SCOPES.SCOPE_INDEX, SCOPES.SCOPE_ADD, SCOPES.SCOPE_VIEW, SCOPES.SCOPE_EDIT])
      .actionPositions([POSITIONS.POSITION_FORM_FOOTER])
      .actionIcon('reply')

    this.addAction('cancel')
      .actionFloatRight()
      .actionScopes([SCOPES.SCOPE_INDEX, SCOPES.SCOPE_ADD, SCOPES.SCOPE_VIEW, SCOPES.SCOPE_EDIT])
      .actionPositions([POSITIONS.POSITION_FORM_FOOTER])
      .actionIcon('close')

    this.addAction('refresh')
      .actionFloatRight()
      .actionHidden()
      .actionScopes([SCOPES.SCOPE_INDEX])
      .actionIcon('refresh')
      .actionNoMinWidth()

    this.addAction('save')
      .actionScopes([SCOPES.SCOPE_ADD, SCOPES.SCOPE_EDIT])
      .actionPositions([POSITIONS.POSITION_FORM_FOOTER])
      .actionFloatRight()
      .actionIcon('save')
      .actionColor('primary')
      .actionOn('click', function () {
        this.$v.$touch()
        if (this.$v.$error || this.hasErrors) {
          this.$message.error(this.$lang('prototype.actions.save.validation'))
          return
        }
        if (this.debuggers) {
          window.alert(JSON.stringify(this.getRecord()))
        }
        return schema.save.call(this, schema)
      })

    this.addAction('view')
      .actionScopes([SCOPES.SCOPE_INDEX])
      .actionPositions([POSITIONS.POSITION_TABLE_TOP, POSITIONS.POSITION_TABLE_CELL])
      .actionIcon('visibility')

    this.addAction('edit')
      .actionScopes([SCOPES.SCOPE_INDEX])
      .actionPositions([POSITIONS.POSITION_TABLE_TOP, POSITIONS.POSITION_TABLE_CELL])
      .actionColor('primary')
      .actionIcon('edit')

    this.addAction('destroy')
      .actionScopes([SCOPES.SCOPE_INDEX])
      .actionPositions([POSITIONS.POSITION_TABLE_TOP, POSITIONS.POSITION_TABLE_CELL])
      .actionColor('negative')
      .actionIcon('delete')
  }
}

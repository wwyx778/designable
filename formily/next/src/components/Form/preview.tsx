import React, { useMemo } from 'react'
import { createMetadata, createResource } from '@designable/core'
import { createForm } from '@formily/core'
import { observer } from '@formily/react'
import { Form as FormilyForm } from '@formily/next'
import { usePrefix, DnFC } from '@designable/react-page'
import { AllSchemas } from '../../schemas'
import { AllLocales } from '../../locales'
import './styles.scss'

export const Form: DnFC<React.ComponentProps<typeof FormilyForm>> = observer(
  (props) => {
    const prefix = usePrefix('designable-form')
    const form = useMemo(
      () =>
        createForm({
          designable: true,
        }),
      []
    )
    return (
      <FormilyForm
        {...props}
        style={{ ...props.style }}
        className={prefix}
        form={form}
      >
        {props.children}
      </FormilyForm>
    )
  }
)

Form.Metadata = createMetadata({
  name: 'Form',
  selector: (node) => node.componentName === 'Form',
  behavior(node) {
    return {
      draggable: !node.isRoot,
      cloneable: !node.isRoot,
      deletable: !node.isRoot,
      droppable: true,
      propsSchema: {
        type: 'object',
        properties: {
          ...(AllSchemas.FormLayout.properties as any),
          style: AllSchemas.CSSStyle,
        },
      },
      defaultProps: {
        labelCol: 6,
        wrapperCol: 12,
      },
    }
  },
  locales: AllLocales.Form,
})

Form.Resource = createResource({
  title: { 'zh-CN': '表单', 'en-US': 'Form' },
  icon: 'FormLayoutSource',
  elements: [
    {
      componentName: 'Field',
      props: {
        type: 'object',
        'x-component': 'Form',
      },
    },
  ],
})

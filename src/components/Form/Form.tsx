import { REQUIRED } from "components/Form/validators"
import useForm from "hooks/useForm"
import React from "react"

type childrenType = Array<React.ReactElement> | React.ReactElement

type OwnProps = {
  children: childrenType
  onSubmit?: any
  state?: any
}

const Form = ({ children, onSubmit, state }: OwnProps) => {
  const { register, handleSubmit, errors, isSubmitting } = useForm(state)

  const renderChildren = (children: childrenType): childrenType => {
    if (typeof children === "string") {
      return children
    } else {
      return React.Children.map(children, (child) => {
        if (child.props.name) {
          return renderNamedChild(child)
        } else {
          return renderNamelessChild(child)
        }
      })
    }
  }

  const renderNamedChild = (child: React.ReactElement) => {
    return React.createElement(child.type, {
      ...{
        ...child.props,
        key: child.props.name,
        className:
          child.props.validators && child.props.validators.find((el: Validator) => el.type === REQUIRED)
            ? "required"
            : " ",
        isDisabled: isSubmitting || child.props.isDisabled,
      },
      errors: errors,
      register: (ref: FieldRef) => register(ref, child.props.validators as Validators),
    })
  }

  const renderNamelessChild = (child: React.ReactElement) => {
    return React.createElement(
      child.type,
      {
        ...{
          ...child.props,
          key: "child.props.id",
          disabled: isSubmitting || child.props.isDisabled,
        },
      },
      child.props.children ? [child.props.children].map((child: React.ReactElement) => renderChildren(child)) : null,
    )
  }

  return <form onSubmit={handleSubmit(onSubmit)}>{React.Children.map(children, (child) => renderChildren(child))}</form>
}

export default Form

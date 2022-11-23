/* eslint-disable */
import * as yup from 'yup'

yup.setLocale({
  mixed: {
    'required': 'Required'
  }
})

yup.addMethod(yup.mixed, 'ne', function () {
  return this.transform(value => {
    if (value == '' || value == "") return undefined
    return value
  })
})

export const extractYupErrors = err => {
  return err.inner.reduce((acc, err) => {
    return { ...acc, [err.path]: err.message };
  }, {});
}

// Example..
export const loginSchema = yup.object({
  email: yup.string().email().required().ne(),
  password: yup.string().required().min(6).max(20).ne(),
}).noUnknown(true)

export const registerSchema = yup.object({
  name: yup.string().min(3).max(100).required().ne(),
  email: yup.string().email().required().ne(),
  password: yup.string().required().min(6).max(20).ne(),
}).noUnknown(true)
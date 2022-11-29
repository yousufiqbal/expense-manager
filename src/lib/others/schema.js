/* eslint-disable */
import dayjs from 'dayjs'
import CustomParseFormat from 'dayjs/plugin/customParseFormat'

dayjs.extend(CustomParseFormat)

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

// Helpers

let emptyToZero = value => isNaN(value) ? undefined : value
let isDate = value => dayjs(value).isValid()
let isTime = value => dayjs(value, 'HH:mm:ss').isValid()

// Example..
export const changePasswordSchema = yup.object({
  currentPassword: yup.string().required().min(6).max(20).ne(),
  newPassword: yup.string().required().notOneOf([yup.ref('currentPassword')], 'Do not user previous password').min(6).max(20).ne(),
}).noUnknown(true)

export const loginSchema = yup.object({
  email: yup.string().email().required().ne(),
  password: yup.string().required().min(6).max(20).ne(),
}).noUnknown(true)

export const registerSchema = yup.object({
  name: yup.string().min(3).max(100).required().ne(),
  email: yup.string().email().required().ne(),
  password: yup.string().required().min(6).max(20).ne(),
}).noUnknown(true)

export const accountSchema = yup.object({
  name: yup.string().min(3).max(100).required().ne(),
  balance: yup.number().transform(emptyToZero).min(0).optional().ne(),
}).noUnknown(true)

export const categorySchema = yup.object({
  name: yup.string().min(3).max(100).required().ne(),
}).noUnknown(true)

export const profileNameSchema = yup.object({
  name: yup.string().min(3).max(100).required().ne(),
}).noUnknown(true)

export const generateExpenseSchema = (accountIds, expenseCategoryIds) => {
  return yup.object({
    date: yup.string().test('isDate', 'Invalid Date', isDate).required().ne(),
    time: yup.string().test('isTime', 'Invalid Time', isTime).required().ne(),
    accountId: yup.string().oneOf(accountIds).required().ne(),
    expenseCategoryId: yup.string().oneOf(expenseCategoryIds).required().ne(),
    amount: yup.number().transform(emptyToZero).min(0).required().ne(),
    title: yup.string().min(3).max(100).required().ne(),
    description: yup.string().min(1).max(100).optional().nullable().ne(),
  }).noUnknown(true)
}

export const generateIncomeSchema = (accountIds, incomeCategoryIds) => {
  return yup.object({
    date: yup.string().test('isDate', 'Invalid Date', isDate).required().ne(),
    time: yup.string().test('isTime', 'Invalid Time', isTime).required().ne(),
    accountId: yup.string().oneOf(accountIds).required().ne(),
    incomeCategoryId: yup.string().oneOf(incomeCategoryIds).required().ne(),
    amount: yup.number().transform(emptyToZero).min(0).required().ne(),
    title: yup.string().min(3).max(100).required().ne(),
    description: yup.string().min(1).max(100).optional().nullable().ne(),
  }).noUnknown(true)
}

export const generateTransferSchema = (accountIds) => {
  return yup.object({
    date: yup.string().test('isDate', 'Invalid Date', isDate).required().ne(),
    time: yup.string().test('isTime', 'Invalid Time', isTime).required().ne(),
    fromAccountId: yup.string().oneOf(accountIds).notOneOf([yup.ref('toAccountId')], 'Use different accounts').required().ne(),
    // toAccountId: yup.string().oneOf(accountIds).notOneOf([yup.ref('fromAccountId')], 'Use different accounts').required().ne(),
    toAccountId: yup.string().oneOf(accountIds).required().ne(),
    amount: yup.number().transform(emptyToZero).min(0).required().ne(),
    title: yup.string().min(3).max(100).required().ne(),
    description: yup.string().min(1).max(100).optional().nullable().ne(),
  }).noUnknown(true)
}
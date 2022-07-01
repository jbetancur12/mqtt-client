import useAxios from 'axios-hooks'
import React from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import Alert from '../components/Alert/Alert'
import useFetch from '../hooks/useFetch'
import { useRouter } from 'next/router'
import classNames from 'classnames'
import { Layout } from '../components/account/Layout'

interface Inputs {
  firstName: string
  lastName: string
  address: string
  phone: string
  email: string
  password: string
  passwordConfirm: string
}

const Register = (): JSX.Element => {
  const router = useRouter()

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm<Inputs>()

  const [
    /* eslint no-empty-pattern: "error" */
    { data },
    executePost
  ] = useAxios(
    {
      url: 'http://192.168.0.6:3000/api/auth/register',
      method: 'POST'
    },
    { manual: true }
  )

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    return executePost({ data }).then(() => {
      router.push('login')
    })
  }

  return (
    <>
      <Alert type="success">
        <p>Success message</p>
      </Alert>

      <Layout>
        <form action="" className="box" onSubmit={handleSubmit(onSubmit)}>
          <div className="field">
            <label htmlFor="" className="label">
              First Name
            </label>
            <div className="control has-icons-left">
              <input
                type="text"
                placeholder="Jhon"
                className={classNames('input', {
                  'is-danger': errors.firstName
                })}
                {...register('firstName', { required: true })}
              />
              <span className="icon is-small is-left">
                <i className="fa fa-user"></i>
              </span>
            </div>
            {errors.firstName && (
              <span className="help is-danger">This field is required</span>
            )}
          </div>
          <div className="field">
            <label htmlFor="" className="label">
              Last Name
            </label>
            <div className="control has-icons-left">
              <input
                type="text"
                placeholder="Doe"
                className={classNames('input', {
                  'is-danger': errors.lastName
                })}
                {...register('lastName', { required: true })}
              />
              <span className="icon is-small is-left">
                <i className="fa fa-user"></i>
              </span>
            </div>
            {errors.lastName && (
              <span className="help is-danger">This field is required</span>
            )}
          </div>
          <div className="field">
            <label htmlFor="" className="label">
              Email
            </label>
            <div className="control has-icons-left">
              <input
                type="email"
                placeholder="e.g. bobsmith@gmail.com"
                className={classNames('input', { 'is-danger': errors.email })}
                {...register('email', { required: 'The email is required' })}
              />
              <span className="icon is-small is-left">
                <i className="fa fa-envelope"></i>
              </span>
            </div>
            {errors.email && (
              <span className="help is-danger">{errors.email.message}</span>
            )}
          </div>
          <div className="field">
            <label htmlFor="" className="label">
              Address
            </label>
            <div className="control has-icons-left">
              <input
                type="text"
                placeholder="Av 123 ...."
                className={classNames('input', { 'is-danger': errors.address })}
                {...register('address', {
                  required: 'The address is required'
                })}
              />
              <span className="icon is-small is-left">
                <i className="fa fa-lock"></i>
              </span>
            </div>
            {errors.address && (
              <span className="help is-danger">{errors.address.message}</span>
            )}
          </div>
          <div className="field">
            <label htmlFor="" className="label">
              Phone
            </label>
            <div className="control has-icons-left">
              <input
                type="tel"
                placeholder="555-1256-123"
                className={classNames('input', { 'is-danger': errors.phone })}
                {...register('phone', { required: 'The phone is required' })}
              />
              <span className="icon is-small is-left">
                <i className="fa fa-map-marker"></i>
              </span>
            </div>
            {errors.phone && (
              <span className="help is-danger">{errors.phone.message}</span>
            )}
          </div>
          <div className="field">
            <label htmlFor="" className="label">
              Password
            </label>
            <div className="control has-icons-left">
              <input
                type="password"
                placeholder="*******"
                className={classNames('input', {
                  'is-danger': errors.password
                })}
                {...register('password', {
                  required: 'You must specify a password',
                  minLength: {
                    value: 8,
                    message: 'Password must have at least 8 characters'
                  }
                })}
              />
              <span className="icon is-small is-left">
                <i className="fa fa-lock"></i>
              </span>
            </div>
            {errors.password && (
              <span className="help is-danger">{errors.password.message}</span>
            )}
          </div>
          <div className="field">
            <label htmlFor="" className="label">
              Repeat Password
            </label>
            <div className="control has-icons-left">
              <input
                type="password"
                placeholder="*******"
                className={classNames('input', {
                  'is-danger': errors.passwordConfirm
                })}
                {...register('passwordConfirm', {
                  validate: (value) =>
                    value === watch('password') || 'The passwords do not match'
                })}
              />
              <span className="icon is-small is-left">
                <i className="fa fa-lock"></i>
              </span>
            </div>
            {errors.passwordConfirm && (
              <span className="help is-danger">
                {errors.passwordConfirm.message}
              </span>
            )}
          </div>
          <div className="field is-centered">
            <button className="button is-success">Register</button>
          </div>
        </form>
      </Layout>
    </>
  )
}

export default Register

import useAxios from 'axios-hooks'
import React from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import Alert from '../components/Alert/Alert'
import useFetch from '../hooks/useFetch'
import { useRouter } from 'next/router'

interface Inputs {
  email: string
  password: string
}

interface Options {
  method: string
  headers: {}
  body?: {}
}

const Login = (): JSX.Element => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<Inputs>()

  const [
    /* eslint no-empty-pattern: "error" */
    { data },
    executePost
  ] = useAxios(
    {
      url: 'http://192.168.0.6:3000/auth/signin',
      method: 'POST'
    },
    { manual: true }
  )

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    void executePost({
      data
    })
  }

  const router = useRouter()

  if (data) router.push('/')

  return (
    <>
      {data && (
        <Alert type="success">
          <p>Success message</p>
        </Alert>
      )}

      <section className="hero is-primary is-fullheight">
        <div className="hero-body">
          <div className="container">
            <div className="columns is-centered">
              <div className="column is-5-tablet is-4-desktop is-3-widescreen">
                <form
                  action=""
                  className="box"
                  onSubmit={handleSubmit(onSubmit)}>
                  <div className="field">
                    <label htmlFor="" className="label">
                      Email
                    </label>
                    <div className="control has-icons-left">
                      <input
                        type="email"
                        placeholder="e.g. bobsmith@gmail.com"
                        className="input"
                        required
                        {...register('email')}
                      />
                      <span className="icon is-small is-left">
                        <i className="fa fa-envelope"></i>
                      </span>
                    </div>
                    {errors.email && <span>This field is required</span>}
                  </div>
                  <div className="field">
                    <label htmlFor="" className="label">
                      Password
                    </label>
                    <div className="control has-icons-left">
                      <input
                        type="password"
                        placeholder="*******"
                        className="input"
                        required
                        {...register('password', { required: true })}
                      />
                      <span className="icon is-small is-left">
                        <i className="fa fa-lock"></i>
                      </span>
                    </div>
                    {errors.password && <span>This field is required</span>}
                  </div>
                  <div className="field">
                    <label htmlFor="" className="checkbox">
                      <input type="checkbox" />
                      Remember me
                    </label>
                  </div>
                  <div className="field">
                    <button className="button is-success">Login</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Login

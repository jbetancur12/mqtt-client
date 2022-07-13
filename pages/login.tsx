import useAxios from 'axios-hooks'
import React, { useContext } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import Alert from '../components/Alert/Alert'
import useFetch from '../hooks/useFetch'
import { useRouter } from 'next/router'
import { useAuth } from '@context/auth';
import NotificationContext from '@context/notificationContext'
import { Layout } from '@components/account/Layout'

interface Inputs {
  email: string
  password: string
}

const Login = (): JSX.Element => {
  const { login, loading } = useAuth()
  // const notificationCtx = useContext(NotificationContext);
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<Inputs>()


  const onSubmit: SubmitHandler<Inputs> = (data) => {

    login(data).then(() => {
      // notificationCtx.success('Ingreso Exitoso!', 30)
      const returnUrl = (router.query.returnUrl || '/') as string;
      router.push(returnUrl);
    }).catch((error: Error) => {
      // notificationCtx.success(error.message, 3)
      console.log(error);
    })

  }




  return (
    <>

      <Layout>
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
      </Layout>
    </>
  )
}

export default Login

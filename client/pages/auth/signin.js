import { useState } from 'react';
import Router from 'next/router';
import useRequest from '../../hooks/use-request';

export default () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { doRequest, errors } = useRequest({
    url: '/api/users/signin',
    method: 'post',
    body: {
      email, password
    },
    onSuccess: (result) => {
      Router.push('/');
    }
  });

  const onSubmit = async (e) => {
    e.preventDefault();

    await doRequest();
  }

  return (
    <form onSubmit={onSubmit}>
      <h1>Sign in</h1>

      <div className="form-group">
        <label>Email Address</label>
        <input
          value={email}
          onChange={e => setEmail(e.target.value)}
          type="email"
          name="email"
          placeholder="Email"
          className="form-control"
        />
      </div>

      <div className="form-group">
        <label>Password</label>
        <input
          value={password}
          onChange={e => setPassword(e.target.value)}
          type="password"
          name="password"
          placeholder="Password"
          className="form-control"
        />
      </div>

      {errors}

      <button className="btn btn-primary" type="submit">Sign in</button>
    </form >
  )
}
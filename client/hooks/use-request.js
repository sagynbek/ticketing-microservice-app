import axios from 'axios'
import { useState } from 'react'

export default ({ url, method, body, onSuccess }) => {
  const [errors, setErrors] = useState(null);

  const doRequest = async () => {
    setErrors(null);
    await axios[method](url, body)
      .then(response => {
        onSuccess(response.data);
        return response.data;
      })
      .catch(err => {
        if (err.response.data && Array.isArray(err.response.data.errors)) {
          setErrors((
            <div className="alert alert-danger">
              <h4>Ooops...</h4>
              <ul className="my-0">
                {
                  err.response.data.errors.map((err, key) => <li key={key}>{err.message}</li>)
                }
              </ul>
            </div>
          ));
        }
      });
  }

  return { doRequest, errors };
}
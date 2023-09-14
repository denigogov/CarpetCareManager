const BASE_URL = 'http://localhost:4000';

/**
 *
 * @param {string} url the API URL to for the request
 * @param {number} id  id from selected service
 * @param {string} method HTTP REQUEST METHOD
 * @param {tokenProp} token
 * @param {object | null} queryData data to be send in Database IF its a delete Request add ONLY NULL
 * @param {string} errMessage in case if request faild
 * @param {setterFn} setErrorMessage the setter from useState
 * @param {setterFn} setSuccess
 * @param {function} mutate  add only mutate fn from SWR without callin inside of the param.
 * @param {string} mutateUrl  only the named data in useSWR
 * @param {string} succ success message
 */

export const handleUpdateDeleteRequest = async (
  url,
  id,
  method,
  token,
  queryData,
  errMessage,
  setErrorMessage,
  setSuccess,
  mutateFunction,
  mutateUrl,
  succ
) => {
  try {
    const requestOptions = {
      method: method,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };

    if (queryData) {
      requestOptions.body = JSON.stringify(queryData);
    }

    const res = await fetch(`${BASE_URL}${url}${id}`, requestOptions);

    if (res.ok) {
      mutateFunction([`${mutateUrl}`, token]);
      setSuccess(`${succ}`);
      setErrorMessage('');
    } else {
      throw new Error('Request failed');
    }
  } catch (err) {
    setErrorMessage(`${errMessage}, ${err.message}`);
  }
};

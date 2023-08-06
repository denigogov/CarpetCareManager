import useSWR, { useSWRConfig } from 'swr';
import LoadingView from '../../components/LoadingView';
import ErrorDisplayView from '../../components/ErrorDisplayView';

const Price = ({ token }) => {
  const {
    data: services,
    error: servicesError,
    isLoading: servicesLoading,
  } = useSWR(['services', token]);

  if (servicesError)
    return (
      <ErrorDisplayView
        errorMessage={error.message}
        navigateTo1="/dashboard"
        navigateTo2="/order"
      />
    );
  if (servicesLoading) return <LoadingView />;

  return (
    <div>
      {services.map(a => {
        return <p>{a.service_name}</p>;
      })}
    </div>
  );
};

export default Price;

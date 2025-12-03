import { useSettings } from '../../../contexts/useSettings';
import { Fansarr } from '../../../enums/Stasharr';
import SmartUrlInput from '../common/SmartUrlInput';

const StashInstance = () => {
  const { store, setStore } = useSettings();

  const handleChange = (value: string) => {
    // Remove trailing slashes and normalize empty values
    const cleanValue = value.trim().replace(/\/+$/, '');
    setStore('stashDomain', cleanValue === '' ? '' : cleanValue);
  };

  return (
    <SmartUrlInput
      label="FansDB Instance URL"
      value={store.stashDomain || ''}
      onChange={handleChange}
      serviceType="stash"
      id={Fansarr.ID.Modal.StashDomain}
      placeholder="Enter your Stash instance URL"
      required={false}
    />
  );
};

export default StashInstance;

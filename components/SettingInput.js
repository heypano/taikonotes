import PropTypes from "prop-types";

export function SettingInput({ children, id }) {
  return <label
    htmlFor={id}
    className="flex flex-row justify-between items-end mt-3 first:mt-0"
  >
    {children}
  </label>
}

SettingInput.propTypes = {
  id: PropTypes.string,
  children: PropTypes.node,
};

SettingInput.defaultProps = {
  id: undefined,
  children: undefined,
};

export default SettingInput;

import Select from "react-select";

const formatGroupLabel = (data) => (
  <div style={groupStyles}>
    <span>{data.label}</span>
    <span style={groupBadgeStyles}>{data.options.length}</span>
  </div>
);

const Dropdown = ({ data1, data2 }) => {
  return (
    <div>
      <Select defaultValue={data1[1]} options={data1} formatGroupLabel={formatGroupLabel} />
      <Select defaultValue={data2[0]} options={data2} formatGroupLabel={formatGroupLabel} />
    </div>
  );
};

export default Dropdown;

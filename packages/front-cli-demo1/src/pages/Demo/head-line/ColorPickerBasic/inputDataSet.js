import { FieldType } from 'choerodon-ui/pro/lib/data-set/enum';

function handleDataSetChange({ record, name, value, oldValue }) {
  console.log(
    '[dataset newValue]',
    value,
    '[oldValue]',
    oldValue,
    `[record.get('${name}')]`,
    record.get(name),
  );
}

const inputDs = () => ({
  autoCreate: true,
  fields: [
    {
      name: 'color',
      type: FieldType.color,
      defaultValue: '#00ff00',
      required: true,
    },
  ],
  events: {
    update: handleDataSetChange,
  },
});

export default inputDs;

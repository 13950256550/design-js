import React from 'react';
import { Select } from 'antd';

export function getCodeList(codelists, codeName) {
  return codelists[codeName] ? codelists[codeName].codeList : [];
}

export function getCodeObject(codeList, codeKey) {
  return codeList.find((codeObject) => {
    return codeObject.key === codeKey;
  },
  );
}

export function getShowValue(codelists, codeName, codeKey) {
  let result = codeKey;
  const codeList = getCodeList(codelists, codeName);
  const codeObject = getCodeObject(codeList, codeKey);
  if (codeObject !== null && codeObject !== undefined) {
    result = `${codeObject.key}-${codeObject.value}`;
  }
  return result;
}

export function getSelectOptions(codelist) {
  return codelist.map(codeObject => <Select.Option key={codeObject.key}>{`${codeObject.key}-${codeObject.value}`}</Select.Option>);
}

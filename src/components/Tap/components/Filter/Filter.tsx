import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";
import Form from "components/Form/Form";
import { TapFilterContext } from "context/TapFilter";
import React, { useContext } from "react";
import styled from "styled-components";
import useFilters from "./useFilters";
import useOptions from "./useOptions";

type Props = {
  namespaces: IstioNamespace | undefined;
  workloads: IstioWorkload | undefined;
  filters: AccessLogsInput;
  setFilters: (accessLogsInput: AccessLogsInput) => void;
};

const Filter = ({ namespaces, workloads, filters, setFilters }: Props) => {
  const {
    namespacesFilter,
    resourceFilter,
    destinationFilter,
    methodFilter,
    statusCodeMinFilter,
    statusCodeMaxFilter,
    pathPrefixFilter,
  } = useContext(TapFilterContext);

  const {
    setNamespaces,
    setResource,
    setDestination,
    setMethod,
    setStatusCodeMin,
    setStatusCodeMax,
    setPathPrefix,
  } = useFilters(filters, setFilters);
  const { namespaceOptions, resourceOptions, mathodOptions } = useOptions(namespaces, workloads);

  return (
    <Style>
      <Form>
        <FormControl>
          <InputLabel id="select-namespaces-label" shrink>
            Namespaces
          </InputLabel>
          <Select labelId="select-namespaces-label" value={namespacesFilter.get} onChange={setNamespaces} multiple>
            {namespaceOptions.map((no) => (
              <MenuItem key={no.value} value={no.value}>
                {no.value}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl>
          <InputLabel id="select-resource-label" shrink>
            Resource
          </InputLabel>
          <Select labelId="select-resource-label" value={resourceFilter.get} onChange={setResource}>
            <MenuItem value="">
              <em>--</em>
            </MenuItem>
            {resourceOptions.map((ro) => (
              <MenuItem key={ro.value} value={ro.value}>
                {ro.value}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl>
          <InputLabel id="select-destination-label" shrink>
            Destination
          </InputLabel>
          <Select labelId="select-destination-label" value={destinationFilter.get} onChange={setDestination}>
            <MenuItem value="">
              <em>--</em>
            </MenuItem>
            {resourceOptions.map((ro) => (
              <MenuItem key={ro.value} value={ro.value}>
                {ro.value}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl>
          <InputLabel id="select-method-label" shrink>
            Method
          </InputLabel>
          <Select labelId="select-method-label" value={methodFilter.get} onChange={setMethod}>
            <MenuItem value="">
              <em>--</em>
            </MenuItem>
            {mathodOptions.map((mo) => (
              <MenuItem key={mo.value} value={mo.value}>
                {mo.value}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <div className="statusCode">
          <TextField
            label="Status code"
            type="number"
            value={statusCodeMinFilter.get}
            InputLabelProps={{ shrink: true }}
            InputProps={{ inputProps: { min: 0 } }}
            onChange={setStatusCodeMin}
          />
          <TextField
            label=""
            value={statusCodeMaxFilter.get}
            onChange={setStatusCodeMax}
            type="number"
            InputProps={{ inputProps: { min: 0 } }}
          />
        </div>
        <TextField
          label="Path prefix: "
          value={pathPrefixFilter.get}
          InputLabelProps={{ shrink: true }}
          onChange={setPathPrefix}
        />
      </Form>
    </Style>
  );
};

const Style = styled.div`
  form {
    padding: 0.5rem;
    display: grid;
    grid-gap: 0.6rem;
    grid-template-columns: repeat(3, 1fr) repeat(2, 0.75fr) repeat(2, 1fr);
    grid-template-rows: repeat(1, 1fr);

    .react-select__menu {
      z-index: 2;
    }

    .statusCode {
      display: grid;
      grid-gap: 0.6rem;
      grid-template-columns: 1fr 1fr;
      grid-template-rows: repeat(1, 1fr);
    }

    .MuiTextField-root {
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
    }
  }
`;

export default Filter;

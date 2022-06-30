import React from 'react';
import styled, { css } from 'styled-components';
import Icon from '@components/atoms/icon';
import { Search } from '@styled-icons/bootstrap';
import { useInvestList } from '@context/invest-list-context';

const StyledInput = styled.input`
    @media screen and (max-width: 350px) {
      width: 140px;
    }    @media screen and (max-width: 295px) {
      width: 120px;
    }
`;

export default function SearchForm() {
  const {
    handleSearch,
  } = useInvestList();

  return (
    <div className="input-group input-group-flush input-group-merge justify-content-end justify-content-md-start flex-wr">
      <span className="bg-transparent border form-control-rounded border-right-0 ps-3 ps-md-4 pe-md-3 py-3 cursor-pointer">
        <Icon component={Search} size={18} />
      </span>
      <StyledInput
        className=" bg-transparent border form-control-rounded border-left-0 ps-3 pe-4 py-3 text-muted"
        type="search"
        placeholder="Search"
        onChange={handleSearch}
        style={{ width: '90%' }}
      />
    </div>
  );
}

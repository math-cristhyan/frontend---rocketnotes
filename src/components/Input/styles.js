import styled from "styled-components";

export const Container = styled.div `
  width: 100%;
  display: flex;
  align-items: center;

  background-color: ${({theme})=> theme.COLORS.BACKGROUND_900};
  color: ${({theme})=> theme.COLORS.GRAY_300};

  margin-bottom: 8px;
  border-radius: 10px;

  >svg {
    margin-left: 16px;
  }

  >input {
    height: 56px;
    width: 100%;
    padding: 12px;

    background: transparent;
    border: 0;

    color: ${({theme})=> theme.COLORS.WHITE};

    &::placeholder {
      color: ${({theme})=> theme.COLORS.GRAY_300};
    }
  }


`;
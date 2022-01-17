import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
  background-color: #dce8e1;
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const FormArea = styled.View`
  width: 100%;
  padding: 40px;
`;

export const CustomButton = styled.TouchableOpacity`
  height: 60px;
  background-color: #268596;
  border-radius: 30px;
  justify-content: center;
  align-items: center;
`;

export const CustomButtonText = styled.Text`
  font-size: 18px;
  color: #fff;
`;

export const SignMessage = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: center;
  margin-top: 50px;
  margin-bottom: 20px;
`;

export const SignMessageText = styled.Text`
  font-size: 16px;
  color: black;
`;

export const SignMessageTextBold = styled.Text`
  font-size: 16px;
  color: #ecd54c;
  font-weight: bold;
  margin-left: 5px;
`;

import React, { useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import HeaderForm from '../Components/HeaderForm';
 
export default function Contato() {
  const navigation = useNavigation();
  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');
  const [pedidos, setPedidos] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [observacao, setObservacao] = useState('');

  const enviarPedido = async () => {
    if (!nome || !telefone || !pedidos || !quantidade || !observacao) {
      Alert.alert("Erro, por favor preencha todos os campos");  
      return;
    }


    try {
      const response = await fetch('http://10.0.2.2:3000/api/pedidos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({nome, telefone, pedidos, quantidade, observacao}),
      });
  
      if(response.ok){
        const jsonResponse = await response.json();
        Alert.alert('Sucessso', 'Pedido sendo preparado...');
        console.log(jsonResponse)
        setNome('');
        setTelefone('');
        setPedidos('');
        setQuantidade('');
        setObservacao('');
      } else {
        Alert.alert('Erro', 'Erro ao enviar pedido.');
      }
    } catch (error) {
      Alert.alert('Erro', 'Erro de conexão:' + error.message);
    }

    
    
  }
 
  return (
   <View>
     <HeaderForm />
    <View style={styles.containerForm}>
    
  
    

    <Text style={styles.label}>Nome</Text>
    <TextInput
    style={styles.input}
    placeholder="Digite o nome"
    value={nome}
    onChangeText={setNome}
    />
 
    <Text style={styles.label}>Telefone</Text>
    <TextInput
    style={styles.input}
    placeholder="Digite o telefone"
    value={telefone}
    onChangeText={setTelefone}
    />



<Text style={styles.label}>Pedido</Text>
    <TextInput
    style={styles.input}
    placeholder="Digite seu pedido"
    value={pedidos}
    onChangeText={setPedidos}
    />

<Text style={styles.label}>Quantidade</Text>
    <TextInput
    style={styles.input}
    placeholder="Digite a quantidade"
    value={quantidade}
    onChangeText={setQuantidade}
    />
 
<Text style={styles.label}>Observação</Text>
    <TextInput
    style={styles.input}
    placeholder="Digite seu pedido"
    value={observacao}
    onChangeText={setObservacao}
    />
 
    <TouchableOpacity style={styles.button} onPress={enviarPedido}>
        <Text style={styles.buttonText}>Enviar Pedido</Text>
      </TouchableOpacity>

      
  </View>
   </View>
  
  );
}
 
const styles = StyleSheet.create({
containerForm: {
 padding: 20,
 width:'100%'
},
label : {
  fontSize: 18,
  marginBottom: 5
},
input: {
borderWidth: 1,
borderColor: "#ccc",
padding: 10,
marginBottom: 20,
borderRadius: 5
},
button: {
  backgroundColor: 'orange', // Cor de fundo laranja
  padding: 15, // Espaçamento interno
  borderRadius: 5, // Bordas arredondadas
  left: '50%', // Centraliza horizontalmente
  transform: [{ translateX: -75 }],
  width:150, // Ajusta para centralizar corretamente (75 é metade da largura do botão)
  marginTop:10
},
buttonText: {
  color: 'white', // Cor do texto do botão
  textAlign: 'center', // Centraliza o texto
  fontWeight: 'bold', // Negrito
},
goBack:{
  paddingBottom:20
}
});
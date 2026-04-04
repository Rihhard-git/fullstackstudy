import { FlatList, View, StyleSheet, Text, Pressable } from 'react-native';
import RepositoryItem from './RepositoryItem';
import useRepositories from '../../hooks/useRepositories';
import { useNavigate, useParams } from 'react-router-native';
import React, { useState } from 'react';
import { Picker } from '@react-native-picker/picker';
import { Searchbar } from 'react-native-paper'
import { useDebounce } from 'use-debounce'

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

export const RepositoryListHeader = ({orderValue, selectOrder, searchQuery, setSearchQuery}) => {


    return (
        <>

        <Searchbar
          placeholder="Search"
          onChangeText={setSearchQuery}
          value={searchQuery}
        />
        <Picker
            selectedValue={orderValue}
            onValueChange={(itemValue, itemIndex) => 
                selectOrder(itemValue)
            }
        >
            <Picker.Item label="Latest" value={ {orderBy: "CREATED_AT", orderDirection: "DESC"} }/>
            <Picker.Item label="Highest" value={ {orderBy: "RATING_AVERAGE", orderDirection: "DESC"} } />
            <Picker.Item label="Lowest" value={ {orderBy: "RATING_AVERAGE", orderDirection: "ASC"} } />
        </Picker>

        </>
        
    )
}

/* export const RepositoryListContainer = ({ repositories, order, setOrder, searchQuery, setSearchQuery}) => {

  const repositoryNodes = repositories
    ? repositories.edges.map(edge => edge.node)
    : []

    const navigate = useNavigate()

  return (

    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      ListHeaderComponent={<RepositoryListHeader orderValue={order} selectOrder={setOrder} searchQuery={searchQuery} setSearchQuery={setSearchQuery}/>}
      renderItem={({item, index, separators}) => {
      return (
        <Pressable onPress={() => {
          navigate(`/${item.id}`)
          }
        }>
          <RepositoryItem item={item} openSingle={false}/>
        </Pressable>  
      )
      }}
    />
  );
} */

export class RepositoryListContainer extends React.Component {
  renderHeader = () => {
    const props = this.props

  
    return (
      <RepositoryListHeader orderValue={props.order} selectOrder={props.setOrder} searchQuery={props.searchQuery} setSearchQuery={props.setSearchQuery}/>
    )
  }
  render() {
    const props = this.props

    const repositoryNodes = props.repositories
    ? props.repositories.edges.map(edge => edge.node)
    : []

    return (
      <FlatList
        data={repositoryNodes}
        ItemSeparatorComponent={ItemSeparator}
        ListHeaderComponent={this.renderHeader}
        renderItem={({item, index, separators}) => {
        return (
          <Pressable onPress={() => {
            props.navigate(`/${item.id}`)
            }
          }>
            <RepositoryItem item={item} openSingle={false}/>
          </Pressable>  
        )
        }}
      />
    )
   


  }
}

const RepositoryList = () => {

  const [selectedOrder, setSelectedOrder] = useState('')
  const [searchQuery, setSearchQuery] = useState('');
  const [value] = useDebounce(searchQuery, 500)
  const navigate = useNavigate()
  

  const { data, loading } = useRepositories(selectedOrder.orderBy, selectedOrder.orderDirection, value);


  if (loading) {
    return <Text>loading data...</Text>
  }


  return (
    <RepositoryListContainer 
      repositories={data.repositories} 
      order={selectedOrder} 
      setOrder={setSelectedOrder}
      searchQuery={searchQuery}
      setSearchQuery={setSearchQuery}
      navigate={navigate}
      />
  )
  
  

  
};

export default RepositoryList;
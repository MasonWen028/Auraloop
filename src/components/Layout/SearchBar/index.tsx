import React, { useState } from 'react';
import { Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import './index.css';

const SearchBar: React.FC = () => {
  const [isFocused, setIsFocused] = useState(false);

  const styles = {
    searchBar: {
      width: '240px', // Adjust width as needed
      borderRadius: '6px', // Rounded corners
      backgroundColor: 'rgba(255, 255, 255, 0.2)', // Slightly transparent background
      border: isFocused ? '1px solid white' : '1px solid transparent', // Border similar to the design
      padding: '4px 12px',
      display: 'flex',
      alignItems: 'center',
      WebkitAppRegion: 'no-drag',
      marginRight: '25px',
      height: '30px'
    },
    input: {
      backgroundColor: 'transparent',
      border: 'none',
      color: 'white', // Text color
      outline: 'none',
      boxShadow: 'none', // Remove shadow
      'input::placeholder': {
        color: 'rgba(255, 255, 255, 0.5)', // White with transparency
      },
    },
  };

  return (
    <div style={styles.searchBar}>
      <SearchOutlined style={{ color: 'rgba(255, 255, 255, 0.5)', fontSize: '18px' }} />
      <Input
        className='white-placeholder'
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder="Artist, song or album name"
        style={styles.input}
      />
    </div>
  );
};

export default SearchBar;

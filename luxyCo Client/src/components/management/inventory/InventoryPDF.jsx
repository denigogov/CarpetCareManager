import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    fontFamily: 'Helvetica',
    fontSize: 12,
    padding: 20,
  },
  table: {
    display: 'table',
    width: 'auto',
    margin: 'auto',
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#000',
    padding: 5,
  },
  tableHeader: {
    backgroundColor: '#f2f2f2',
    fontWeight: 'bold',
  },
  tableCell: {
    margin: 'auto',
    fontSize: 10,
    padding: 5,
  },
});

const InventoryPDF = ({ inventory }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.table}>
        <View style={[styles.tableRow, styles.tableHeader]}>
          <Text style={styles.tableCell}>ID</Text>
          <Text style={styles.tableCell}>Name</Text>
          <Text style={styles.tableCell}>Details</Text>
          <Text style={styles.tableCell}>Quantity</Text>
          <Text style={styles.tableCell}>Category</Text>
          <Text style={styles.tableCell}>Location</Text>
          <Text style={styles.tableCell}>Price</Text>
          <Text style={styles.tableCell}>Entry Date</Text>
        </View>
        {inventory.map(i => (
          <View key={i.id} style={styles.tableRow}>
            <Text style={styles.tableCell}>{i.article_number}</Text>
            <Text style={styles.tableCell}>
              {i.article_name || 'name not provided'}
            </Text>
            <Text style={styles.tableCell}>
              {i.details || 'details not provided'}
            </Text>
            <Text style={styles.tableCell}>
              {i.quantity || 'quantity not provided'}
            </Text>
            <Text style={styles.tableCell}>
              {i.category_name || 'category errors'}
            </Text>
            <Text style={styles.tableCell}>
              {i.location || 'location not provided'}
            </Text>
            <Text style={styles.tableCell}>
              {i.price || 'price not provided'} €
            </Text>
          </View>
        ))}
      </View>
    </Page>
  </Document>
);

export default InventoryPDF;

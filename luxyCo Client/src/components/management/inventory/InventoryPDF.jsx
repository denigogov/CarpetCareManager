import React from 'react';
import {
  Document,
  Page,
  Text,
  View,
  Image,
  StyleSheet,
} from '@react-pdf/renderer';
import appLogo from '../../../assets/appLogoPNG.png';

const thermalPrinterWidth = 80; // in mm
const logoWidth = 14; // fit the logo within the paper width
// We can also generate pdf with qr code

const styles = StyleSheet.create({
  page: {
    fontFamily: 'Helvetica',
    width: `${thermalPrinterWidth}mm`,
    minHeight: '100%', // content height
    padding: '5mm', // padding around the content
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 13,
    marginBottom: 10,
    color: '#666666',
  },
  table: {
    marginBottom: 10,
    display: 'table',
    width: '100%',
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    borderBottomStyle: 'solid',
    alignItems: 'center',
    height: 20,
  },
  tableCell: {
    flex: 1,
    padding: 2,
    fontSize: 8,
    textAlign: 'center',
  },
  tableHeader: {
    backgroundColor: '#f0f0f0',
    color: '#333',
    fontWeight: 'bold',
    fontSize: 8,
  },

  widerTableCell: {
    flex: 2,
  },

  logoContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: 3,
    margin: 3,
  },

  image: {
    width: `${logoWidth}mm`,
    height: `${logoWidth}mm`,
    border: '1px solid #e0e0e0',
    padding: 10,
    borderRadius: 4,
    objectPosition: 'center',
  },

  companyName: {
    color: '#666666',
    letterSpacing: 2,
    fontFamily: 'Helvetica',
  },

  logoTextContainer: {
    fontSize: 11,
    display: 'flex',
    flexDirection: 'row',
  },

  textSlogan: {
    fontSize: 8,
    fontWeight: 300,
    color: '#666666',
    fontFamily: 'Helvetica',
    textAlign: 'right',
    letterSpacing: 1,
    marginBottom: 40,
  },
  textBold: {
    fontFamily: 'Helvetica-BoldOblique',
  },

  smallFont: {
    fontSize: 10,
  },
  footer: {
    padding: 15,
    fontSize: 8,
    backgroundColor: '#f4f6f8',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

const InventoryPDF = ({ inventory, selectedCategoryName }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View>
        <View>
          <View style={styles.logoContainer}>
            <Image style={styles.image} src={appLogo} />
            <View style={styles.logoTextContainer}>
              <Text style={styles.companyName}>Luxy</Text>
              <Text style={[styles.companyName, styles.textBold]}>Co</Text>
            </View>
          </View>
          <Text style={styles.textSlogan}>Carpet Cleaning Service</Text>
        </View>

        <View>
          <Text style={[styles.title, styles.textBold]}>Article List</Text>
          <Text style={[styles.title, styles.smallFont]}>
            {selectedCategoryName?.category_name ?? 'All'}
          </Text>
          <View style={styles.table}>
            {/* Table header */}
            <View style={[styles.tableRow, styles.tableHeader]}>
              <Text style={styles.tableCell}>#</Text>
              <Text style={styles.tableCell}>Article Number</Text>
              <Text style={[styles.tableCell, styles.widerTableCell]}>
                Article Name
              </Text>
              <Text style={styles.tableCell}>quantity</Text>
              <Text style={styles.tableCell}>Price</Text>
              <Text style={styles.tableCell}>Category</Text>
              <Text style={styles.tableCell}>Date entry</Text>
            </View>
            {/* Table rows */}
            {inventory.map((i, index) => (
              <View key={i.id} style={styles.tableRow}>
                <Text style={styles.tableCell}>{index + 1}</Text>
                <Text style={styles.tableCell}>{i.article_number}</Text>
                <Text style={[styles.tableCell, styles.widerTableCell]}>
                  {`${i.article_name} - ${i.details}`}
                </Text>
                <Text style={[styles.tableCell]}>{i.quantity}</Text>

                <Text style={styles.tableCell}>{i.price} €</Text>
                <Text style={styles.tableCell}>{i.category_name}</Text>
                <Text style={styles.tableCell}>
                  {new Date(i.date_entry)
                    .toISOString()
                    .slice(0, 10)
                    .replaceAll('-', '.')
                    .replace('T', ' ')}
                </Text>
              </View>
            ))}
          </View>
        </View>
      </View>

      <View style={styles.footer}>
        <View>
          <Text>LuxyCo</Text>
          <Text>Königstraße 22</Text>
          <Text>76131, Karlsruhe</Text>
        </View>
        <View>
          <Text>Phone: +491638843357</Text>
          <Text>E-mail: denigogov@gmail.com</Text>
        </View>
        <View>
          <Text>Sparkasse Karlsruhe</Text>
          <Text>IBAN: DEXX XXXX XXXX XXXX XXXX XX</Text>
          <Text>BIC: XXXXXXX</Text>
        </View>
      </View>
    </Page>
  </Document>
);

export default InventoryPDF;

import {
  PDFDownloadLink,
  Document,
  Page,
  Text,
  View,
  Image,
  StyleSheet,
} from '@react-pdf/renderer';
import appLogo from '../../assets/appLogoPNG.png';

const thermalPrinterWidth = 80; // in mm
const logoWidth = 20; // fit the logo within the paper width

const styles = StyleSheet.create({
  page: {
    fontFamily: 'Helvetica',
    minHeight: '100%', // content height
    padding: '5mm', // padding around the content
  },
  title: {
    fontSize: 13,
    marginBottom: 10,
    fontWeight: 'bold',
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
    fontSize: 10,
    textAlign: 'center',
  },
  tableHeader: {
    backgroundColor: '#f0f0f0',
    color: '#333',
    fontWeight: 'bold',
    fontSize: 11,
  },
  logoContainer: {
    marginTop: 5,
    marginBottom: 10,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    borderBottom: '1px solid #e0e0e0',
    padding: 2,
  },
  image: {
    marginLeft: 6,
    width: `${logoWidth}mm`,
    height: `${logoWidth}mm`,
  },
  logoText: {
    fontSize: 8,
  },
  widerTableCell: {
    flex: 2,
  },
  textBold: {
    color: '#da0063',
    fontFamily: 'Helvetica-BoldOblique',
  },
});

const DetailsPDFCustomer = ({ orders, totalPrice, totalM2, customerName }) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.logoContainer}>
          <Image style={styles.image} src={appLogo} />
          <View style={styles.logoText}>
            <Text style={styles.textBold}>LuxyCo</Text>
            <Text>9955 Bald Hill Ave.</Text>
            <Text>Saint Albans, Karlsruhe 69213</Text>
          </View>
          <Text style={styles.title}>Customer Orders Report</Text>
          <Text style={styles.title}>{customerName[0]}</Text>
        </View>

        <View style={styles.table}>
          {/* Table header */}
          <View style={[styles.tableRow, styles.tableHeader]}>
            <Text style={styles.tableCell}>Orders</Text>
            <Text style={[styles.tableCell, styles.widerTableCell]}>
              Order Date
            </Text>
            <Text style={[styles.tableCell, styles.widerTableCell]}>
              Services
            </Text>
            <Text style={styles.tableCell}>Carpet Pieces</Text>
            <Text style={styles.tableCell}>m²</Text>
            <Text style={styles.tableCell}>Total Price</Text>
            <Text style={styles.tableCell}>Delivery</Text>
          </View>
          {/* Table rows */}
          {orders.map((order, i) => (
            <View key={i} style={styles.tableRow}>
              <Text style={styles.tableCell}>{i + 1}</Text>
              <Text style={[styles.tableCell, styles.widerTableCell]}>
                {new Date(order.order_date)
                  .toISOString()
                  .slice(0, 19)
                  .replaceAll('-', '.')
                  .replace('T', ' ')}
              </Text>
              <Text style={[styles.tableCell, styles.widerTableCell]}>
                {order.service_name}
              </Text>
              <Text style={styles.tableCell}>{order.pieces}</Text>
              <Text style={styles.tableCell}>{order.m2}</Text>
              <Text style={styles.tableCell}>{order.total_price} €</Text>
              <Text style={styles.tableCell}>
                {order.delivery === 0 ? 'no' : 'yes'}
              </Text>
            </View>
          ))}
        </View>

        <Text style={styles.tableCell}>Total Price: {totalPrice} €</Text>
        <Text style={styles.tableCell}>Total Size: {totalM2} m² </Text>
      </Page>
    </Document>
  );
};
export default DetailsPDFCustomer;

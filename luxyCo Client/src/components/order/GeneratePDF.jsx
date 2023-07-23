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
import downloadIcon from '../../assets/downloadIcon.svg';

const thermalPrinterWidth = 80; // in mm
const logoWidth = 20; // fit the logo within the paper width
// We can also generate pdf with qr code

const PDFGenerator = ({ data }) => {
  const styles = StyleSheet.create({
    page: {
      fontFamily: 'Helvetica',
      width: `${thermalPrinterWidth}mm`,
      minHeight: '100%', // content height
      padding: '5mm', // padding around the content
    },
    title: {
      fontSize: 10,
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
      fontSize: 6,
      textAlign: 'center',
    },
    tableHeader: {
      backgroundColor: '#f0f0f0',
      color: '#333',
      fontWeight: 'bold',
      fontSize: 8,
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

  // Define the PDF document content
  const PDFContent = (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.logoContainer}>
          <Image style={styles.image} src={appLogo} />
          <View style={styles.logoText}>
            <Text style={styles.textBold}>LuxyCo</Text>
            <Text>9955 Bald Hill Ave.</Text>
            <Text>Saint Albans, NY 11412</Text>
          </View>
        </View>
        <Text style={styles.title}>Order List</Text>
        <View style={styles.table}>
          {/* Table header */}
          <View style={[styles.tableRow, styles.tableHeader]}>
            <Text style={styles.tableCell}>Order Number</Text>
            <Text style={[styles.tableCell, styles.widerTableCell]}>
              Customer
            </Text>
            <Text style={[styles.tableCell, styles.widerTableCell]}>
              Address
            </Text>
            <Text style={styles.tableCell}>Order Date</Text>
            <Text style={styles.tableCell}>Carpet Pieces</Text>
            <Text style={styles.tableCell}>m²</Text>
            <Text style={styles.tableCell}>Total Price</Text>
            <Text style={styles.tableCell}>Delivery</Text>
          </View>
          {/* Table rows */}
          {data.map((order, i) => (
            <View key={order.id} style={styles.tableRow}>
              <Text style={styles.tableCell}>{order.id}</Text>
              <Text style={[styles.tableCell, styles.widerTableCell]}>
                {`${order.first_name} ${order.last_name}`}
              </Text>
              <Text style={[styles.tableCell, styles.widerTableCell]}>
                {order.street}
              </Text>
              <Text style={styles.tableCell}>
                {new Date(order.order_date)
                  .toISOString()
                  .slice(0, 19)
                  .replaceAll('-', '.')
                  .replace('T', ' ')}
              </Text>
              <Text style={styles.tableCell}>{order.carpet_pieces}</Text>
              <Text style={styles.tableCell}>{order.m2}</Text>
              <Text style={styles.tableCell}>{order.total_price} €</Text>
              <Text style={styles.tableCell}>
                {order.delivery === 0 ? 'no' : 'yes'}
              </Text>
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );

  const date = data.length > 0 ? data[0].order_date : '';
  const fileName = `order_list_${date.slice(0, 10)}.pdf`;

  return (
    <PDFDownloadLink document={PDFContent} fileName={fileName}>
      {({ blob, url, loading, error }) =>
        loading ? (
          ''
        ) : (
          <img
            style={{ width: '35px', height: '35px' }}
            src={downloadIcon}
            alt="download icon"
          />
        )
      }
    </PDFDownloadLink>
  );
};

export default PDFGenerator;

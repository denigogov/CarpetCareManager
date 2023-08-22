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
const logoWidth = 14; // fit the logo within the paper width
// We can also generate pdf with qr code

const PDFGenerator = ({ data }) => {
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
      fontSize: 6,
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

  // Define the PDF document content
  const PDFContent = (
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
            <Text style={[styles.title, styles.textBold]}>Order List</Text>
            <Text style={[styles.title, styles.smallFont]}>
              Period:
              {''}
              {new Date(data[0].order_date)
                .toISOString()
                .slice(0, 10)
                .replaceAll('-', '.')
                .replace('T', ' ')}
            </Text>
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
            <Text>E-mail: deni.gogov@gmail.com</Text>
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

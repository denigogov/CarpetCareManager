import React from "react";
import {
  PDFDownloadLink,
  PDFViewer,
  Document,
  Page,
  Text,
  View,
  Image,
  StyleSheet,
} from "@react-pdf/renderer";
import appLogo from "../../assets/appLogoPNG.png";
import downloadIcon from "../../assets/downloadIcon.svg";

const PDFGenerator = ({ data }) => {
  const styles = StyleSheet.create({
    page: {
      fontFamily: "Helvetica",
    },
    title: {
      fontSize: 24,
      marginBottom: 20,
      fontWeight: "bold",
    },
    table: {
      marginBottom: 20,
      display: "table",
      width: "100%",
    },
    tableRow: {
      flexDirection: "row",
      borderBottomWidth: 1,
      borderBottomColor: "#ccc",
      borderBottomStyle: "solid",
      alignItems: "center",
      height: 30,
    },
    tableCell: {
      flex: 1,
      padding: 5,
      fontSize: 8,
      textAlign: "center",
    },
    tableHeader: {
      backgroundColor: "#f0f0f0",
      color: "#333",
      fontWeight: "bold",
    },

    logoContainer: {
      marginTop: 10,
      marginBottom: 20,
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      gap: 10,
    },
    image: {
      marginLeft: 6,
      width: 30,
      height: 30,
    },

    logoText: {
      fontSize: 10,
    },

    widerTableCell: {
      flex: 2,
    },

    textBold: {
      color: "#da0063",
      fontFamily: "Helvetica-BoldOblique",
    },
  });

  // Define the PDF document content
  const PDFContent = (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.imageContainer}>
          <View style={styles.logoContainer}>
            <Image style={styles.image} src={appLogo} />
            <View style={styles.logoText}>
              <Text style={styles.textBold}>LuxyCo</Text>
              <Text>9955 Bald Hill Ave.</Text>
              <Text>Saint Albans, NY 11412</Text>
            </View>
          </View>

          <View style={styles.infoContainer}></View>
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
              <Text
                style={[styles.tableCell, styles.widerTableCell]}
              >{`${order.first_name} ${order.last_name}`}</Text>
              <Text style={[styles.tableCell, styles.widerTableCell]}>
                {order.street}
              </Text>

              <Text style={styles.tableCell}>
                {new Date(order.order_date)
                  .toISOString()
                  .slice(0, 19)
                  .replaceAll("-", ".")
                  .replace("T", " ")}
              </Text>
              <Text style={styles.tableCell}>{order.carpet_pieces}</Text>
              <Text style={styles.tableCell}>{order.m2}</Text>
              <Text style={styles.tableCell}>{order.total_price} €</Text>

              <Text style={styles.tableCell}>
                {order.delivery === 0 ? "no" : "yes"}
              </Text>
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );
  const date = data.length > 0 ? data[0].order_date : "";
  const fileName = `order_list_${date.slice(0, 10)}`;

  return (
    <PDFDownloadLink document={PDFContent} fileName={fileName}>
      {({ blob, url, loading, error }) =>
        loading ? (
          "Generating PDF..."
        ) : (
          <img
            style={{ width: "35px", height: "35px" }}
            src={downloadIcon}
            alt="download icon"
          />
        )
      }
    </PDFDownloadLink>
  );
};

export default PDFGenerator;

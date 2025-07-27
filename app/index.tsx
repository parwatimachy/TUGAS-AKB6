import React from 'react';
import { SafeAreaView, View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { FontAwesome, Ionicons, MaterialCommunityIcons, Feather, AntDesign } from '@expo/vector-icons';

// --- 1. NEW DATA STRUCTURE: ORGANIZED BY ICON LIBRARY (each with unique icons) ---
const ICON_CATALOG = {
  'FontAwesome': [
    { name: 'space-shuttle', color: '#FFFFFF' },
    { name: 'qrcode', color: '#FFFFFF' },
  ],
  'Ionicons': [
    { name: 'skull-outline', color: '#FFFFFF' },
    { name: 'flask-outline', color: '#FFFFFF' },
  ],
  'MaterialCommunityIcons': [
    { name: 'alien-outline', color: '#FFFFFF' },
    { name: 'dna', color: '#FFFFFF' },
  ],
  'Feather': [
    { name: 'wind', color: '#FFFFFF' },
    { name: 'anchor', color: '#FFFFFF' },
  ],
  'AntDesign': [
    { name: 'rest', color: '#FFFFFF' },
    { name: 'disconnect', color: '#FFFFFF' },
  ],
};

// --- 2. ICON FACTORY: MAP LIBRARY NAME TO ACTUAL COMPONENT ---
const IconFactory = {
  FontAwesome,
  Ionicons,
  MaterialCommunityIcons,
  Feather,
  AntDesign,
};

// --- 3. CHILD COMPONENT WITH CONDITIONAL STYLING ---
interface IconItemProps {
  IconComponent: React.ComponentType<any>;
  name: string;
  color: string;
  library: string;
  index: number; // Used to determine background color
}

const IconItem: React.FC<IconItemProps> = ({ IconComponent, name, color, library, index }) => {
  const backgroundStyle = index % 2 === 0 ? styles.cardDark : styles.cardRed;

  return (
    <View style={[styles.cardBase, backgroundStyle]}>
      <IconComponent name={name} size={48} color={color} />
      <Text style={styles.iconNameText}>{name}</Text>
      <Text style={styles.libraryText}>{library}</Text>
    </View>
  );
};

// --- 4. MAIN COMPONENT WITH NESTED RENDERING ---
export default function IconGalleryScreen() {
  const fullIconList = Object.entries(ICON_CATALOG).flatMap(([libraryName, icons]) => 
    icons.map(icon => ({ ...icon, library: libraryName }))
  );

  return (
    <SafeAreaView style={styles.screenContainer}>
      <ScrollView>
        <View style={styles.headerContainer}>
          <Text style={styles.mainTitle}>Vector Icon Collection</Text>
          <Text style={styles.subTitle}>10 Samples from Various Libraries</Text>
        </View>
        <View style={styles.gridContainer}>
          {fullIconList.map((icon, index) => {
            const IconComponent = IconFactory[icon.library as keyof typeof IconFactory];
            if (!IconComponent) return null;

            return (
              <IconItem
                key={`${icon.library}-${icon.name}`}
                IconComponent={IconComponent}
                name={icon.name}
                color={icon.color}
                library={icon.library}
                index={index}
              />
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// --- 5. STYLING: DARK & RED THEME ---
const screenWidth = Dimensions.get('window').width;
const itemWidth = (screenWidth - 48) / 2;

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: '#111111',
  },
  headerContainer: {
    paddingVertical: 32,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#444444',
  },
  mainTitle: {
    fontSize: 26,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  subTitle: {
    fontSize: 16,
    color: '#AAAAAA',
    marginTop: 8,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 16,
    paddingTop: 24,
  },
  cardBase: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    alignItems: 'center',
    justifyContent: 'center',
    width: itemWidth,
    aspectRatio: 1,
    borderWidth: 1,
  },
  cardDark: {
    backgroundColor: '#1E1E1E',
    borderColor: '#333333',
  },
  cardRed: {
    backgroundColor: '#DA291C',
    borderColor: '#FF5555',
  },
  iconNameText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#FFFFFF',
    marginTop: 16,
    textAlign: 'center',
  },
  libraryText: {
    fontSize: 12,
    color: '#BBBBBB',
    marginTop: 4,
    fontStyle: 'italic',
  },
});

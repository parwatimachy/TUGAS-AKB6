import React from 'react';
import { SafeAreaView, View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { FontAwesome, Ionicons, MaterialCommunityIcons, Feather, AntDesign } from '@expo/vector-icons';

// --- 1. STRUKTUR DATA BARU: DIOBJEKKAN BERDASARKAN PUSTAKA (dengan ikon unik) ---
const KATALOG_SIMBOL = {
  'FontAwesome': [
    { nama: 'space-shuttle', warna: '#FFFFFF' },
    { nama: 'qrcode', warna: '#FFFFFF' },
  ],
  'Ionicons': [
    { nama: 'skull-outline', warna: '#FFFFFF' },
    { nama: 'flask-outline', warna: '#FFFFFF' },
  ],
  'MaterialCommunityIcons': [
    { nama: 'alien-outline', warna: '#FFFFFF' },
    { nama: 'dna', warna: '#FFFFFF' },
  ],
  'Feather': [
    { nama: 'wind', warna: '#FFFFFF' },
    { nama: 'anchor', warna: '#FFFFFF' },
  ],
  'AntDesign': [
    { nama: 'rest', warna: '#FFFFFF' },
    { nama: 'disconnect', warna: '#FFFFFF' },
  ],
};

// --- 2. PABRIK IKON: MEMETAKAN NAMA KE KOMPONEN AKTUAL ---
const PabrikIkon = {
  FontAwesome,
  Ionicons,
  MaterialCommunityIcons,
  Feather,
  AntDesign,
};

// --- 3. KOMPONEN ANAK DENGAN LOGIKA BERBEDA ---
interface ItemSimbolProps {
  IkonKomponen: React.ComponentType<any>;
  nama: string;
  warna: string;
  pustaka: string;
  index: number; // Tambahkan index untuk menentukan warna latar
}

const ItemSimbol: React.FC<ItemSimbolProps> = ({ IkonKomponen, nama, warna, pustaka, index }) => {
  // Tentukan gaya kartu berdasarkan index (genap/ganjil)
  const gayaLatar = index % 2 === 0 ? visual.bingkaiItemHitam : visual.bingkaiItemMerah;

  return (
    <View style={[visual.bingkaiItem, gayaLatar]}>
      <IkonKomponen name={nama} size={48} color={warna} />
      <Text style={visual.teksNamaItem}>{nama}</Text>
      <Text style={visual.teksPustakaItem}>{pustaka}</Text>
    </View>
  );
};

// --- 4. KOMPONEN UTAMA DENGAN RENDER BERTINGKAT ---
export default function PameranSimbolLayar() {
  // Mengubah data objek menjadi satu array tunggal untuk memudahkan looping dengan index
  const daftarIkonLengkap = Object.entries(KATALOG_SIMBOL).flatMap(([namaPustaka, daftarIkon]) => 
    daftarIkon.map(ikon => ({ ...ikon, pustaka: namaPustaka }))
  );

  return (
    <SafeAreaView style={visual.wadahLayar}>
      <ScrollView>
        <View style={visual.areaJudul}>
          <Text style={visual.teksJudulUtama}>Koleksi Simbol Vektor</Text>
          <Text style={visual.teksSubJudul}>10 Contoh dari Berbagai Pustaka</Text>
        </View>
        <View style={visual.areaKisi}>
          {daftarIkonLengkap.map((ikon, index) => {
            const IkonKomponen = PabrikIkon[ikon.pustaka as keyof typeof PabrikIkon];
            if (!IkonKomponen) return null;

            return (
              <ItemSimbol
                key={${ikon.pustaka}-${ikon.nama}}
                IkonKomponen={IkonKomponen}
                nama={ikon.nama}
                warna={ikon.warna}
                pustaka={ikon.pustaka}
                index={index}
              />
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// --- 5. GAYA VISUAL BARU: TEMA "HITAM & MERAH" ---
const lebarLayar = Dimensions.get('window').width;
const lebarItem = (lebarLayar - 48) / 2;

const visual = StyleSheet.create({
  wadahLayar: {
    flex: 1,
    backgroundColor: '#111111', // Latar belakang hitam pekat
  },
  areaJudul: {
    paddingVertical: 32,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#444444',
  },
  teksJudulUtama: {
    fontSize: 26,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  teksSubJudul: {
    fontSize: 16,
    color: '#AAAAAA',
    marginTop: 8,
  },
  areaKisi: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 16,
    paddingTop: 24,
  },
  bingkaiItem: { // Gaya dasar untuk semua item
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    alignItems: 'center',
    justifyContent: 'center',
    width: lebarItem,
    aspectRatio: 1,
    borderWidth: 1,
  },
  bingkaiItemHitam: { // Latar Hitam
    backgroundColor: '#1E1E1E',
    borderColor: '#333333',
  },
  bingkaiItemMerah: { // Latar Merah
    backgroundColor: '#DA291C',
    borderColor: '#FF5555',
  },
  teksNamaItem: {
    fontSize: 15,
    fontWeight: '600',
    color: '#FFFFFF',
    marginTop: 16,
    textAlign: 'center',
  },
  teksPustakaItem: {
    fontSize: 12,
    color: '#BBBBBB',
    marginTop: 4,
    fontStyle: 'italic',
  },
});

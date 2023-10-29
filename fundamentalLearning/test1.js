let siswa = { nama: "Fema", usia: 18 };

console.log(...siswa);

let nilai = { lulus: true, nilai: 91.5 };

const nilaiSiswa = { ...siswa, ...nilai};
console.log(nilaiSiswa);
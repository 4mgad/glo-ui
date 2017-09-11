const scheme = (ranges) => {
	let colorsArr = [];
	ranges.map((colors) => {
		colors.match(/.{6}/g).map((x) => {
			let color = "#" + x;
			!colorsArr.includes(color) && colorsArr.push(color);
		});
	});
	return colorsArr;
};

export default class colorSchemes {
	static accent = scheme([
		"7fc97fbeaed4fdc086",
		"7fc97fbeaed4fdc086ffff99",
		"7fc97fbeaed4fdc086ffff99386cb0",
		"7fc97fbeaed4fdc086ffff99386cb0f0027f",
		"7fc97fbeaed4fdc086ffff99386cb0f0027fbf5b17",
		"7fc97fbeaed4fdc086ffff99386cb0f0027fbf5b17666666"
	]);

	static blues = scheme([
		"deebf79ecae13182bd",
		"eff3ffbdd7e76baed62171b5",
		"eff3ffbdd7e76baed63182bd08519c",
		"eff3ffc6dbef9ecae16baed63182bd08519c",
		"eff3ffc6dbef9ecae16baed64292c62171b5084594",
		"f7fbffdeebf7c6dbef9ecae16baed64292c62171b5084594",
		"f7fbffdeebf7c6dbef9ecae16baed64292c62171b508519c08306b"
	]);

	static brBG = scheme([
		"d8b365f5f5f55ab4ac",
		"a6611adfc27d80cdc1018571",
		"a6611adfc27df5f5f580cdc1018571",
		"8c510ad8b365f6e8c3c7eae55ab4ac01665e",
		"8c510ad8b365f6e8c3f5f5f5c7eae55ab4ac01665e",
		"8c510abf812ddfc27df6e8c3c7eae580cdc135978f01665e",
		"8c510abf812ddfc27df6e8c3f5f5f5c7eae580cdc135978f01665e",
		"5430058c510abf812ddfc27df6e8c3c7eae580cdc135978f01665e003c30",
		"5430058c510abf812ddfc27df6e8c3f5f5f5c7eae580cdc135978f01665e003c30"
	]);

	static buGn = scheme([
		"e5f5f999d8c92ca25f",
		"edf8fbb2e2e266c2a4238b45",
		"edf8fbb2e2e266c2a42ca25f006d2c",
		"edf8fbccece699d8c966c2a42ca25f006d2c",
		"edf8fbccece699d8c966c2a441ae76238b45005824",
		"f7fcfde5f5f9ccece699d8c966c2a441ae76238b45005824",
		"f7fcfde5f5f9ccece699d8c966c2a441ae76238b45006d2c00441b"
	]);

	static buPu = scheme([
		"e0ecf49ebcda8856a7",
		"edf8fbb3cde38c96c688419d",
		"edf8fbb3cde38c96c68856a7810f7c",
		"edf8fbbfd3e69ebcda8c96c68856a7810f7c",
		"edf8fbbfd3e69ebcda8c96c68c6bb188419d6e016b",
		"f7fcfde0ecf4bfd3e69ebcda8c96c68c6bb188419d6e016b",
		"f7fcfde0ecf4bfd3e69ebcda8c96c68c6bb188419d810f7c4d004b"
	]);

	static dark2 = scheme([
		"1b9e77d95f027570b3",
		"1b9e77d95f027570b3e7298a",
		"1b9e77d95f027570b3e7298a66a61e",
		"1b9e77d95f027570b3e7298a66a61ee6ab02",
		"1b9e77d95f027570b3e7298a66a61ee6ab02a6761d",
		"1b9e77d95f027570b3e7298a66a61ee6ab02a6761d666666"
	]);

	static gnBu = scheme([
		"e0f3dba8ddb543a2ca",
		"f0f9e8bae4bc7bccc42b8cbe",
		"f0f9e8bae4bc7bccc443a2ca0868ac",
		"f0f9e8ccebc5a8ddb57bccc443a2ca0868ac",
		"f0f9e8ccebc5a8ddb57bccc44eb3d32b8cbe08589e",
		"f7fcf0e0f3dbccebc5a8ddb57bccc44eb3d32b8cbe08589e",
		"f7fcf0e0f3dbccebc5a8ddb57bccc44eb3d32b8cbe0868ac084081"
	]);

	static greens = scheme([
		"e5f5e0a1d99b31a354",
		"edf8e9bae4b374c476238b45",
		"edf8e9bae4b374c47631a354006d2c",
		"edf8e9c7e9c0a1d99b74c47631a354006d2c",
		"edf8e9c7e9c0a1d99b74c47641ab5d238b45005a32",
		"f7fcf5e5f5e0c7e9c0a1d99b74c47641ab5d238b45005a32",
		"f7fcf5e5f5e0c7e9c0a1d99b74c47641ab5d238b45006d2c00441b"
	]);

	static greys = scheme([
		"f0f0f0bdbdbd636363",
		"f7f7f7cccccc969696525252",
		"f7f7f7cccccc969696636363252525",
		"f7f7f7d9d9d9bdbdbd969696636363252525",
		"f7f7f7d9d9d9bdbdbd969696737373525252252525",
		"fffffff0f0f0d9d9d9bdbdbd969696737373525252252525",
		"fffffff0f0f0d9d9d9bdbdbd969696737373525252252525000000"
	]);

	static orRd = scheme([
		"fee8c8fdbb84e34a33",
		"fef0d9fdcc8afc8d59d7301f",
		"fef0d9fdcc8afc8d59e34a33b30000",
		"fef0d9fdd49efdbb84fc8d59e34a33b30000",
		"fef0d9fdd49efdbb84fc8d59ef6548d7301f990000",
		"fff7ecfee8c8fdd49efdbb84fc8d59ef6548d7301f990000",
		"fff7ecfee8c8fdd49efdbb84fc8d59ef6548d7301fb300007f0000"
	]);

	static oranges = scheme([
		"fee6cefdae6be6550d",
		"feeddefdbe85fd8d3cd94701",
		"feeddefdbe85fd8d3ce6550da63603",
		"feeddefdd0a2fdae6bfd8d3ce6550da63603",
		"feeddefdd0a2fdae6bfd8d3cf16913d948018c2d04",
		"fff5ebfee6cefdd0a2fdae6bfd8d3cf16913d948018c2d04",
		"fff5ebfee6cefdd0a2fdae6bfd8d3cf16913d94801a636037f2704"
	]);

	static pRGn = scheme([
		"af8dc3f7f7f77fbf7b",
		"7b3294c2a5cfa6dba0008837",
		"7b3294c2a5cff7f7f7a6dba0008837",
		"762a83af8dc3e7d4e8d9f0d37fbf7b1b7837",
		"762a83af8dc3e7d4e8f7f7f7d9f0d37fbf7b1b7837",
		"762a839970abc2a5cfe7d4e8d9f0d3a6dba05aae611b7837",
		"762a839970abc2a5cfe7d4e8f7f7f7d9f0d3a6dba05aae611b7837",
		"40004b762a839970abc2a5cfe7d4e8d9f0d3a6dba05aae611b783700441b",
		"40004b762a839970abc2a5cfe7d4e8f7f7f7d9f0d3a6dba05aae611b783700441b"
	]);

	static paired = scheme([
		"a6cee31f78b4b2df8a",
		"a6cee31f78b4b2df8a33a02c",
		"a6cee31f78b4b2df8a33a02cfb9a99",
		"a6cee31f78b4b2df8a33a02cfb9a99e31a1c",
		"a6cee31f78b4b2df8a33a02cfb9a99e31a1cfdbf6f",
		"a6cee31f78b4b2df8a33a02cfb9a99e31a1cfdbf6fff7f00",
		"a6cee31f78b4b2df8a33a02cfb9a99e31a1cfdbf6fff7f00cab2d6",
		"a6cee31f78b4b2df8a33a02cfb9a99e31a1cfdbf6fff7f00cab2d66a3d9a",
		"a6cee31f78b4b2df8a33a02cfb9a99e31a1cfdbf6fff7f00cab2d66a3d9affff99",
		"a6cee31f78b4b2df8a33a02cfb9a99e31a1cfdbf6fff7f00cab2d66a3d9affff99b15928"
	]);

	static pastel1 = scheme([
		"fbb4aeb3cde3ccebc5",
		"fbb4aeb3cde3ccebc5decbe4",
		"fbb4aeb3cde3ccebc5decbe4fed9a6",
		"fbb4aeb3cde3ccebc5decbe4fed9a6ffffcc",
		"fbb4aeb3cde3ccebc5decbe4fed9a6ffffcce5d8bd",
		"fbb4aeb3cde3ccebc5decbe4fed9a6ffffcce5d8bdfddaec",
		"fbb4aeb3cde3ccebc5decbe4fed9a6ffffcce5d8bdfddaecf2f2f2"
	]);

	static pastel2 = scheme([
		"b3e2cdfdcdaccbd5e8",
		"b3e2cdfdcdaccbd5e8f4cae4",
		"b3e2cdfdcdaccbd5e8f4cae4e6f5c9",
		"b3e2cdfdcdaccbd5e8f4cae4e6f5c9fff2ae",
		"b3e2cdfdcdaccbd5e8f4cae4e6f5c9fff2aef1e2cc",
		"b3e2cdfdcdaccbd5e8f4cae4e6f5c9fff2aef1e2cccccccc"
	]);

	static piYG = scheme([
		"e9a3c9f7f7f7a1d76a",
		"d01c8bf1b6dab8e1864dac26",
		"d01c8bf1b6daf7f7f7b8e1864dac26",
		"c51b7de9a3c9fde0efe6f5d0a1d76a4d9221",
		"c51b7de9a3c9fde0eff7f7f7e6f5d0a1d76a4d9221",
		"c51b7dde77aef1b6dafde0efe6f5d0b8e1867fbc414d9221",
		"c51b7dde77aef1b6dafde0eff7f7f7e6f5d0b8e1867fbc414d9221",
		"8e0152c51b7dde77aef1b6dafde0efe6f5d0b8e1867fbc414d9221276419",
		"8e0152c51b7dde77aef1b6dafde0eff7f7f7e6f5d0b8e1867fbc414d9221276419"
	]);

	static puBuGn = scheme([
		"ece2f0a6bddb1c9099",
		"f6eff7bdc9e167a9cf02818a",
		"f6eff7bdc9e167a9cf1c9099016c59",
		"f6eff7d0d1e6a6bddb67a9cf1c9099016c59",
		"f6eff7d0d1e6a6bddb67a9cf3690c002818a016450",
		"fff7fbece2f0d0d1e6a6bddb67a9cf3690c002818a016450",
		"fff7fbece2f0d0d1e6a6bddb67a9cf3690c002818a016c59014636"
	]);

	static puBu = scheme([
		"ece7f2a6bddb2b8cbe",
		"f1eef6bdc9e174a9cf0570b0",
		"f1eef6bdc9e174a9cf2b8cbe045a8d",
		"f1eef6d0d1e6a6bddb74a9cf2b8cbe045a8d",
		"f1eef6d0d1e6a6bddb74a9cf3690c00570b0034e7b",
		"fff7fbece7f2d0d1e6a6bddb74a9cf3690c00570b0034e7b",
		"fff7fbece7f2d0d1e6a6bddb74a9cf3690c00570b0045a8d023858"
	]);

	static puOr = scheme([
		"f1a340f7f7f7998ec3",
		"e66101fdb863b2abd25e3c99",
		"e66101fdb863f7f7f7b2abd25e3c99",
		"b35806f1a340fee0b6d8daeb998ec3542788",
		"b35806f1a340fee0b6f7f7f7d8daeb998ec3542788",
		"b35806e08214fdb863fee0b6d8daebb2abd28073ac542788",
		"b35806e08214fdb863fee0b6f7f7f7d8daebb2abd28073ac542788",
		"7f3b08b35806e08214fdb863fee0b6d8daebb2abd28073ac5427882d004b",
		"7f3b08b35806e08214fdb863fee0b6f7f7f7d8daebb2abd28073ac5427882d004b"
	]);

	static puRd = scheme([
		"e7e1efc994c7dd1c77",
		"f1eef6d7b5d8df65b0ce1256",
		"f1eef6d7b5d8df65b0dd1c77980043",
		"f1eef6d4b9dac994c7df65b0dd1c77980043",
		"f1eef6d4b9dac994c7df65b0e7298ace125691003f",
		"f7f4f9e7e1efd4b9dac994c7df65b0e7298ace125691003f",
		"f7f4f9e7e1efd4b9dac994c7df65b0e7298ace125698004367001f"
	]);

	static purples = scheme([
		"efedf5bcbddc756bb1",
		"f2f0f7cbc9e29e9ac86a51a3",
		"f2f0f7cbc9e29e9ac8756bb154278f",
		"f2f0f7dadaebbcbddc9e9ac8756bb154278f",
		"f2f0f7dadaebbcbddc9e9ac8807dba6a51a34a1486",
		"fcfbfdefedf5dadaebbcbddc9e9ac8807dba6a51a34a1486",
		"fcfbfdefedf5dadaebbcbddc9e9ac8807dba6a51a354278f3f007d"
	]);

	static rdBu = scheme([
		"ef8a62f7f7f767a9cf",
		"ca0020f4a58292c5de0571b0",
		"ca0020f4a582f7f7f792c5de0571b0",
		"b2182bef8a62fddbc7d1e5f067a9cf2166ac",
		"b2182bef8a62fddbc7f7f7f7d1e5f067a9cf2166ac",
		"b2182bd6604df4a582fddbc7d1e5f092c5de4393c32166ac",
		"b2182bd6604df4a582fddbc7f7f7f7d1e5f092c5de4393c32166ac",
		"67001fb2182bd6604df4a582fddbc7d1e5f092c5de4393c32166ac053061",
		"67001fb2182bd6604df4a582fddbc7f7f7f7d1e5f092c5de4393c32166ac053061"
	]);

	static rdGy = scheme([
		"ef8a62ffffff999999",
		"ca0020f4a582bababa404040",
		"ca0020f4a582ffffffbababa404040",
		"b2182bef8a62fddbc7e0e0e09999994d4d4d",
		"b2182bef8a62fddbc7ffffffe0e0e09999994d4d4d",
		"b2182bd6604df4a582fddbc7e0e0e0bababa8787874d4d4d",
		"b2182bd6604df4a582fddbc7ffffffe0e0e0bababa8787874d4d4d",
		"67001fb2182bd6604df4a582fddbc7e0e0e0bababa8787874d4d4d1a1a1a",
		"67001fb2182bd6604df4a582fddbc7ffffffe0e0e0bababa8787874d4d4d1a1a1a"
	]);

	static rdPu = scheme([
		"fde0ddfa9fb5c51b8a",
		"feebe2fbb4b9f768a1ae017e",
		"feebe2fbb4b9f768a1c51b8a7a0177",
		"feebe2fcc5c0fa9fb5f768a1c51b8a7a0177",
		"feebe2fcc5c0fa9fb5f768a1dd3497ae017e7a0177",
		"fff7f3fde0ddfcc5c0fa9fb5f768a1dd3497ae017e7a0177",
		"fff7f3fde0ddfcc5c0fa9fb5f768a1dd3497ae017e7a017749006a"
	]);

	static rdYlBu = scheme([
		"fc8d59ffffbf91bfdb",
		"d7191cfdae61abd9e92c7bb6",
		"d7191cfdae61ffffbfabd9e92c7bb6",
		"d73027fc8d59fee090e0f3f891bfdb4575b4",
		"d73027fc8d59fee090ffffbfe0f3f891bfdb4575b4",
		"d73027f46d43fdae61fee090e0f3f8abd9e974add14575b4",
		"d73027f46d43fdae61fee090ffffbfe0f3f8abd9e974add14575b4",
		"a50026d73027f46d43fdae61fee090e0f3f8abd9e974add14575b4313695",
		"a50026d73027f46d43fdae61fee090ffffbfe0f3f8abd9e974add14575b4313695"
	]);

	static rdYlGn = scheme([
		"fc8d59ffffbf91cf60",
		"d7191cfdae61a6d96a1a9641",
		"d7191cfdae61ffffbfa6d96a1a9641",
		"d73027fc8d59fee08bd9ef8b91cf601a9850",
		"d73027fc8d59fee08bffffbfd9ef8b91cf601a9850",
		"d73027f46d43fdae61fee08bd9ef8ba6d96a66bd631a9850",
		"d73027f46d43fdae61fee08bffffbfd9ef8ba6d96a66bd631a9850",
		"a50026d73027f46d43fdae61fee08bd9ef8ba6d96a66bd631a9850006837",
		"a50026d73027f46d43fdae61fee08bffffbfd9ef8ba6d96a66bd631a9850006837"
	]);

	static reds = scheme([
		"fee0d2fc9272de2d26",
		"fee5d9fcae91fb6a4acb181d",
		"fee5d9fcae91fb6a4ade2d26a50f15",
		"fee5d9fcbba1fc9272fb6a4ade2d26a50f15",
		"fee5d9fcbba1fc9272fb6a4aef3b2ccb181d99000d",
		"fff5f0fee0d2fcbba1fc9272fb6a4aef3b2ccb181d99000d",
		"fff5f0fee0d2fcbba1fc9272fb6a4aef3b2ccb181da50f1567000d"
	]);

	static set1 = scheme([
		"e41a1c377eb84daf4a",
		"e41a1c377eb84daf4a984ea3",
		"e41a1c377eb84daf4a984ea3ff7f00",
		"e41a1c377eb84daf4a984ea3ff7f00ffff33",
		"e41a1c377eb84daf4a984ea3ff7f00ffff33a65628",
		"e41a1c377eb84daf4a984ea3ff7f00ffff33a65628f781bf",
		"e41a1c377eb84daf4a984ea3ff7f00ffff33a65628f781bf999999"
	]);

	static set2 = scheme([
		"66c2a5fc8d628da0cb",
		"66c2a5fc8d628da0cbe78ac3",
		"66c2a5fc8d628da0cbe78ac3a6d854",
		"66c2a5fc8d628da0cbe78ac3a6d854ffd92f",
		"66c2a5fc8d628da0cbe78ac3a6d854ffd92fe5c494",
		"66c2a5fc8d628da0cbe78ac3a6d854ffd92fe5c494b3b3b3"
	]);

	static set3 = scheme([
		"8dd3c7ffffb3bebada",
		"8dd3c7ffffb3bebadafb8072",
		"8dd3c7ffffb3bebadafb807280b1d3",
		"8dd3c7ffffb3bebadafb807280b1d3fdb462",
		"8dd3c7ffffb3bebadafb807280b1d3fdb462b3de69",
		"8dd3c7ffffb3bebadafb807280b1d3fdb462b3de69fccde5",
		"8dd3c7ffffb3bebadafb807280b1d3fdb462b3de69fccde5d9d9d9",
		"8dd3c7ffffb3bebadafb807280b1d3fdb462b3de69fccde5d9d9d9bc80bd",
		"8dd3c7ffffb3bebadafb807280b1d3fdb462b3de69fccde5d9d9d9bc80bdccebc5",
		"8dd3c7ffffb3bebadafb807280b1d3fdb462b3de69fccde5d9d9d9bc80bdccebc5ffed6f"
	]);

	static spectral = scheme([
		"fc8d59ffffbf99d594",
		"d7191cfdae61abdda42b83ba",
		"d7191cfdae61ffffbfabdda42b83ba",
		"d53e4ffc8d59fee08be6f59899d5943288bd",
		"d53e4ffc8d59fee08bffffbfe6f59899d5943288bd",
		"d53e4ff46d43fdae61fee08be6f598abdda466c2a53288bd",
		"d53e4ff46d43fdae61fee08bffffbfe6f598abdda466c2a53288bd",
		"9e0142d53e4ff46d43fdae61fee08be6f598abdda466c2a53288bd5e4fa2",
		"9e0142d53e4ff46d43fdae61fee08bffffbfe6f598abdda466c2a53288bd5e4fa2"
	]);

	static ylGnBu = scheme([
		"edf8b17fcdbb2c7fb8",
		"ffffcca1dab441b6c4225ea8",
		"ffffcca1dab441b6c42c7fb8253494",
		"ffffccc7e9b47fcdbb41b6c42c7fb8253494",
		"ffffccc7e9b47fcdbb41b6c41d91c0225ea80c2c84",
		"ffffd9edf8b1c7e9b47fcdbb41b6c41d91c0225ea80c2c84",
		"ffffd9edf8b1c7e9b47fcdbb41b6c41d91c0225ea8253494081d58"
	]);

	static ylGn = scheme([
		"f7fcb9addd8e31a354",
		"ffffccc2e69978c679238443",
		"ffffccc2e69978c67931a354006837",
		"ffffccd9f0a3addd8e78c67931a354006837",
		"ffffccd9f0a3addd8e78c67941ab5d238443005a32",
		"ffffe5f7fcb9d9f0a3addd8e78c67941ab5d238443005a32",
		"ffffe5f7fcb9d9f0a3addd8e78c67941ab5d238443006837004529"
	]);

	static ylOrBr = scheme([
		"fff7bcfec44fd95f0e",
		"ffffd4fed98efe9929cc4c02",
		"ffffd4fed98efe9929d95f0e993404",
		"ffffd4fee391fec44ffe9929d95f0e993404",
		"ffffd4fee391fec44ffe9929ec7014cc4c028c2d04",
		"ffffe5fff7bcfee391fec44ffe9929ec7014cc4c028c2d04",
		"ffffe5fff7bcfee391fec44ffe9929ec7014cc4c02993404662506"
	]);

	static ylOrRd = scheme([
		"ffeda0feb24cf03b20",
		"ffffb2fecc5cfd8d3ce31a1c",
		"ffffb2fecc5cfd8d3cf03b20bd0026",
		"ffffb2fed976feb24cfd8d3cf03b20bd0026",
		"ffffb2fed976feb24cfd8d3cfc4e2ae31a1cb10026",
		"ffffccffeda0fed976feb24cfd8d3cfc4e2ae31a1cb10026",
		"ffffccffeda0fed976feb24cfd8d3cfc4e2ae31a1cbd0026800026"
	]);
}

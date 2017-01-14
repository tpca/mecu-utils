/*jshint esversion: 6 */

// Utilities:

/*  Convert TSV to JSON
 **  The TSV must have headers!
 */
function tsvJSON(tsv){

    var lines=tsv.split("\n");
    var result = [];
    var headers=lines[0].split("\t");

    for(var i=1;i<lines.length;i++){

        var obj = {};
        var currentLine=lines[i].split("\t");

        for(var j=0;j<headers.length;j++){
            if(headers[j] !== ''){
                obj[headers[j]] = currentLine[j];
            }
        }

        result.push(obj);
    }

    return result;
}

class MecuUtils {

    static parse(data){
        /* Exaple header and two lines of mecu read
         *
         *  	Accession	Description	GeneName	ExptID	Peptides	PSMs	AAs	MW.kDA	pI	RatioCount	T37	T40	T43	T46	T49	T52	T55	T58	T61	T64	TotalExpt
         *  5	P08238	Heat shock protein HSP 90-beta OS=Homo sapiens GN=HSP90AB1 PE=1 SV=4	HSP90AB1	NA	152	7389	724	83.212	5.03	526	0.993418134979102	0.978615783630729	0.97497273873077	0.910103808578295	0.664154031369918	0.29416643578552	0.118510981760351	0.070412173454166	0.0494253861148508	0.0497946624113495	4
         *  51	P07900	Isoform 2 of Heat shock protein HSP 90-alpha OS=Homo sapiens GN=HSP90AA1	HSP90AA1	NA	135	5930	854	98.099	5.16	562	0.993418134979102	0.96630219963012	0.971515311976001	0.895380650942425	0.679949714261505	0.301507737429416	0.143483356667326	0.082749434523936	0.06300393504397	0.0591289023326945	4
         */
        data = tsvJSON(data);

        var proteins = [];

        for(var i=0; i<data.length; i++){
            if(data[i].Accession !== '' && data[i].Accession !== "" && data[i].Accession !== undefined){
                var protein = {
                    uniprotId: data[i].Accession.toUpperCase(),
                    primaryGene: data[i].GeneName.toUpperCase(),
                    peptides: parseInt(data[i].Peptides),
                    psms: data[i].PSMs,
                    totalExpt: parseInt(data[i].TotalExpt),
                    reads: []
                };
                // Peptides,  PSMs, Total Expt  and Ratio Count

                for(var key in data[i]){
                    if(key.match(/^T[0-9]+/)){
                        var temperatureRead = {
                            "temperature": parseInt(key.substr(1,key.length)),
                            "ratio": parseFloat(data[i][key])
                        };
                        protein.reads.push(temperatureRead);
                    }
                }

                proteins.push(protein);
            }
        }

        return proteins;
    }
};

module.exports = MecuUtils;
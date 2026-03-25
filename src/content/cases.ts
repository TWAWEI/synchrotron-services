import type { CaseStudy } from "@/lib/types";

export const caseStudies: CaseStudy[] = [
  {
    id: "case-001",
    title: "蛋白質藥物聚集機制解析，協助生物製劑處方優化",
    industry: "biotech-pharma",
    client: "某上市生技公司（單株抗體藥物開發商）",
    challenge:
      "客戶的單株抗體新藥在加速穩定性試驗中出現不明原因聚集，導致批次放行失敗，嚴重影響臨床進度與 IND 申請時程。",
    solution:
      "利用同步輻射小角度 X 光散射（SAXS）結合動態光散射（DLS），系統性地研究不同 pH 值、溫度及賦形劑條件下蛋白質的聚集行為。並以 XANES 分析關鍵二硫鍵的氧化狀態，確認聚集誘因。",
    outcome:
      "成功鑑別出導致聚集的關鍵製程參數，並優化緩衝液配方。最終產品在 40°C/75% RH 加速穩定性試驗中通過 6 個月測試，客戶如期完成 IND 申請，節省估計超過 1,500 萬元的重工成本。",
    techniques: ["SAXS", "XANES", "動態光散射", "粉末繞射"],
    image: "/images/cases/biotech-antibody.jpg",
    featured: true,
  },
  {
    id: "case-002",
    title: "仿製藥多晶型鑑別，確保與原廠藥晶型一致性",
    industry: "biotech-pharma",
    client: "國內知名學名藥廠",
    challenge:
      "客戶仿製藥在生體相等性（BE）試驗中表現不如預期，懷疑與原料藥晶型轉換有關，但傳統 DSC 與實驗室 XRD 無法提供足夠靈敏度進行確認。",
    solution:
      "應用高解析度同步輻射粉末繞射（HRPD），對仿製藥與原廠藥進行精確晶型對比分析，同時量測製粒及壓錠後的晶型穩定性，找出製程中發生晶型轉換的關鍵步驟。",
    outcome:
      "確認仿製藥製程中高剪切造粒步驟導致約 8% 原料藥轉換為低溶解度晶型，藉此優化製程條件後，BE 試驗一次通過，成功取得藥品查驗登記許可。",
    techniques: ["高解析度粉末繞射（HRPD）", "Rietveld 精修", "固態 NMR"],
    image: "/images/cases/pharma-crystal.jpg",
    featured: false,
  },
  {
    id: "case-003",
    title: "先進製程薄膜應力分析，提升 3nm 節點良率",
    industry: "semiconductor-materials",
    client: "台灣某半導體晶圓代工廠",
    challenge:
      "客戶在開發 3nm 製程節點的高介電金屬閘極（HKMG）結構時，遭遇嚴重的薄膜翹曲與界面分層問題，影響元件特性與良率，亟需原子層級的界面結構資訊。",
    solution:
      "結合掠角入射 X 光繞射（GIXRD）、X 光反射率（XRR）及同步輻射螢光微探針，系統性地分析不同 ALD 沉積條件下高介電薄膜的結構、應力及界面成分分佈，建立製程窗口模型。",
    outcome:
      "成功找出最優化的 ALD 製程溫度與週期比，將薄膜翹曲量降低 65%，HKMG 結構的元件良率從 72% 提升至 91%，協助客戶如期完成製程認證。",
    techniques: ["GIXRD", "XRR", "同步輻射螢光微探針", "X 光吸收光譜（XAS）"],
    image: "/images/cases/semiconductor-thinfilm.jpg",
    featured: true,
  },
  {
    id: "case-004",
    title: "進口茶葉重金屬形態分析，建立風險評估依據",
    industry: "food-agriculture",
    client: "食品藥物管理局委託計畫",
    challenge:
      "市售進口茶葉鉛含量超標案例頻傳，但現行法規僅規範總量而未考量化學形態，難以精確評估人體暴露風險。主管機關需要更科學的風險評估工具。",
    solution:
      "應用同步輻射 X 光螢光（SXRF）元素面分佈掃描，配合 Pb LIII-edge XANES 光譜分析，系統性研究 50 份茶葉樣品中鉛的空間分佈與化學形態，並建立浸泡模擬實驗模型。",
    outcome:
      "研究發現茶葉中鉛主要以低生體可用率的磷酸鉛形態存在，沖泡條件下的實際溶出率僅為總量的 3-7%，研究結果已提供主管機關作為修訂殘留限量標準的科學依據。",
    techniques: ["同步輻射 X 光螢光（SXRF）", "XANES", "元素面分佈掃描"],
    image: "/images/cases/food-tea-metal.jpg",
    featured: false,
  },
  {
    id: "case-005",
    title: "航太鈦合金 3D 列印零件缺陷檢測與壽命預測",
    industry: "precision-manufacturing",
    client: "國內航太零件供應商",
    challenge:
      "客戶採用選擇性雷射熔融（SLM）技術製造鈦合金航太結構件，但疲勞測試結果變異性大，懷疑內部孔隙率分佈不均勻是主要原因，需要非破壞性的三維缺陷評估。",
    solution:
      "利用高空間解析度同步輻射 X 光電腦斷層掃描（SR-μCT），對批次抽樣零件進行三維孔隙率掃描，解析度達 1 μm。結合有限元素分析（FEA），建立孔隙分佈與疲勞壽命的相關模型。",
    outcome:
      "成功建立 SLM 製程參數（雷射功率、掃描速度）與孔隙率的定量關係，優化製程後孔隙率從平均 0.8% 降至 0.15%，疲勞壽命標準差縮減 70%，協助客戶通過 AS9100 認證稽核。",
    techniques: ["同步輻射微電腦斷層（SR-μCT）", "有限元素分析", "殘留應力 X 光繞射"],
    image: "/images/cases/manufacturing-titanium.jpg",
    featured: true,
  },
  {
    id: "case-006",
    title: "鋰電池正極材料循環降解機制研究，協助國產電芯開發",
    industry: "semiconductor-materials",
    client: "電動車電池模組製造商",
    challenge:
      "客戶自製高鎳 NCM811 正極材料在 500 次循環後容量衰退明顯高於國際競品，需要找出材料層級的降解機制以指導材料改質方向。",
    solution:
      "應用原位（operando）同步輻射 X 光繞射與 X 光吸收光譜，即時追蹤充放電過程中 NCM811 的晶體結構演化與鎳、錳、鈷的氧化態變化，同時結合 SR-μCT 觀察電極顆粒的開裂行為。",
    outcome:
      "發現粒子邊緣的岩鹽相轉變是主要容量衰退原因，並確認高倍率充放電加速此轉變。據此建議客戶採用濃度梯度摻雜策略，改質後電池在 80°C 高溫循環 1,000 次後容量保持率提升至 85%。",
    techniques: ["原位 X 光繞射（operando XRD）", "X 光吸收光譜（XAS）", "SR-μCT", "XANES"],
    image: "/images/cases/battery-ncm.jpg",
    featured: false,
  },
];

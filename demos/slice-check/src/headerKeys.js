// Listing of DICOM metadata keys and labels
// Source: https://www.dabsoft.ch/dicom/6/6/
var headerKeys = `
(0008,0001)	Length to End	LengthToEnd	UL	1	RET
(0008,0005)	Specific Character Set	SpecificCharacterSet	CS	1-n
(0008,0006)	Language Code Sequence	LanguageCodeSequence	SQ	1
(0008,0008)	Image Type	ImageType	CS	2-n
(0008,0010)	Recognition Code	RecognitionCode	SH	1	RET
(0008,0012)	Instance Creation Date	InstanceCreationDate	DA	1
(0008,0013)	Instance Creation Time	InstanceCreationTime	TM	1
(0008,0014)	Instance Creator UID	InstanceCreatorUID	UI	1
(0008,0016)	SOP Class UID	SOPClassUID	UI	1
(0008,0018)	SOP Instance UID	SOPInstanceUID	UI	1
(0008,001A)	Related General SOP Class UID	RelatedGeneralSOPClassUID	UI	1-n
(0008,001B)	Original Specialized SOP Class UID	OriginalSpecializedSOPClassUID	UI	1
(0008,0020)	Study Date	StudyDate	DA	1
(0008,0021)	Series Date	SeriesDate	DA	1
(0008,0022)	Acquisition Date	AcquisitionDate	DA	1
(0008,0023)	Content Date	ContentDate	DA	1
(0008,0024)	Overlay Date	OverlayDate	DA	1	RET
(0008,0025)	Curve Date	CurveDate	DA	1	RET
(0008,002A)	Acquisition DateTime	AcquisitionDateTime	DT	1
(0008,0030)	Study Time	StudyTime	TM	1
(0008,0031)	Series Time	SeriesTime	TM	1
(0008,0032)	Acquisition Time	AcquisitionTime	TM	1
(0008,0033)	Content Time	ContentTime	TM	1
(0008,0034)	Overlay Time	OverlayTime	TM	1	RET
(0008,0035)	Curve Time	CurveTime	TM	1	RET
(0008,0040)	Data Set Type	DataSetType	US	1	RET
(0008,0041)	Data Set Subtype	DataSetSubtype	LO	1	RET
(0008,0042)	Nuclear Medicine Series Type	NuclearMedicineSeriesType	CS	1	RET
(0008,0050)	Accession Number	AccessionNumber	SH	1
(0008,0051)	Issuer of Accession Number Sequence	IssuerOfAccessionNumberSequence	SQ	1
(0008,0052)	Query/Retrieve Level	QueryRetrieveLevel	CS	1
(0008,0054)	Retrieve AE Title	RetrieveAETitle	AE	1-n
(0008,0056)	Instance Availability	InstanceAvailability	CS	1
(0008,0058)	Failed SOP Instance UID List	FailedSOPInstanceUIDList	UI	1-n
(0008,0060)	Modality	Modality	CS	1
(0008,0061)	Modalities in Study	ModalitiesInStudy	CS	1-n
(0008,0062)	SOP Classes in Study	SOPClassesInStudy	UI	1-n
(0008,0064)	Conversion Type	ConversionType	CS	1
(0008,0068)	Presentation Intent Type	PresentationIntentType	CS	1
(0008,0070)	Manufacturer	Manufacturer	LO	1
(0008,0080)	Institution Name	InstitutionName	LO	1
(0008,0081)	Institution Address	InstitutionAddress	ST	1
(0008,0082)	Institution Code Sequence	InstitutionCodeSequence	SQ	1
(0008,0090)	Referring Physician’s Name	ReferringPhysicianName	PN	1
(0008,0092)	Referring Physician’s Address	ReferringPhysicianAddress	ST	1
(0008,0094)	Referring Physician’s Telephone Numbers	ReferringPhysicianTelephoneNumbers	SH	1-n
(0008,0096)	Referring Physician Identification Sequence	ReferringPhysicianIdentificationSequence	SQ	1
(0008,0100)	Code Value	CodeValue	SH	1
(0008,0102)	Coding Scheme Designator	CodingSchemeDesignator	SH	1
(0008,0103)	Coding Scheme Version	CodingSchemeVersion	SH	1
(0008,0104)	Code Meaning	CodeMeaning	LO	1
(0008,0105)	Mapping Resource	MappingResource	CS	1
(0008,0106)	Context Group Version	ContextGroupVersion	DT	1
(0008,0107)	Context Group Local Version	ContextGroupLocalVersion	DT	1
(0008,010B)	Context Group Extension Flag	ContextGroupExtensionFlag	CS	1
(0008,010C)	Coding Scheme UID	CodingSchemeUID	UI	1
(0008,010D)	Context Group Extension Creator UID	ContextGroupExtensionCreatorUID	UI	1
(0008,010F)	Context Identifier	ContextIdentifier	CS	1
(0008,0110)	Coding Scheme Identification Sequence	CodingSchemeIdentificationSequence	SQ	1
(0008,0112)	Coding Scheme Registry	CodingSchemeRegistry	LO	1
(0008,0114)	Coding Scheme External ID	CodingSchemeExternalID	ST	1
(0008,0115)	Coding Scheme Name	CodingSchemeName	ST	1
(0008,0116)	Coding Scheme Responsible Organization	CodingSchemeResponsibleOrganization	ST	1
(0008,0117)	Context UID	ContextUID	UI	1
(0008,0201)	Timezone Offset From UTC	TimezoneOffsetFromUTC	SH	1
(0008,1000)	Network ID	NetworkID	AE	1	RET
(0008,1010)	Station Name	StationName	SH	1
(0008,1030)	Study Description	StudyDescription	LO	1
(0008,1032)	Procedure Code Sequence	ProcedureCodeSequence	SQ	1
(0008,103E)	Series Description	SeriesDescription	LO	1
(0008,103F)	Series Description Code Sequence	SeriesDescriptionCodeSequence	SQ	1
(0008,1040)	Institutional Department Name	InstitutionalDepartmentName	LO	1
(0008,1048)	Physician(s) of Record	PhysiciansOfRecord	PN	1-n
(0008,1049)	Physician(s) of Record Identification Sequence	PhysiciansOfRecordIdentificationSequence	SQ	1
(0008,1050)	Performing Physician’s Name	PerformingPhysicianName	PN	1-n
(0008,1052)	Performing Physician Identification Sequence	PerformingPhysicianIdentificationSequence	SQ	1
(0008,1060)	Name of Physician(s) Reading Study	NameOfPhysiciansReadingStudy	PN	1-n
(0008,1062)	Physician(s) Reading Study Identification Sequence	PhysiciansReadingStudyIdentificationSequence	SQ	1
(0008,1070)	Operators’ Name	OperatorsName	PN	1-n
(0008,1072)	Operator Identification Sequence	OperatorIdentificationSequence	SQ	1
(0008,1080)	Admitting Diagnoses Description	AdmittingDiagnosesDescription	LO	1-n
(0008,1084)	Admitting Diagnoses Code Sequence	AdmittingDiagnosesCodeSequence	SQ	1
(0008,1090)	Manufacturer’s Model Name	ManufacturerModelName	LO	1
(0008,1100)	Referenced Results Sequence	ReferencedResultsSequence	SQ	1	RET
(0008,1110)	Referenced Study Sequence	ReferencedStudySequence	SQ	1
(0008,1111)	Referenced Performed Procedure Step Sequence	ReferencedPerformedProcedureStepSequence	SQ	1
(0008,1115)	Referenced Series Sequence	ReferencedSeriesSequence	SQ	1
(0008,1120)	Referenced Patient Sequence	ReferencedPatientSequence	SQ	1
(0008,1125)	Referenced Visit Sequence	ReferencedVisitSequence	SQ	1
(0008,1130)	Referenced Overlay Sequence	ReferencedOverlaySequence	SQ	1	RET
(0008,1134)	Referenced Stereometric Instance Sequence	ReferencedStereometricInstanceSequence	SQ	1
(0008,113A)	Referenced Waveform Sequence	ReferencedWaveformSequence	SQ	1
(0008,1140)	Referenced Image Sequence	ReferencedImageSequence	SQ	1
(0008,1145)	Referenced Curve Sequence	ReferencedCurveSequence	SQ	1	RET
(0008,114A)	Referenced Instance Sequence	ReferencedInstanceSequence	SQ	1
(0008,114B)	Referenced Real World Value Mapping Instance Sequence	ReferencedRealWorldValueMappingInstanceSequence	SQ	1
(0008,1150)	Referenced SOP Class UID	ReferencedSOPClassUID	UI	1
(0008,1155)	Referenced SOP Instance UID	ReferencedSOPInstanceUID	UI	1
(0008,115A)	SOP Classes Supported	SOPClassesSupported	UI	1-n
(0008,1160)	Referenced Frame Number	ReferencedFrameNumber	IS	1-n
(0008,1161)	Simple Frame List	SimpleFrameList	UL	1-n
(0008,1162)	Calculated Frame List	CalculatedFrameList	UL	3-3n
(0008,1163)	Time Range	TimeRange	FD	2
(0008,1164)	Frame Extraction Sequence	FrameExtractionSequence	SQ	1
(0008,1167)	Multi-Frame Source SOP Instance UID	MultiFrameSourceSOPInstanceUID	UI	1
(0008,1195)	Transaction UID	TransactionUID	UI	1
(0008,1197)	Failure Reason	FailureReason	US	1
(0008,1198)	Failed SOP Sequence	FailedSOPSequence	SQ	1
(0008,1199)	Referenced SOP Sequence	ReferencedSOPSequence	SQ	1
(0008,1200)	Studies Containing Other Referenced Instances Sequence	StudiesContainingOtherReferencedInstancesSequence	SQ	1
(0008,1250)	Related Series Sequence	RelatedSeriesSequence	SQ	1
(0008,2110)	Lossy Image Compression (Retired)	LossyImageCompressionRetired	CS	1	RET
(0008,2111)	Derivation Description	DerivationDescription	ST	1
(0008,2112)	Source Image Sequence	SourceImageSequence	SQ	1
(0008,2120)	Stage Name	StageName	SH	1
(0008,2122)	Stage Number	StageNumber	IS	1
(0008,2124)	Number of Stages	NumberOfStages	IS	1
(0008,2127)	View Name	ViewName	SH	1
(0008,2128)	View Number	ViewNumber	IS	1
(0008,2129)	Number of Event Timers	NumberOfEventTimers	IS	1
(0008,212A)	Number of Views in Stage	NumberOfViewsInStage	IS	1
(0008,2130)	Event Elapsed Time(s)	EventElapsedTimes	DS	1-n
(0008,2132)	Event Timer Name(s)	EventTimerNames	LO	1-n
(0008,2133)	Event Timer Sequence	EventTimerSequence	SQ	1
(0008,2134)	Event Time Offset	EventTimeOffset	FD	1
(0008,2135)	Event Code Sequence	EventCodeSequence	SQ	1
(0008,2142)	Start Trim	StartTrim	IS	1
(0008,2143)	Stop Trim	StopTrim	IS	1
(0008,2144)	Recommended Display Frame Rate	RecommendedDisplayFrameRate	IS	1
(0008,2200)	Transducer Position	TransducerPosition	CS	1	RET
(0008,2204)	Transducer Orientation	TransducerOrientation	CS	1	RET
(0008,2208)	Anatomic Structure	AnatomicStructure	CS	1	RET
(0008,2218)	Anatomic Region Sequence	AnatomicRegionSequence	SQ	1
(0008,2220)	Anatomic Region Modifier Sequence	AnatomicRegionModifierSequence	SQ	1
(0008,2228)	Primary Anatomic Structure Sequence	PrimaryAnatomicStructureSequence	SQ	1
(0008,2229)	Anatomic Structure, Space or Region Sequence	AnatomicStructureSpaceOrRegionSequence	SQ	1
(0008,2230)	Primary Anatomic Structure Modifier Sequence	PrimaryAnatomicStructureModifierSequence	SQ	1
(0008,2240)	Transducer Position Sequence	TransducerPositionSequence	SQ	1	RET
(0008,2242)	Transducer Position Modifier Sequence	TransducerPositionModifierSequence	SQ	1	RET
(0008,2244)	Transducer Orientation Sequence	TransducerOrientationSequence	SQ	1	RET
(0008,2246)	Transducer Orientation Modifier Sequence	TransducerOrientationModifierSequence	SQ	1	RET
(0008,2251)	Anatomic Structure Space Or Region Code Sequence (Trial)	AnatomicStructureSpaceOrRegionCodeSequenceTrial	SQ	1	RET
(0008,2253)	Anatomic Portal Of Entrance Code Sequence (Trial)	AnatomicPortalOfEntranceCodeSequenceTrial	SQ	1	RET
(0008,2255)	Anatomic Approach Direction Code Sequence (Trial)	AnatomicApproachDirectionCodeSequenceTrial	SQ	1	RET
(0008,2256)	Anatomic Perspective Description (Trial)	AnatomicPerspectiveDescriptionTrial	ST	1	RET
(0008,2257)	Anatomic Perspective Code Sequence (Trial)	AnatomicPerspectiveCodeSequenceTrial	SQ	1	RET
(0008,2258)	Anatomic Location Of Examining Instrument Description (Trial)	AnatomicLocationOfExaminingInstrumentDescriptionTrial	ST	1	RET
(0008,2259)	Anatomic Location Of Examining Instrument Code Sequence (Trial)	AnatomicLocationOfExaminingInstrumentCodeSequenceTrial	SQ	1	RET
(0008,225A)	Anatomic Structure Space Or Region Modifier Code Sequence (Trial)	AnatomicStructureSpaceOrRegionModifierCodeSequenceTrial	SQ	1	RET
(0008,225C)	OnAxis Background Anatomic Structure Code Sequence (Trial)	OnAxisBackgroundAnatomicStructureCodeSequenceTrial	SQ	1	RET
(0008,3001)	Alternate Representation Sequence	AlternateRepresentationSequence	SQ	1
(0008,3010)	Irradiation Event UID	IrradiationEventUID	UI	1
(0008,4000)	Identifying Comments	IdentifyingComments	LT	1	RET
(0008,9007)	Frame Type	FrameType	CS	4
(0008,9092)	Referenced Image Evidence Sequence	ReferencedImageEvidenceSequence	SQ	1
(0008,9121)	Referenced Raw Data Sequence	ReferencedRawDataSequence	SQ	1
(0008,9123)	Creator-Version UID	CreatorVersionUID	UI	1
(0008,9124)	Derivation Image Sequence	DerivationImageSequence	SQ	1
(0008,9154)	Source Image Evidence Sequence	SourceImageEvidenceSequence	SQ	1
(0008,9205)	Pixel Presentation	PixelPresentation	CS	1
(0008,9206)	Volumetric Properties	VolumetricProperties	CS	1
(0008,9207)	Volume Based Calculation Technique	VolumeBasedCalculationTechnique	CS	1
(0008,9208)	Complex Image Component	ComplexImageComponent	CS	1
(0008,9209)	Acquisition Contrast	AcquisitionContrast	CS	1
(0008,9215)	Derivation Code Sequence	DerivationCodeSequence	SQ	1
(0008,9237)	Referenced Presentation State Sequence	ReferencedPresentationStateSequence	SQ	1
(0008,9410)	Referenced Other Plane Sequence	ReferencedOtherPlaneSequence	SQ	1
(0008,9458)	Frame Display Sequence	FrameDisplaySequence	SQ	1
(0008,9459)	Recommended Display Frame Rate in Float	RecommendedDisplayFrameRateInFloat	FL	1
(0008,9460)	Skip Frame Range Flag	SkipFrameRangeFlag	CS	1
(0010,0010)	Patient’s Name	PatientName	PN	1
(0010,0020)	Patient ID	PatientID	LO	1
(0010,0021)	Issuer of Patient ID	IssuerOfPatientID	LO	1
(0010,0022)	Type of Patient ID	TypeOfPatientID	CS	1
(0010,0024)	Issuer of Patient ID Qualifiers Sequence	IssuerOfPatientIDQualifiersSequence	SQ	1
(0010,0030)	Patient’s Birth Date	PatientBirthDate	DA	1
(0010,0032)	Patient’s Birth Time	PatientBirthTime	TM	1
(0010,0040)	Patient’s Sex	PatientSex	CS	1
(0010,0050)	Patient’s Insurance Plan Code Sequence	PatientInsurancePlanCodeSequence	SQ	1
(0010,0101)	Patient’s Primary Language Code Sequence	PatientPrimaryLanguageCodeSequence	SQ	1
(0010,0102)	Patient’s Primary Language Modifier Code Sequence	PatientPrimaryLanguageModifierCodeSequence	SQ	1
(0010,1000)	Other Patient IDs	OtherPatientIDs	LO	1-n
(0010,1001)	Other Patient Names	OtherPatientNames	PN	1-n
(0010,1002)	Other Patient IDs Sequence	OtherPatientIDsSequence	SQ	1
(0010,1005)	Patient’s Birth Name	PatientBirthName	PN	1
(0010,1010)	Patient’s Age	PatientAge	AS	1
(0010,1020)	Patient’s Size	PatientSize	DS	1
(0010,1021)	Patient’s Size Code Sequence	PatientSizeCodeSequence	SQ	1
(0010,1030)	Patient’s Weight	PatientWeight	DS	1
(0010,1040)	Patient’s Address	PatientAddress	LO	1
(0010,1050)	Insurance Plan Identification	InsurancePlanIdentification	LO	1-n	RET
(0010,1060)	Patient’s Mother’s Birth Name	PatientMotherBirthName	PN	1
(0010,1080)	Military Rank	MilitaryRank	LO	1
(0010,1081)	Branch of Service	BranchOfService	LO	1
(0010,1090)	Medical Record Locator	MedicalRecordLocator	LO	1
(0010,2000)	Medical Alerts	MedicalAlerts	LO	1-n
(0010,2110)	Allergies	Allergies	LO	1-n
(0010,2150)	Country of Residence	CountryOfResidence	LO	1
(0010,2152)	Region of Residence	RegionOfResidence	LO	1
(0010,2154)	Patient’s Telephone Numbers	PatientTelephoneNumbers	SH	1-n
(0010,2160)	Ethnic Group	EthnicGroup	SH	1
(0010,2180)	Occupation	Occupation	SH	1
(0010,21A0)	Smoking Status	SmokingStatus	CS	1
(0010,21B0)	Additional Patient History	AdditionalPatientHistory	LT	1
(0010,21C0)	Pregnancy Status	PregnancyStatus	US	1
(0010,21D0)	Last Menstrual Date	LastMenstrualDate	DA	1
(0010,21F0)	Patient’s Religious Preference	PatientReligiousPreference	LO	1
(0010,2201)	Patient Species Description	PatientSpeciesDescription	LO	1
(0010,2202)	Patient Species Code Sequence	PatientSpeciesCodeSequence	SQ	1
(0010,2203)	Patient’s Sex Neutered	PatientSexNeutered	CS	1
(0010,2210)	Anatomical Orientation Type	AnatomicalOrientationType	CS	1
(0010,2292)	Patient Breed Description	PatientBreedDescription	LO	1
(0010,2293)	Patient Breed Code Sequence	PatientBreedCodeSequence	SQ	1
(0010,2294)	Breed Registration Sequence	BreedRegistrationSequence	SQ	1
(0010,2295)	Breed Registration Number	BreedRegistrationNumber	LO	1
(0010,2296)	Breed Registry Code Sequence	BreedRegistryCodeSequence	SQ	1
(0010,2297)	Responsible Person	ResponsiblePerson	PN	1
(0010,2298)	Responsible Person Role	ResponsiblePersonRole	CS	1
(0010,2299)	Responsible Organization	ResponsibleOrganization	LO	1
(0010,4000)	Patient Comments	PatientComments	LT	1
(0010,9431)	Examined Body Thickness	ExaminedBodyThickness	FL	1
(0012,0010)	Clinical Trial Sponsor Name	ClinicalTrialSponsorName	LO	1
(0012,0020)	Clinical Trial Protocol ID	ClinicalTrialProtocolID	LO	1
(0012,0021)	Clinical Trial Protocol Name	ClinicalTrialProtocolName	LO	1
(0012,0030)	Clinical Trial Site ID	ClinicalTrialSiteID	LO	1
(0012,0031)	Clinical Trial Site Name	ClinicalTrialSiteName	LO	1
(0012,0040)	Clinical Trial Subject ID	ClinicalTrialSubjectID	LO	1
(0012,0042)	Clinical Trial Subject Reading ID	ClinicalTrialSubjectReadingID	LO	1
(0012,0050)	Clinical Trial Time Point ID	ClinicalTrialTimePointID	LO	1
(0012,0051)	Clinical Trial Time Point Description	ClinicalTrialTimePointDescription	ST	1
(0012,0060)	Clinical Trial Coordinating Center Name	ClinicalTrialCoordinatingCenterName	LO	1
(0012,0062)	Patient Identity Removed	PatientIdentityRemoved	CS	1
(0012,0063)	De-identification Method	DeidentificationMethod	LO	1-n
(0012,0064)	De-identification Method Code Sequence	DeidentificationMethodCodeSequence	SQ	1
(0012,0071)	Clinical Trial Series ID	ClinicalTrialSeriesID	LO	1
(0012,0072)	Clinical Trial Series Description	ClinicalTrialSeriesDescription	LO	1
(0012,0081)	Clinical Trial Protocol Ethics Committee Name	ClinicalTrialProtocolEthicsCommitteeName	LO	1
(0012,0082)	Clinical Trial Protocol Ethics Committee Approval Number	ClinicalTrialProtocolEthicsCommitteeApprovalNumber	LO	1
(0012,0083)	Consent for Clinical Trial Use Sequence	ConsentForClinicalTrialUseSequence	SQ	1
(0012,0084)	Distribution Type	DistributionType	CS	1
(0012,0085)	Consent for Distribution Flag	ConsentForDistributionFlag	CS	1
(0014,0023)	CAD File Format	CADFileFormat	ST	1-n
(0014,0024)	Component Reference System	ComponentReferenceSystem	ST	1-n
(0014,0025)	Component Manufacturing Procedure	ComponentManufacturingProcedure	ST	1-n
(0014,0028)	Component Manufacturer	ComponentManufacturer	ST	1-n
(0014,0030)	Material Thickness	MaterialThickness	DS	1-n
(0014,0032)	Material Pipe Diameter	MaterialPipeDiameter	DS	1-n
(0014,0034)	Material Isolation Diameter	MaterialIsolationDiameter	DS	1-n
(0014,0042)	Material Grade	MaterialGrade	ST	1-n
(0014,0044)	Material Properties File ID	MaterialPropertiesFileID	ST	1-n
(0014,0045)	Material Properties File Format	MaterialPropertiesFileFormat	ST	1-n
(0014,0046)	Material Notes	MaterialNotes	LT	1
(0014,0050)	Component Shape	ComponentShape	CS	1
(0014,0052)	Curvature Type	CurvatureType	CS	1
(0014,0054)	Outer Diameter	OuterDiameter	DS	1
(0014,0056)	Inner Diameter	InnerDiameter	DS	1
(0014,1010)	Actual Environmental Conditions	ActualEnvironmentalConditions	ST	1
(0014,1020)	Expiry Date	ExpiryDate	DA	1
(0014,1040)	Environmental Conditions	EnvironmentalConditions	ST	1
(0014,2002)	Evaluator Sequence	EvaluatorSequence	SQ	1
(0014,2004)	Evaluator Number	EvaluatorNumber	IS	1
(0014,2006)	Evaluator Name	EvaluatorName	PN	1
(0014,2008)	Evaluation Attempt	EvaluationAttempt	IS	1
(0014,2012)	Indication Sequence	IndicationSequence	SQ	1
(0014,2014)	Indication Number	IndicationNumber	IS	1
(0014,2016)	Indication Label	IndicationLabel	SH	1
(0014,2018)	Indication Description	IndicationDescription	ST	1
(0014,201A)	Indication Type	IndicationType	CS	1-n
(0014,201C)	Indication Disposition	IndicationDisposition	CS	1
(0014,201E)	Indication ROI Sequence	IndicationROISequence	SQ	1
(0014,2030)	Indication Physical Property Sequence	IndicationPhysicalPropertySequence	SQ	1
(0014,2032)	Property Label	PropertyLabel	SH	1
(0014,2202)	Coordinate System Number of Axes	CoordinateSystemNumberOfAxes	IS	1
(0014,2204)	Coordinate System Axes Sequence	CoordinateSystemAxesSequence	SQ	1
(0014,2206)	Coordinate System Axis Description	CoordinateSystemAxisDescription	ST	1
(0014,2208)	Coordinate System Data Set Mapping	CoordinateSystemDataSetMapping	CS	1
(0014,220A)	Coordinate System Axis Number	CoordinateSystemAxisNumber	IS	1
(0014,220C)	Coordinate System Axis Type	CoordinateSystemAxisType	CS	1
(0014,220E)	Coordinate System Axis Units	CoordinateSystemAxisUnits	CS	1
(0014,2210)	Coordinate System Axis Values	CoordinateSystemAxisValues	OB	1
(0014,2220)	Coordinate System Transform Sequence	CoordinateSystemTransformSequence	SQ	1
(0014,2222)	Transform Description	TransformDescription	ST	1
(0014,2224)	Transform Number of Axes	TransformNumberOfAxes	IS	1
(0014,2226)	Transform Order of Axes	TransformOrderOfAxes	IS	1-n
(0014,2228)	Transformed Axis Units	TransformedAxisUnits	CS	1
(0014,222A)	Coordinate System Transform Rotation and Scale Matrix	CoordinateSystemTransformRotationAndScaleMatrix	DS	1-n
(0014,222C)	Coordinate System Transform Translation Matrix	CoordinateSystemTransformTranslationMatrix	DS	1-n
(0014,3011)	Internal Detector Frame Time	InternalDetectorFrameTime	DS	1
(0014,3012)	Number of Frames Integrated	NumberOfFramesIntegrated	DS	1
(0014,3020)	Detector Temperature Sequence	DetectorTemperatureSequence	SQ	1
(0014,3022)	Sensor Name	SensorName	DS	1
(0014,3024)	Horizontal Offset of Sensor	HorizontalOffsetOfSensor	DS	1
(0014,3026)	Vertical Offset of Sensor	VerticalOffsetOfSensor	DS	1
(0014,3028)	Sensor Temperature	SensorTemperature	DS	1
(0014,3040)	Dark Current Sequence	DarkCurrentSequence	SQ	1
(0014,3050)	Dark Current Counts	DarkCurrentCounts	OB or OW	1
(0014,3060)	Gain Correction Reference Sequence	GainCorrectionReferenceSequence	SQ	1
(0014,3070)	Air Counts	AirCounts	OB or OW	1
(0014,3071)	KV Used in Gain Calibration	KVUsedInGainCalibration	DS	1
(0014,3072)	MA Used in Gain Calibration	MAUsedInGainCalibration	DS	1
(0014,3073)	Number of Frames Used for Integration	NumberOfFramesUsedForIntegration	DS	1
(0014,3074)	Filter Material Used in Gain Calibration	FilterMaterialUsedInGainCalibration	LO	1
(0014,3075)	Filter Thickness Used in Gain Calibration	FilterThicknessUsedInGainCalibration	DS	1
(0014,3076)	Date of Gain Calibration	DateOfGainCalibration	DA	1
(0014,3077)	Time of Gain Calibration	TimeOfGainCalibration	TM	1
(0014,3080)	Bad Pixel Image	BadPixelImage	OB	1
(0014,3099)	Calibration Notes	CalibrationNotes	LT	1
(0014,4002)	Pulser Equipment Sequence	PulserEquipmentSequence	SQ	1
(0014,4004)	Pulser Type	PulserType	CS	1
(0014,4006)	Pulser Notes	PulserNotes	LT	1
(0014,4008)	Receiver Equipment Sequence	ReceiverEquipmentSequence	SQ	1
(0014,400A)	Amplifier Type	AmplifierType	CS	1
(0014,400C)	Receiver Notes	ReceiverNotes	LT	1
(0014,400E)	Pre-Amplifier Equipment Sequence	PreAmplifierEquipmentSequence	SQ	1
(0014,400F)	Pre-Amplifier Notes	PreAmplifierNotes	LT	1
(0014,4010)	Transmit Transducer Sequence	TransmitTransducerSequence	SQ	1
(0014,4011)	Receive Transducer Sequence	ReceiveTransducerSequence	SQ	1
(0014,4012)	Number of Elements	NumberOfElements	US	1
(0014,4013)	Element Shape	ElementShape	CS	1
(0014,4014)	Element Dimension A	ElementDimensionA	DS	1
(0014,4015)	Element Dimension B	ElementDimensionB	DS	1
(0014,4016)	Element Pitch	ElementPitch	DS	1
(0014,4017)	Measured Beam Dimension A	MeasuredBeamDimensionA	DS	1
(0014,4018)	Measured Beam Dimension B	MeasuredBeamDimensionB	DS	1
(0014,4019)	Location of Measured Beam Diameter	LocationOfMeasuredBeamDiameter	DS	1
(0014,401A)	Nominal Frequency	NominalFrequency	DS	1
(0014,401B)	Measured Center Frequency	MeasuredCenterFrequency	DS	1
(0014,401C)	Measured Bandwidth	MeasuredBandwidth	DS	1
(0014,4020)	Pulser Settings Sequence	PulserSettingsSequence	SQ	1
(0014,4022)	Pulse Width	PulseWidth	DS	1
(0014,4024)	Excitation Frequency	ExcitationFrequency	DS	1
(0014,4026)	Modulation Type	ModulationType	CS	1
(0014,4028)	Damping	Damping	DS	1
(0014,4030)	Receiver Settings Sequence	ReceiverSettingsSequence	SQ	1
(0014,4031)	Acquired Soundpath Length	AcquiredSoundpathLength	DS	1
(0014,4032)	Acquisition Compression Type	AcquisitionCompressionType	CS	1
(0014,4033)	Acquisition Sample Size	AcquisitionSampleSize	IS	1
(0014,4034)	Rectifier Smoothing	RectifierSmoothing	DS	1
(0014,4035)	DAC Sequence	DACSequence	SQ	1
(0014,4036)	DAC Type	DACType	CS	1
(0014,4038)	DAC Gain Points	DACGainPoints	DS	1-n
(0014,403A)	DAC Time Points	DACTimePoints	DS	1-n
(0014,403C)	DAC Amplitude	DACAmplitude	DS	1-n
(0014,4040)	Pre-Amplifier Settings Sequence	PreAmplifierSettingsSequence	SQ	1
(0014,4050)	Transmit Transducer Settings Sequence	TransmitTransducerSettingsSequence	SQ	1
(0014,4051)	Receive Transducer Settings Sequence	ReceiveTransducerSettingsSequence	SQ	1
(0014,4052)	Incident Angle	IncidentAngle	DS	1
(0014,4054)	Coupling Technique	CouplingTechnique	ST	1
(0014,4056)	Coupling Medium	CouplingMedium	ST	1
(0014,4057)	Coupling Velocity	CouplingVelocity	DS	1
(0014,4058)	Crystal Center Location X	CrystalCenterLocationX	DS	1
(0014,4059)	Crystal Center Location Z	CrystalCenterLocationZ	DS	1
(0014,405A)	Sound Path Length	SoundPathLength	DS	1
(0014,405C)	Delay Law Identifier	DelayLawIdentifier	ST	1
(0014,4060)	Gate Settings Sequence	GateSettingsSequence	SQ	1
(0014,4062)	Gate Threshold	GateThreshold	DS	1
(0014,4064)	Velocity of Sound	VelocityOfSound	DS	1
(0014,4070)	Calibration Settings Sequence	CalibrationSettingsSequence	SQ	1
(0014,4072)	Calibration Procedure	CalibrationProcedure	ST	1
(0014,4074)	Procedure Version	ProcedureVersion	SH	1
(0014,4076)	Procedure Creation Date	ProcedureCreationDate	DA	1
(0014,4078)	Procedure Expiration Date	ProcedureExpirationDate	DA	1
(0014,407A)	Procedure Last Modified Date	ProcedureLastModifiedDate	DA	1
(0014,407C)	Calibration Time	CalibrationTime	TM	1-n
(0014,407E)	Calibration Date	CalibrationDate	DA	1-n
(0014,5002)	LINAC Energy	LINACEnergy	IS	1
(0014,5004)	LINAC Output	LINACOutput	IS	1
(0018,0010)	Contrast/Bolus Agent	ContrastBolusAgent	LO	1
(0018,0012)	Contrast/Bolus Agent Sequence	ContrastBolusAgentSequence	SQ	1
(0018,0014)	Contrast/Bolus Administration Route Sequence	ContrastBolusAdministrationRouteSequence	SQ	1
(0018,0015)	Body Part Examined	BodyPartExamined	CS	1
(0018,0020)	Scanning Sequence	ScanningSequence	CS	1-n
(0018,0021)	Sequence Variant	SequenceVariant	CS	1-n
(0018,0022)	Scan Options	ScanOptions	CS	1-n
(0018,0023)	MR Acquisition Type	MRAcquisitionType	CS	1
(0018,0024)	Sequence Name	SequenceName	SH	1
(0018,0025)	Angio Flag	AngioFlag	CS	1
(0018,0026)	Intervention Drug Information Sequence	InterventionDrugInformationSequence	SQ	1
(0018,0027)	Intervention Drug Stop Time	InterventionDrugStopTime	TM	1
(0018,0028)	Intervention Drug Dose	InterventionDrugDose	DS	1
(0018,0029)	Intervention Drug Code Sequence	InterventionDrugCodeSequence	SQ	1
(0018,002A)	Additional Drug Sequence	AdditionalDrugSequence	SQ	1
(0018,0030)	Radionuclide	Radionuclide	LO	1-n	RET
(0018,0031)	Radiopharmaceutical	Radiopharmaceutical	LO	1
(0018,0032)	Energy Window Centerline	EnergyWindowCenterline	DS	1	RET
(0018,0033)	Energy Window Total Width	EnergyWindowTotalWidth	DS	1-n	RET
(0018,0034)	Intervention Drug Name	InterventionDrugName	LO	1
(0018,0035)	Intervention Drug Start Time	InterventionDrugStartTime	TM	1
(0018,0036)	Intervention Sequence	InterventionSequence	SQ	1
(0018,0037)	Therapy Type	TherapyType	CS	1	RET
(0018,0038)	Intervention Status	InterventionStatus	CS	1
(0018,0039)	Therapy Description	TherapyDescription	CS	1	RET
(0018,003A)	Intervention Description	InterventionDescription	ST	1
(0018,0040)	Cine Rate	CineRate	IS	1
(0018,0042)	Initial Cine Run State	InitialCineRunState	CS	1
(0018,0050)	Slice Thickness	SliceThickness	DS	1
(0018,0060)	KVP	KVP	DS	1
(0018,0070)	Counts Accumulated	CountsAccumulated	IS	1
(0018,0071)	Acquisition Termination Condition	AcquisitionTerminationCondition	CS	1
(0018,0072)	Effective Duration	EffectiveDuration	DS	1
(0018,0073)	Acquisition Start Condition	AcquisitionStartCondition	CS	1
(0018,0074)	Acquisition Start Condition Data	AcquisitionStartConditionData	IS	1
(0018,0075)	Acquisition Termination Condition Data	AcquisitionTerminationConditionData	IS	1
(0018,0080)	Repetition Time	RepetitionTime	DS	1
(0018,0081)	Echo Time	EchoTime	DS	1
(0018,0082)	Inversion Time	InversionTime	DS	1
(0018,0083)	Number of Averages	NumberOfAverages	DS	1
(0018,0084)	Imaging Frequency	ImagingFrequency	DS	1
(0018,0085)	Imaged Nucleus	ImagedNucleus	SH	1
(0018,0086)	Echo Number(s)	EchoNumbers	IS	1-n
(0018,0087)	Magnetic Field Strength	MagneticFieldStrength	DS	1
(0018,0088)	Spacing Between Slices	SpacingBetweenSlices	DS	1
(0018,0089)	Number of Phase Encoding Steps	NumberOfPhaseEncodingSteps	IS	1
(0018,0090)	Data Collection Diameter	DataCollectionDiameter	DS	1
(0018,0091)	Echo Train Length	EchoTrainLength	IS	1
(0018,0093)	Percent Sampling	PercentSampling	DS	1
(0018,0094)	Percent Phase Field of View	PercentPhaseFieldOfView	DS	1
(0018,0095)	Pixel Bandwidth	PixelBandwidth	DS	1
(0018,1000)	Device Serial Number	DeviceSerialNumber	LO	1
(0018,1002)	Device UID	DeviceUID	UI	1
(0018,1003)	Device ID	DeviceID	LO	1
(0018,1004)	Plate ID	PlateID	LO	1
(0018,1005)	Generator ID	GeneratorID	LO	1
(0018,1006)	Grid ID	GridID	LO	1
(0018,1007)	Cassette ID	CassetteID	LO	1
(0018,1008)	Gantry ID	GantryID	LO	1
(0018,1010)	Secondary Capture Device ID	SecondaryCaptureDeviceID	LO	1
(0018,1011)	Hardcopy Creation Device ID	HardcopyCreationDeviceID	LO	1	RET
(0018,1012)	Date of Secondary Capture	DateOfSecondaryCapture	DA	1
(0018,1014)	Time of Secondary Capture	TimeOfSecondaryCapture	TM	1
(0018,1016)	Secondary Capture Device Manufacturer	SecondaryCaptureDeviceManufacturer	LO	1
(0018,1017)	Hardcopy Device Manufacturer	HardcopyDeviceManufacturer	LO	1	RET
(0018,1018)	Secondary Capture Device Manufacturer’s Model Name	SecondaryCaptureDeviceManufacturerModelName	LO	1
(0018,1019)	Secondary Capture Device Software Versions	SecondaryCaptureDeviceSoftwareVersions	LO	1-n
(0018,101A)	Hardcopy Device Software Version	HardcopyDeviceSoftwareVersion	LO	1-n	RET
(0018,101B)	Hardcopy Device Manufacturer’s Model Name	HardcopyDeviceManufacturerModelName	LO	1	RET
(0018,1020)	Software Version(s)	SoftwareVersions	LO	1-n
(0018,1022)	Video Image Format Acquired	VideoImageFormatAcquired	SH	1
(0018,1023)	Digital Image Format Acquired	DigitalImageFormatAcquired	LO	1
(0018,1030)	Protocol Name	ProtocolName	LO	1
(0018,1040)	Contrast/Bolus Route	ContrastBolusRoute	LO	1
(0018,1041)	Contrast/Bolus Volume	ContrastBolusVolume	DS	1
(0018,1042)	Contrast/Bolus Start Time	ContrastBolusStartTime	TM	1
(0018,1043)	Contrast/Bolus Stop Time	ContrastBolusStopTime	TM	1
(0018,1044)	Contrast/Bolus Total Dose	ContrastBolusTotalDose	DS	1
(0018,1045)	Syringe Counts	SyringeCounts	IS	1
(0018,1046)	Contrast Flow Rate	ContrastFlowRate	DS	1-n
(0018,1047)	Contrast Flow Duration	ContrastFlowDuration	DS	1-n
(0018,1048)	Contrast/Bolus Ingredient	ContrastBolusIngredient	CS	1
(0018,1049)	Contrast/Bolus Ingredient Concentration	ContrastBolusIngredientConcentration	DS	1
(0018,1050)	Spatial Resolution	SpatialResolution	DS	1
(0018,1060)	Trigger Time	TriggerTime	DS	1
(0018,1061)	Trigger Source or Type	TriggerSourceOrType	LO	1
(0018,1062)	Nominal Interval	NominalInterval	IS	1
(0018,1063)	Frame Time	FrameTime	DS	1
(0018,1064)	Cardiac Framing Type	CardiacFramingType	LO	1
(0018,1065)	Frame Time Vector	FrameTimeVector	DS	1-n
(0018,1066)	Frame Delay	FrameDelay	DS	1
(0018,1067)	Image Trigger Delay	ImageTriggerDelay	DS	1
(0018,1068)	Multiplex Group Time Offset	MultiplexGroupTimeOffset	DS	1
(0018,1069)	Trigger Time Offset	TriggerTimeOffset	DS	1
(0018,106A)	Synchronization Trigger	SynchronizationTrigger	CS	1
(0018,106C)	Synchronization Channel	SynchronizationChannel	US	2
(0018,106E)	Trigger Sample Position	TriggerSamplePosition	UL	1
(0018,1070)	Radiopharmaceutical Route	RadiopharmaceuticalRoute	LO	1
(0018,1071)	Radiopharmaceutical Volume	RadiopharmaceuticalVolume	DS	1
(0018,1072)	Radiopharmaceutical Start Time	RadiopharmaceuticalStartTime	TM	1
(0018,1073)	Radiopharmaceutical Stop Time	RadiopharmaceuticalStopTime	TM	1
(0018,1074)	Radionuclide Total Dose	RadionuclideTotalDose	DS	1
(0018,1075)	Radionuclide Half Life	RadionuclideHalfLife	DS	1
(0018,1076)	Radionuclide Positron Fraction	RadionuclidePositronFraction	DS	1
(0018,1077)	Radiopharmaceutical Specific Activity	RadiopharmaceuticalSpecificActivity	DS	1
(0018,1078)	Radiopharmaceutical Start DateTime	RadiopharmaceuticalStartDateTime	DT	1
(0018,1079)	Radiopharmaceutical Stop DateTime	RadiopharmaceuticalStopDateTime	DT	1
(0018,1080)	Beat Rejection Flag	BeatRejectionFlag	CS	1
(0018,1081)	Low R-R Value	LowRRValue	IS	1
(0018,1082)	High R-R Value	HighRRValue	IS	1
(0018,1083)	Intervals Acquired	IntervalsAcquired	IS	1
(0018,1084)	Intervals Rejected	IntervalsRejected	IS	1
(0018,1085)	PVC Rejection	PVCRejection	LO	1
(0018,1086)	Skip Beats	SkipBeats	IS	1
(0018,1088)	Heart Rate	HeartRate	IS	1
(0018,1090)	Cardiac Number of Images	CardiacNumberOfImages	IS	1
(0018,1094)	Trigger Window	TriggerWindow	IS	1
(0018,1100)	Reconstruction Diameter	ReconstructionDiameter	DS	1
(0018,1110)	Distance Source to Detector	DistanceSourceToDetector	DS	1
(0018,1111)	Distance Source to Patient	DistanceSourceToPatient	DS	1
(0018,1114)	Estimated Radiographic Magnification Factor	EstimatedRadiographicMagnificationFactor	DS	1
(0018,1120)	Gantry/Detector Tilt	GantryDetectorTilt	DS	1
(0018,1121)	Gantry/Detector Slew	GantryDetectorSlew	DS	1
(0018,1130)	Table Height	TableHeight	DS	1
(0018,1131)	Table Traverse	TableTraverse	DS	1
(0018,1134)	Table Motion	TableMotion	CS	1
(0018,1135)	Table Vertical Increment	TableVerticalIncrement	DS	1-n
(0018,1136)	Table Lateral Increment	TableLateralIncrement	DS	1-n
(0018,1137)	Table Longitudinal Increment	TableLongitudinalIncrement	DS	1-n
(0018,1138)	Table Angle	TableAngle	DS	1
(0018,113A)	Table Type	TableType	CS	1
(0018,1140)	Rotation Direction	RotationDirection	CS	1
(0018,1141)	Angular Position	AngularPosition	DS	1	RET
(0018,1142)	Radial Position	RadialPosition	DS	1-n
(0018,1143)	Scan Arc	ScanArc	DS	1
(0018,1144)	Angular Step	AngularStep	DS	1
(0018,1145)	Center of Rotation Offset	CenterOfRotationOffset	DS	1
(0018,1146)	Rotation Offset	RotationOffset	DS	1-n	RET
(0018,1147)	Field of View Shape	FieldOfViewShape	CS	1
(0018,1149)	Field of View Dimension(s)	FieldOfViewDimensions	IS	1-2
(0018,1150)	Exposure Time	ExposureTime	IS	1
(0018,1151)	X-Ray Tube Current	XRayTubeCurrent	IS	1
(0018,1152)	Exposure	Exposure	IS	1
(0018,1153)	Exposure in µAs	ExposureInuAs	IS	1
(0018,1154)	Average Pulse Width	AveragePulseWidth	DS	1
(0018,1155)	Radiation Setting	RadiationSetting	CS	1
(0018,1156)	Rectification Type	RectificationType	CS	1
(0018,115A)	Radiation Mode	RadiationMode	CS	1
(0018,115E)	Image and Fluoroscopy Area Dose Product	ImageAndFluoroscopyAreaDoseProduct	DS	1
(0018,1160)	Filter Type	FilterType	SH	1
(0018,1161)	Type of Filters	TypeOfFilters	LO	1-n
(0018,1162)	Intensifier Size	IntensifierSize	DS	1
(0018,1164)	Imager Pixel Spacing	ImagerPixelSpacing	DS	2
(0018,1166)	Grid	Grid	CS	1-n
(0018,1170)	Generator Power	GeneratorPower	IS	1
(0018,1180)	Collimator/grid Name	CollimatorGridName	SH	1
(0018,1181)	Collimator Type	CollimatorType	CS	1
(0018,1182)	Focal Distance	FocalDistance	IS	1-2
(0018,1183)	X Focus Center	XFocusCenter	DS	1-2
(0018,1184)	Y Focus Center	YFocusCenter	DS	1-2
(0018,1190)	Focal Spot(s)	FocalSpots	DS	1-n
(0018,1191)	Anode Target Material	AnodeTargetMaterial	CS	1
(0018,11A0)	Body Part Thickness	BodyPartThickness	DS	1
(0018,11A2)	Compression Force	CompressionForce	DS	1
(0018,1200)	Date of Last Calibration	DateOfLastCalibration	DA	1-n
(0018,1201)	Time of Last Calibration	TimeOfLastCalibration	TM	1-n
(0018,1210)	Convolution Kernel	ConvolutionKernel	SH	1-n
(0018,1240)	Upper/Lower Pixel Values	UpperLowerPixelValues	IS	1-n	RET
(0018,1242)	Actual Frame Duration	ActualFrameDuration	IS	1
(0018,1243)	Count Rate	CountRate	IS	1
(0018,1244)	Preferred Playback Sequencing	PreferredPlaybackSequencing	US	1
(0018,1250)	Receive Coil Name	ReceiveCoilName	SH	1
(0018,1251)	Transmit Coil Name	TransmitCoilName	SH	1
(0018,1260)	Plate Type	PlateType	SH	1
(0018,1261)	Phosphor Type	PhosphorType	LO	1
(0018,1300)	Scan Velocity	ScanVelocity	DS	1
(0018,1301)	Whole Body Technique	WholeBodyTechnique	CS	1-n
(0018,1302)	Scan Length	ScanLength	IS	1
(0018,1310)	Acquisition Matrix	AcquisitionMatrix	US	4
(0018,1312)	In-plane Phase Encoding Direction	InPlanePhaseEncodingDirection	CS	1
(0018,1314)	Flip Angle	FlipAngle	DS	1
(0018,1315)	Variable Flip Angle Flag	VariableFlipAngleFlag	CS	1
(0018,1316)	SAR	SAR	DS	1
(0018,1318)	dB/dt	dBdt	DS	1
(0018,1400)	Acquisition Device Processing Description	AcquisitionDeviceProcessingDescription	LO	1
(0018,1401)	Acquisition Device Processing Code	AcquisitionDeviceProcessingCode	LO	1
(0018,1402)	Cassette Orientation	CassetteOrientation	CS	1
(0018,1403)	Cassette Size	CassetteSize	CS	1
(0018,1404)	Exposures on Plate	ExposuresOnPlate	US	1
(0018,1405)	Relative X-Ray Exposure	RelativeXRayExposure	IS	1
(0018,1411)	Exposure Index	ExposureIndex	DS	1
(0018,1412)	Target Exposure Index	TargetExposureIndex	DS	1
(0018,1413)	Deviation Index	DeviationIndex	DS	1
(0018,1450)	Column Angulation	ColumnAngulation	DS	1
(0018,1460)	Tomo Layer Height	TomoLayerHeight	DS	1
(0018,1470)	Tomo Angle	TomoAngle	DS	1
(0018,1480)	Tomo Time	TomoTime	DS	1
(0018,1490)	Tomo Type	TomoType	CS	1
(0018,1491)	Tomo Class	TomoClass	CS	1
(0018,1495)	Number of Tomosynthesis Source Images	NumberOfTomosynthesisSourceImages	IS	1
(0018,1500)	Positioner Motion	PositionerMotion	CS	1
(0018,1508)	Positioner Type	PositionerType	CS	1
(0018,1510)	Positioner Primary Angle	PositionerPrimaryAngle	DS	1
(0018,1511)	Positioner Secondary Angle	PositionerSecondaryAngle	DS	1
(0018,1520)	Positioner Primary Angle Increment	PositionerPrimaryAngleIncrement	DS	1-n
(0018,1521)	Positioner Secondary Angle Increment	PositionerSecondaryAngleIncrement	DS	1-n
(0018,1530)	Detector Primary Angle	DetectorPrimaryAngle	DS	1
(0018,1531)	Detector Secondary Angle	DetectorSecondaryAngle	DS	1
(0018,1600)	Shutter Shape	ShutterShape	CS	1-3
(0018,1602)	Shutter Left Vertical Edge	ShutterLeftVerticalEdge	IS	1
(0018,1604)	Shutter Right Vertical Edge	ShutterRightVerticalEdge	IS	1
(0018,1606)	Shutter Upper Horizontal Edge	ShutterUpperHorizontalEdge	IS	1
(0018,1608)	Shutter Lower Horizontal Edge	ShutterLowerHorizontalEdge	IS	1
(0018,1610)	Center of Circular Shutter	CenterOfCircularShutter	IS	2
(0018,1612)	Radius of Circular Shutter	RadiusOfCircularShutter	IS	1
(0018,1620)	Vertices of the Polygonal Shutter	VerticesOfThePolygonalShutter	IS	2-2n
(0018,1622)	Shutter Presentation Value	ShutterPresentationValue	US	1
(0018,1623)	Shutter Overlay Group	ShutterOverlayGroup	US	1
(0018,1624)	Shutter Presentation Color CIELab Value	ShutterPresentationColorCIELabValue	US	3
(0018,1700)	Collimator Shape	CollimatorShape	CS	1-3
(0018,1702)	Collimator Left Vertical Edge	CollimatorLeftVerticalEdge	IS	1
(0018,1704)	Collimator Right Vertical Edge	CollimatorRightVerticalEdge	IS	1
(0018,1706)	Collimator Upper Horizontal Edge	CollimatorUpperHorizontalEdge	IS	1
(0018,1708)	Collimator Lower Horizontal Edge	CollimatorLowerHorizontalEdge	IS	1
(0018,1710)	Center of Circular Collimator	CenterOfCircularCollimator	IS	2
(0018,1712)	Radius of Circular Collimator	RadiusOfCircularCollimator	IS	1
(0018,1720)	Vertices of the Polygonal Collimator	VerticesOfThePolygonalCollimator	IS	2-2n
(0018,1800)	Acquisition Time Synchronized	AcquisitionTimeSynchronized	CS	1
(0018,1801)	Time Source	TimeSource	SH	1
(0018,1802)	Time Distribution Protocol	TimeDistributionProtocol	CS	1
(0018,1803)	NTP Source Address	NTPSourceAddress	LO	1
(0018,2001)	Page Number Vector	PageNumberVector	IS	1-n
(0018,2002)	Frame Label Vector	FrameLabelVector	SH	1-n
(0018,2003)	Frame Primary Angle Vector	FramePrimaryAngleVector	DS	1-n
(0018,2004)	Frame Secondary Angle Vector	FrameSecondaryAngleVector	DS	1-n
(0018,2005)	Slice Location Vector	SliceLocationVector	DS	1-n
(0018,2006)	Display Window Label Vector	DisplayWindowLabelVector	SH	1-n
(0018,2010)	Nominal Scanned Pixel Spacing	NominalScannedPixelSpacing	DS	2
(0018,2020)	Digitizing Device Transport Direction	DigitizingDeviceTransportDirection	CS	1
(0018,2030)	Rotation of Scanned Film	RotationOfScannedFilm	DS	1
(0018,3100)	IVUS Acquisition	IVUSAcquisition	CS	1
(0018,3101)	IVUS Pullback Rate	IVUSPullbackRate	DS	1
(0018,3102)	IVUS Gated Rate	IVUSGatedRate	DS	1
(0018,3103)	IVUS Pullback Start Frame Number	IVUSPullbackStartFrameNumber	IS	1
(0018,3104)	IVUS Pullback Stop Frame Number	IVUSPullbackStopFrameNumber	IS	1
(0018,3105)	Lesion Number	LesionNumber	IS	1-n
(0018,4000)	Acquisition Comments	AcquisitionComments	LT	1	RET
(0018,5000)	Output Power	OutputPower	SH	1-n
(0018,5010)	Transducer Data	TransducerData	LO	1-n
(0018,5012)	Focus Depth	FocusDepth	DS	1
(0018,5020)	Processing Function	ProcessingFunction	LO	1
(0018,5021)	Postprocessing Function	PostprocessingFunction	LO	1	RET
(0018,5022)	Mechanical Index	MechanicalIndex	DS	1
(0018,5024)	Bone Thermal Index	BoneThermalIndex	DS	1
(0018,5026)	Cranial Thermal Index	CranialThermalIndex	DS	1
(0018,5027)	Soft Tissue Thermal Index	SoftTissueThermalIndex	DS	1
(0018,5028)	Soft Tissue-focus Thermal Index	SoftTissueFocusThermalIndex	DS	1
(0018,5029)	Soft Tissue-surface Thermal Index	SoftTissueSurfaceThermalIndex	DS	1
(0018,5030)	Dynamic Range	DynamicRange	DS	1	RET
(0018,5040)	Total Gain	TotalGain	DS	1	RET
(0018,5050)	Depth of Scan Field	DepthOfScanField	IS	1
(0018,5100)	Patient Position	PatientPosition	CS	1
(0018,5101)	View Position	ViewPosition	CS	1
(0018,5104)	Projection Eponymous Name Code Sequence	ProjectionEponymousNameCodeSequence	SQ	1
(0018,5210)	Image Transformation Matrix	ImageTransformationMatrix	DS	6	RET
(0018,5212)	Image Translation Vector	ImageTranslationVector	DS	3	RET
(0018,6000)	Sensitivity	Sensitivity	DS	1
(0018,6011)	Sequence of Ultrasound Regions	SequenceOfUltrasoundRegions	SQ	1
(0018,6012)	Region Spatial Format	RegionSpatialFormat	US	1
(0018,6014)	Region Data Type	RegionDataType	US	1
(0018,6016)	Region Flags	RegionFlags	UL	1
(0018,6018)	Region Location Min X0	RegionLocationMinX0	UL	1
(0018,601A)	Region Location Min Y0	RegionLocationMinY0	UL	1
(0018,601C)	Region Location Max X1	RegionLocationMaxX1	UL	1
(0018,601E)	Region Location Max Y1	RegionLocationMaxY1	UL	1
(0018,6020)	Reference Pixel X0	ReferencePixelX0	SL	1
(0018,6022)	Reference Pixel Y0	ReferencePixelY0	SL	1
(0018,6024)	Physical Units X Direction	PhysicalUnitsXDirection	US	1
(0018,6026)	Physical Units Y Direction	PhysicalUnitsYDirection	US	1
(0018,6028)	Reference Pixel Physical Value X	ReferencePixelPhysicalValueX	FD	1
(0018,602A)	Reference Pixel Physical Value Y	ReferencePixelPhysicalValueY	FD	1
(0018,602C)	Physical Delta X	PhysicalDeltaX	FD	1
(0018,602E)	Physical Delta Y	PhysicalDeltaY	FD	1
(0018,6030)	Transducer Frequency	TransducerFrequency	UL	1
(0018,6031)	Transducer Type	TransducerType	CS	1
(0018,6032)	Pulse Repetition Frequency	PulseRepetitionFrequency	UL	1
(0018,6034)	Doppler Correction Angle	DopplerCorrectionAngle	FD	1
(0018,6036)	Steering Angle	SteeringAngle	FD	1
(0018,6038)	Doppler Sample Volume X Position (Retired)	DopplerSampleVolumeXPositionRetired	UL	1	RET
(0018,6039)	Doppler Sample Volume X Position	DopplerSampleVolumeXPosition	SL	1
(0018,603A)	Doppler Sample Volume Y Position (Retired)	DopplerSampleVolumeYPositionRetired	UL	1	RET
(0018,603B)	Doppler Sample Volume Y Position	DopplerSampleVolumeYPosition	SL	1
(0018,603C)	TM-Line Position X0 (Retired)	TMLinePositionX0Retired	UL	1	RET
(0018,603D)	TM-Line Position X0	TMLinePositionX0	SL	1
(0018,603E)	TM-Line Position Y0 (Retired)	TMLinePositionY0Retired	UL	1	RET
(0018,603F)	TM-Line Position Y0	TMLinePositionY0	SL	1
(0018,6040)	TM-Line Position X1 (Retired)	TMLinePositionX1Retired	UL	1	RET
(0018,6041)	TM-Line Position X1	TMLinePositionX1	SL	1
(0018,6042)	TM-Line Position Y1 (Retired)	TMLinePositionY1Retired	UL	1	RET
(0018,6043)	TM-Line Position Y1	TMLinePositionY1	SL	1
(0018,6044)	Pixel Component Organization	PixelComponentOrganization	US	1
(0018,6046)	Pixel Component Mask	PixelComponentMask	UL	1
(0018,6048)	Pixel Component Range Start	PixelComponentRangeStart	UL	1
(0018,604A)	Pixel Component Range Stop	PixelComponentRangeStop	UL	1
(0018,604C)	Pixel Component Physical Units	PixelComponentPhysicalUnits	US	1
(0018,604E)	Pixel Component Data Type	PixelComponentDataType	US	1
(0018,6050)	Number of Table Break Points	NumberOfTableBreakPoints	UL	1
(0018,6052)	Table of X Break Points	TableOfXBreakPoints	UL	1-n
(0018,6054)	Table of Y Break Points	TableOfYBreakPoints	FD	1-n
(0018,6056)	Number of Table Entries	NumberOfTableEntries	UL	1
(0018,6058)	Table of Pixel Values	TableOfPixelValues	UL	1-n
(0018,605A)	Table of Parameter Values	TableOfParameterValues	FL	1-n
(0018,6060)	R Wave Time Vector	RWaveTimeVector	FL	1-n
(0018,7000)	Detector Conditions Nominal Flag	DetectorConditionsNominalFlag	CS	1
(0018,7001)	Detector Temperature	DetectorTemperature	DS	1
(0018,7004)	Detector Type	DetectorType	CS	1
(0018,7005)	Detector Configuration	DetectorConfiguration	CS	1
(0018,7006)	Detector Description	DetectorDescription	LT	1
(0018,7008)	Detector Mode	DetectorMode	LT	1
(0018,700A)	Detector ID	DetectorID	SH	1
(0018,700C)	Date of Last Detector Calibration	DateOfLastDetectorCalibration	DA	1
(0018,700E)	Time of Last Detector Calibration	TimeOfLastDetectorCalibration	TM	1
(0018,7010)	Exposures on Detector Since Last Calibration	ExposuresOnDetectorSinceLastCalibration	IS	1
(0018,7011)	Exposures on Detector Since Manufactured	ExposuresOnDetectorSinceManufactured	IS	1
(0018,7012)	Detector Time Since Last Exposure	DetectorTimeSinceLastExposure	DS	1
(0018,7014)	Detector Active Time	DetectorActiveTime	DS	1
(0018,7016)	Detector Activation Offset From Exposure	DetectorActivationOffsetFromExposure	DS	1
(0018,701A)	Detector Binning	DetectorBinning	DS	2
(0018,7020)	Detector Element Physical Size	DetectorElementPhysicalSize	DS	2
(0018,7022)	Detector Element Spacing	DetectorElementSpacing	DS	2
(0018,7024)	Detector Active Shape	DetectorActiveShape	CS	1
(0018,7026)	Detector Active Dimension(s)	DetectorActiveDimensions	DS	1-2
(0018,7028)	Detector Active Origin	DetectorActiveOrigin	DS	2
(0018,702A)	Detector Manufacturer Name	DetectorManufacturerName	LO	1
(0018,702B)	Detector Manufacturer’s Model Name	DetectorManufacturerModelName	LO	1
(0018,7030)	Field of View Origin	FieldOfViewOrigin	DS	2
(0018,7032)	Field of View Rotation	FieldOfViewRotation	DS	1
(0018,7034)	Field of View Horizontal Flip	FieldOfViewHorizontalFlip	CS	1
(0018,7036)	Pixel Data Area Origin Relative To FOV	PixelDataAreaOriginRelativeToFOV	FL	2
(0018,7038)	Pixel Data Area Rotation Angle Relative To FOV	PixelDataAreaRotationAngleRelativeToFOV	FL	1
(0018,7040)	Grid Absorbing Material	GridAbsorbingMaterial	LT	1
(0018,7041)	Grid Spacing Material	GridSpacingMaterial	LT	1
(0018,7042)	Grid Thickness	GridThickness	DS	1
(0018,7044)	Grid Pitch	GridPitch	DS	1
(0018,7046)	Grid Aspect Ratio	GridAspectRatio	IS	2
(0018,7048)	Grid Period	GridPeriod	DS	1
(0018,704C)	Grid Focal Distance	GridFocalDistance	DS	1
(0018,7050)	Filter Material	FilterMaterial	CS	1-n
(0018,7052)	Filter Thickness Minimum	FilterThicknessMinimum	DS	1-n
(0018,7054)	Filter Thickness Maximum	FilterThicknessMaximum	DS	1-n
(0018,7056)	Filter Beam Path Length Minimum	FilterBeamPathLengthMinimum	FL	1-n
(0018,7058)	Filter Beam Path Length Maximum	FilterBeamPathLengthMaximum	FL	1-n
(0018,7060)	Exposure Control Mode	ExposureControlMode	CS	1
(0018,7062)	Exposure Control Mode Description	ExposureControlModeDescription	LT	1
(0018,7064)	Exposure Status	ExposureStatus	CS	1
(0018,7065)	Phototimer Setting	PhototimerSetting	DS	1
(0018,8150)	Exposure Time in µS	ExposureTimeInuS	DS	1
(0018,8151)	X-Ray Tube Current in µA	XRayTubeCurrentInuA	DS	1
(0018,9004)	Content Qualification	ContentQualification	CS	1
(0018,9005)	Pulse Sequence Name	PulseSequenceName	SH	1
(0018,9006)	MR Imaging Modifier Sequence	MRImagingModifierSequence	SQ	1
(0018,9008)	Echo Pulse Sequence	EchoPulseSequence	CS	1
(0018,9009)	Inversion Recovery	InversionRecovery	CS	1
(0018,9010)	Flow Compensation	FlowCompensation	CS	1
(0018,9011)	Multiple Spin Echo	MultipleSpinEcho	CS	1
(0018,9012)	Multi-planar Excitation	MultiPlanarExcitation	CS	1
(0018,9014)	Phase Contrast	PhaseContrast	CS	1
(0018,9015)	Time of Flight Contrast	TimeOfFlightContrast	CS	1
(0018,9016)	Spoiling	Spoiling	CS	1
(0018,9017)	Steady State Pulse Sequence	SteadyStatePulseSequence	CS	1
(0018,9018)	Echo Planar Pulse Sequence	EchoPlanarPulseSequence	CS	1
(0018,9019)	Tag Angle First Axis	TagAngleFirstAxis	FD	1
(0018,9020)	Magnetization Transfer	MagnetizationTransfer	CS	1
(0018,9021)	T2 Preparation	T2Preparation	CS	1
(0018,9022)	Blood Signal Nulling	BloodSignalNulling	CS	1
(0018,9024)	Saturation Recovery	SaturationRecovery	CS	1
(0018,9025)	Spectrally Selected Suppression	SpectrallySelectedSuppression	CS	1
(0018,9026)	Spectrally Selected Excitation	SpectrallySelectedExcitation	CS	1
(0018,9027)	Spatial Pre-saturation	SpatialPresaturation	CS	1
(0018,9028)	Tagging	Tagging	CS	1
(0018,9029)	Oversampling Phase	OversamplingPhase	CS	1
(0018,9030)	Tag Spacing First Dimension	TagSpacingFirstDimension	FD	1
(0018,9032)	Geometry of k-Space Traversal	GeometryOfKSpaceTraversal	CS	1
(0018,9033)	Segmented k-Space Traversal	SegmentedKSpaceTraversal	CS	1
(0018,9034)	Rectilinear Phase Encode Reordering	RectilinearPhaseEncodeReordering	CS	1
(0018,9035)	Tag Thickness	TagThickness	FD	1
(0018,9036)	Partial Fourier Direction	PartialFourierDirection	CS	1
(0018,9037)	Cardiac Synchronization Technique	CardiacSynchronizationTechnique	CS	1
(0018,9041)	Receive Coil Manufacturer Name	ReceiveCoilManufacturerName	LO	1
(0018,9042)	MR Receive Coil Sequence	MRReceiveCoilSequence	SQ	1
(0018,9043)	Receive Coil Type	ReceiveCoilType	CS	1
(0018,9044)	Quadrature Receive Coil	QuadratureReceiveCoil	CS	1
(0018,9045)	Multi-Coil Definition Sequence	MultiCoilDefinitionSequence	SQ	1
(0018,9046)	Multi-Coil Configuration	MultiCoilConfiguration	LO	1
(0018,9047)	Multi-Coil Element Name	MultiCoilElementName	SH	1
(0018,9048)	Multi-Coil Element Used	MultiCoilElementUsed	CS	1
(0018,9049)	MR Transmit Coil Sequence	MRTransmitCoilSequence	SQ	1
(0018,9050)	Transmit Coil Manufacturer Name	TransmitCoilManufacturerName	LO	1
(0018,9051)	Transmit Coil Type	TransmitCoilType	CS	1
(0018,9052)	Spectral Width	SpectralWidth	FD	1-2
(0018,9053)	Chemical Shift Reference	ChemicalShiftReference	FD	1-2
(0018,9054)	Volume Localization Technique	VolumeLocalizationTechnique	CS	1
(0018,9058)	MR Acquisition Frequency Encoding Steps	MRAcquisitionFrequencyEncodingSteps	US	1
(0018,9059)	De-coupling	Decoupling	CS	1
(0018,9060)	De-coupled Nucleus	DecoupledNucleus	CS	1-2
(0018,9061)	De-coupling Frequency	DecouplingFrequency	FD	1-2
(0018,9062)	De-coupling Method	DecouplingMethod	CS	1
(0018,9063)	De-coupling Chemical Shift Reference	DecouplingChemicalShiftReference	FD	1-2
(0018,9064)	k-space Filtering	KSpaceFiltering	CS	1
(0018,9065)	Time Domain Filtering	TimeDomainFiltering	CS	1-2
(0018,9066)	Number of Zero Fills	NumberOfZeroFills	US	1-2
(0018,9067)	Baseline Correction	BaselineCorrection	CS	1
(0018,9069)	Parallel Reduction Factor In-plane	ParallelReductionFactorInPlane	FD	1
(0018,9070)	Cardiac R-R Interval Specified	CardiacRRIntervalSpecified	FD	1
(0018,9073)	Acquisition Duration	AcquisitionDuration	FD	1
(0018,9074)	Frame Acquisition DateTime	FrameAcquisitionDateTime	DT	1
(0018,9075)	Diffusion Directionality	DiffusionDirectionality	CS	1
(0018,9076)	Diffusion Gradient Direction Sequence	DiffusionGradientDirectionSequence	SQ	1
(0018,9077)	Parallel Acquisition	ParallelAcquisition	CS	1
(0018,9078)	Parallel Acquisition Technique	ParallelAcquisitionTechnique	CS	1
(0018,9079)	Inversion Times	InversionTimes	FD	1-n
(0018,9080)	Metabolite Map Description	MetaboliteMapDescription	ST	1
(0018,9081)	Partial Fourier	PartialFourier	CS	1
(0018,9082)	Effective Echo Time	EffectiveEchoTime	FD	1
(0018,9083)	Metabolite Map Code Sequence	MetaboliteMapCodeSequence	SQ	1
(0018,9084)	Chemical Shift Sequence	ChemicalShiftSequence	SQ	1
(0018,9085)	Cardiac Signal Source	CardiacSignalSource	CS	1
(0018,9087)	Diffusion b-value	DiffusionBValue	FD	1
(0018,9089)	Diffusion Gradient Orientation	DiffusionGradientOrientation	FD	3
(0018,9090)	Velocity Encoding Direction	VelocityEncodingDirection	FD	3
(0018,9091)	Velocity Encoding Minimum Value	VelocityEncodingMinimumValue	FD	1
(0018,9092)	Velocity Encoding Acquisition Sequence	VelocityEncodingAcquisitionSequence	SQ	1
(0018,9093)	Number of k-Space Trajectories	NumberOfKSpaceTrajectories	US	1
(0018,9094)	Coverage of k-Space	CoverageOfKSpace	CS	1
(0018,9095)	Spectroscopy Acquisition Phase Rows	SpectroscopyAcquisitionPhaseRows	UL	1
(0018,9096)	Parallel Reduction Factor In-plane (Retired)	ParallelReductionFactorInPlaneRetired	FD	1	RET
(0018,9098)	Transmitter Frequency	TransmitterFrequency	FD	1-2
(0018,9100)	Resonant Nucleus	ResonantNucleus	CS	1-2
(0018,9101)	Frequency Correction	FrequencyCorrection	CS	1
(0018,9103)	MR Spectroscopy FOV/Geometry Sequence	MRSpectroscopyFOVGeometrySequence	SQ	1
(0018,9104)	Slab Thickness	SlabThickness	FD	1
(0018,9105)	Slab Orientation	SlabOrientation	FD	3
(0018,9106)	Mid Slab Position	MidSlabPosition	FD	3
(0018,9107)	MR Spatial Saturation Sequence	MRSpatialSaturationSequence	SQ	1
(0018,9112)	MR Timing and Related Parameters Sequence	MRTimingAndRelatedParametersSequence	SQ	1
(0018,9114)	MR Echo Sequence	MREchoSequence	SQ	1
(0018,9115)	MR Modifier Sequence	MRModifierSequence	SQ	1
(0018,9117)	MR Diffusion Sequence	MRDiffusionSequence	SQ	1
(0018,9118)	Cardiac Synchronization Sequence	CardiacSynchronizationSequence	SQ	1
(0018,9119)	MR Averages Sequence	MRAveragesSequence	SQ	1
(0018,9125)	MR FOV/Geometry Sequence	MRFOVGeometrySequence	SQ	1
(0018,9126)	Volume Localization Sequence	VolumeLocalizationSequence	SQ	1
(0018,9127)	Spectroscopy Acquisition Data Columns	SpectroscopyAcquisitionDataColumns	UL	1
(0018,9147)	Diffusion Anisotropy Type	DiffusionAnisotropyType	CS	1
(0018,9151)	Frame Reference DateTime	FrameReferenceDateTime	DT	1
(0018,9152)	MR Metabolite Map Sequence	MRMetaboliteMapSequence	SQ	1
(0018,9155)	Parallel Reduction Factor out-of-plane	ParallelReductionFactorOutOfPlane	FD	1
(0018,9159)	Spectroscopy Acquisition Out-of-plane Phase Steps	SpectroscopyAcquisitionOutOfPlanePhaseSteps	UL	1
(0018,9166)	Bulk Motion Status	BulkMotionStatus	CS	1	RET
(0018,9168)	Parallel Reduction Factor Second In-plane	ParallelReductionFactorSecondInPlane	FD	1
(0018,9169)	Cardiac Beat Rejection Technique	CardiacBeatRejectionTechnique	CS	1
(0018,9170)	Respiratory Motion Compensation Technique	RespiratoryMotionCompensationTechnique	CS	1
(0018,9171)	Respiratory Signal Source	RespiratorySignalSource	CS	1
(0018,9172)	Bulk Motion Compensation Technique	BulkMotionCompensationTechnique	CS	1
(0018,9173)	Bulk Motion Signal Source	BulkMotionSignalSource	CS	1
(0018,9174)	Applicable Safety Standard Agency	ApplicableSafetyStandardAgency	CS	1
(0018,9175)	Applicable Safety Standard Description	ApplicableSafetyStandardDescription	LO	1
(0018,9176)	Operating Mode Sequence	OperatingModeSequence	SQ	1
(0018,9177)	Operating Mode Type	OperatingModeType	CS	1
(0018,9178)	Operating Mode	OperatingMode	CS	1
(0018,9179)	Specific Absorption Rate Definition	SpecificAbsorptionRateDefinition	CS	1
(0018,9180)	Gradient Output Type	GradientOutputType	CS	1
(0018,9181)	Specific Absorption Rate Value	SpecificAbsorptionRateValue	FD	1
(0018,9182)	Gradient Output	GradientOutput	FD	1
(0018,9183)	Flow Compensation Direction	FlowCompensationDirection	CS	1
(0018,9184)	Tagging Delay	TaggingDelay	FD	1
(0018,9185)	Respiratory Motion Compensation Technique Description	RespiratoryMotionCompensationTechniqueDescription	ST	1
(0018,9186)	Respiratory Signal Source ID	RespiratorySignalSourceID	SH	1
(0018,9195)	Chemical Shift Minimum Integration Limit in Hz	ChemicalShiftMinimumIntegrationLimitInHz	FD	1	RET
(0018,9196)	Chemical Shift Maximum Integration Limit in Hz	ChemicalShiftMaximumIntegrationLimitInHz	FD	1	RET
(0018,9197)	MR Velocity Encoding Sequence	MRVelocityEncodingSequence	SQ	1
(0018,9198)	First Order Phase Correction	FirstOrderPhaseCorrection	CS	1
(0018,9199)	Water Referenced Phase Correction	WaterReferencedPhaseCorrection	CS	1
(0018,9200)	MR Spectroscopy Acquisition Type	MRSpectroscopyAcquisitionType	CS	1
(0018,9214)	Respiratory Cycle Position	RespiratoryCyclePosition	CS	1
(0018,9217)	Velocity Encoding Maximum Value	VelocityEncodingMaximumValue	FD	1
(0018,9218)	Tag Spacing Second Dimension	TagSpacingSecondDimension	FD	1
(0018,9219)	Tag Angle Second Axis	TagAngleSecondAxis	SS	1
(0018,9220)	Frame Acquisition Duration	FrameAcquisitionDuration	FD	1
(0018,9226)	MR Image Frame Type Sequence	MRImageFrameTypeSequence	SQ	1
(0018,9227)	MR Spectroscopy Frame Type Sequence	MRSpectroscopyFrameTypeSequence	SQ	1
(0018,9231)	MR Acquisition Phase Encoding Steps in-plane	MRAcquisitionPhaseEncodingStepsInPlane	US	1
(0018,9232)	MR Acquisition Phase Encoding Steps out-of-plane	MRAcquisitionPhaseEncodingStepsOutOfPlane	US	1
(0018,9234)	Spectroscopy Acquisition Phase Columns	SpectroscopyAcquisitionPhaseColumns	UL	1
(0018,9236)	Cardiac Cycle Position	CardiacCyclePosition	CS	1
(0018,9239)	Specific Absorption Rate Sequence	SpecificAbsorptionRateSequence	SQ	1
(0018,9240)	RF Echo Train Length	RFEchoTrainLength	US	1
(0018,9241)	Gradient Echo Train Length	GradientEchoTrainLength	US	1
(0018,9250)	Arterial Spin Labeling Contrast	ArterialSpinLabelingContrast	CS	1
(0018,9251)	MR Arterial Spin Labeling Sequence	MRArterialSpinLabelingSequence	SQ	1
(0018,9252)	ASL Technique Description	ASLTechniqueDescription	LO	1
(0018,9253)	ASL Slab Number	ASLSlabNumber	US	1
(0018,9254)	ASL Slab Thickness	ASLSlabThickness	FD	1
(0018,9255)	ASL Slab Orientation	ASLSlabOrientation	FD	3
(0018,9256)	ASL Mid Slab Position	ASLMidSlabPosition	FD	3
(0018,9257)	ASL Context	ASLContext	CS	1
(0018,9258)	ASL Pulse Train Duration	ASLPulseTrainDuration	UL	1
(0018,9259)	ASL Crusher Flag	ASLCrusherFlag	CS	1
(0018,925A)	ASL Crusher Flow	ASLCrusherFlow	FD	1
(0018,925B)	ASL Crusher Description	ASLCrusherDescription	LO	1
(0018,925C)	ASL Bolus Cut-off Flag	ASLBolusCutoffFlag	CS	1
(0018,925D)	ASL Bolus Cut-off Timing Sequence	ASLBolusCutoffTimingSequence	SQ	1
(0018,925E)	ASL Bolus Cut-off Technique	ASLBolusCutoffTechnique	LO	1
(0018,925F)	ASL Bolus Cut-off Delay Time	ASLBolusCutoffDelayTime	UL	1
(0018,9260)	ASL Slab Sequence	ASLSlabSequence	SQ	1
(0018,9295)	Chemical Shift Minimum Integration Limit in ppm	ChemicalShiftMinimumIntegrationLimitInppm	FD	1
(0018,9296)	Chemical Shift Maximum Integration Limit in ppm	ChemicalShiftMaximumIntegrationLimitInppm	FD	1
(0018,9301)	CT Acquisition Type Sequence	CTAcquisitionTypeSequence	SQ	1
(0018,9302)	Acquisition Type	AcquisitionType	CS	1
(0018,9303)	Tube Angle	TubeAngle	FD	1
(0018,9304)	CT Acquisition Details Sequence	CTAcquisitionDetailsSequence	SQ	1
(0018,9305)	Revolution Time	RevolutionTime	FD	1
(0018,9306)	Single Collimation Width	SingleCollimationWidth	FD	1
(0018,9307)	Total Collimation Width	TotalCollimationWidth	FD	1
(0018,9308)	CT Table Dynamics Sequence	CTTableDynamicsSequence	SQ	1
(0018,9309)	Table Speed	TableSpeed	FD	1
(0018,9310)	Table Feed per Rotation	TableFeedPerRotation	FD	1
(0018,9311)	Spiral Pitch Factor	SpiralPitchFactor	FD	1
(0018,9312)	CT Geometry Sequence	CTGeometrySequence	SQ	1
(0018,9313)	Data Collection Center (Patient)	DataCollectionCenterPatient	FD	3
(0018,9314)	CT Reconstruction Sequence	CTReconstructionSequence	SQ	1
(0018,9315)	Reconstruction Algorithm	ReconstructionAlgorithm	CS	1
(0018,9316)	Convolution Kernel Group	ConvolutionKernelGroup	CS	1
(0018,9317)	Reconstruction Field of View	ReconstructionFieldOfView	FD	2
(0018,9318)	Reconstruction Target Center (Patient)	ReconstructionTargetCenterPatient	FD	3
(0018,9319)	Reconstruction Angle	ReconstructionAngle	FD	1
(0018,9320)	Image Filter	ImageFilter	SH	1
(0018,9321)	CT Exposure Sequence	CTExposureSequence	SQ	1
(0018,9322)	Reconstruction Pixel Spacing	ReconstructionPixelSpacing	FD	2
(0018,9323)	Exposure Modulation Type	ExposureModulationType	CS	1
(0018,9324)	Estimated Dose Saving	EstimatedDoseSaving	FD	1
(0018,9325)	CT X-Ray Details Sequence	CTXRayDetailsSequence	SQ	1
(0018,9326)	CT Position Sequence	CTPositionSequence	SQ	1
(0018,9327)	Table Position	TablePosition	FD	1
(0018,9328)	Exposure Time in ms	ExposureTimeInms	FD	1
(0018,9329)	CT Image Frame Type Sequence	CTImageFrameTypeSequence	SQ	1
(0018,9330)	X-Ray Tube Current in mA	XRayTubeCurrentInmA	FD	1
(0018,9332)	Exposure in mAs	ExposureInmAs	FD	1
(0018,9333)	Constant Volume Flag	ConstantVolumeFlag	CS	1
(0018,9334)	Fluoroscopy Flag	FluoroscopyFlag	CS	1
(0018,9335)	Distance Source to Data Collection Center	DistanceSourceToDataCollectionCenter	FD	1
(0018,9337)	Contrast/Bolus Agent Number	ContrastBolusAgentNumber	US	1
(0018,9338)	Contrast/Bolus Ingredient Code Sequence	ContrastBolusIngredientCodeSequence	SQ	1
(0018,9340)	Contrast Administration Profile Sequence	ContrastAdministrationProfileSequence	SQ	1
(0018,9341)	Contrast/Bolus Usage Sequence	ContrastBolusUsageSequence	SQ	1
(0018,9342)	Contrast/Bolus Agent Administered	ContrastBolusAgentAdministered	CS	1
(0018,9343)	Contrast/Bolus Agent Detected	ContrastBolusAgentDetected	CS	1
(0018,9344)	Contrast/Bolus Agent Phase	ContrastBolusAgentPhase	CS	1
(0018,9345)	CTDIvol	CTDIvol	FD	1
(0018,9346)	CTDI Phantom Type Code Sequence	CTDIPhantomTypeCodeSequence	SQ	1
(0018,9351)	Calcium Scoring Mass Factor Patient	CalciumScoringMassFactorPatient	FL	1
(0018,9352)	Calcium Scoring Mass Factor Device	CalciumScoringMassFactorDevice	FL	3
(0018,9353)	Energy Weighting Factor	EnergyWeightingFactor	FL	1
(0018,9360)	CT Additional X-Ray Source Sequence	CTAdditionalXRaySourceSequence	SQ	1
(0018,9401)	Projection Pixel Calibration Sequence	ProjectionPixelCalibrationSequence	SQ	1
(0018,9402)	Distance Source to Isocenter	DistanceSourceToIsocenter	FL	1
(0018,9403)	Distance Object to Table Top	DistanceObjectToTableTop	FL	1
(0018,9404)	Object Pixel Spacing in Center of Beam	ObjectPixelSpacingInCenterOfBeam	FL	2
(0018,9405)	Positioner Position Sequence	PositionerPositionSequence	SQ	1
(0018,9406)	Table Position Sequence	TablePositionSequence	SQ	1
(0018,9407)	Collimator Shape Sequence	CollimatorShapeSequence	SQ	1
(0018,9410)	Planes in Acquisition	PlanesInAcquisition	CS	1
(0018,9412)	XA/XRF Frame Characteristics Sequence	XAXRFFrameCharacteristicsSequence	SQ	1
(0018,9417)	Frame Acquisition Sequence	FrameAcquisitionSequence	SQ	1
(0018,9420)	X-Ray Receptor Type	XRayReceptorType	CS	1
(0018,9423)	Acquisition Protocol Name	AcquisitionProtocolName	LO	1
(0018,9424)	Acquisition Protocol Description	AcquisitionProtocolDescription	LT	1
(0018,9425)	Contrast/Bolus Ingredient Opaque	ContrastBolusIngredientOpaque	CS	1
(0018,9426)	Distance Receptor Plane to Detector Housing	DistanceReceptorPlaneToDetectorHousing	FL	1
(0018,9427)	Intensifier Active Shape	IntensifierActiveShape	CS	1
(0018,9428)	Intensifier Active Dimension(s)	IntensifierActiveDimensions	FL	1-2
(0018,9429)	Physical Detector Size	PhysicalDetectorSize	FL	2
(0018,9430)	Position of Isocenter Projection	PositionOfIsocenterProjection	FL	2
(0018,9432)	Field of View Sequence	FieldOfViewSequence	SQ	1
(0018,9433)	Field of View Description	FieldOfViewDescription	LO	1
(0018,9434)	Exposure Control Sensing Regions Sequence	ExposureControlSensingRegionsSequence	SQ	1
(0018,9435)	Exposure Control Sensing Region Shape	ExposureControlSensingRegionShape	CS	1
(0018,9436)	Exposure Control Sensing Region Left Vertical Edge	ExposureControlSensingRegionLeftVerticalEdge	SS	1
(0018,9437)	Exposure Control Sensing Region Right Vertical Edge	ExposureControlSensingRegionRightVerticalEdge	SS	1
(0018,9438)	Exposure Control Sensing Region Upper Horizontal Edge	ExposureControlSensingRegionUpperHorizontalEdge	SS	1
(0018,9439)	Exposure Control Sensing Region Lower Horizontal Edge	ExposureControlSensingRegionLowerHorizontalEdge	SS	1
(0018,9440)	Center of Circular Exposure Control Sensing Region	CenterOfCircularExposureControlSensingRegion	SS	2
(0018,9441)	Radius of Circular Exposure Control Sensing Region	RadiusOfCircularExposureControlSensingRegion	US	1
(0018,9442)	Vertices of the Polygonal Exposure Control Sensing Region	VerticesOfThePolygonalExposureControlSensingRegion	SS	2-n
(0018,9445)					RET
(0018,9447)	Column Angulation (Patient)	ColumnAngulationPatient	FL	1
(0018,9449)	Beam Angle	BeamAngle	FL	1
(0018,9451)	Frame Detector Parameters Sequence	FrameDetectorParametersSequence	SQ	1
(0018,9452)	Calculated Anatomy Thickness	CalculatedAnatomyThickness	FL	1
(0018,9455)	Calibration Sequence	CalibrationSequence	SQ	1
(0018,9456)	Object Thickness Sequence	ObjectThicknessSequence	SQ	1
(0018,9457)	Plane Identification	PlaneIdentification	CS	1
(0018,9461)	Field of View Dimension(s) in Float	FieldOfViewDimensionsInFloat	FL	1-2
(0018,9462)	Isocenter Reference System Sequence	IsocenterReferenceSystemSequence	SQ	1
(0018,9463)	Positioner Isocenter Primary Angle	PositionerIsocenterPrimaryAngle	FL	1
(0018,9464)	Positioner Isocenter Secondary Angle	PositionerIsocenterSecondaryAngle	FL	1
(0018,9465)	Positioner Isocenter Detector Rotation Angle	PositionerIsocenterDetectorRotationAngle	FL	1
(0018,9466)	Table X Position to Isocenter	TableXPositionToIsocenter	FL	1
(0018,9467)	Table Y Position to Isocenter	TableYPositionToIsocenter	FL	1
(0018,9468)	Table Z Position to Isocenter	TableZPositionToIsocenter	FL	1
(0018,9469)	Table Horizontal Rotation Angle	TableHorizontalRotationAngle	FL	1
(0018,9470)	Table Head Tilt Angle	TableHeadTiltAngle	FL	1
(0018,9471)	Table Cradle Tilt Angle	TableCradleTiltAngle	FL	1
(0018,9472)	Frame Display Shutter Sequence	FrameDisplayShutterSequence	SQ	1
(0018,9473)	Acquired Image Area Dose Product	AcquiredImageAreaDoseProduct	FL	1
(0018,9474)	C-arm Positioner Tabletop Relationship	CArmPositionerTabletopRelationship	CS	1
(0018,9476)	X-Ray Geometry Sequence	XRayGeometrySequence	SQ	1
(0018,9477)	Irradiation Event Identification Sequence	IrradiationEventIdentificationSequence	SQ	1
(0018,9504)	X-Ray 3D Frame Type Sequence	XRay3DFrameTypeSequence	SQ	1
(0018,9506)	Contributing Sources Sequence	ContributingSourcesSequence	SQ	1
(0018,9507)	X-Ray 3D Acquisition Sequence	XRay3DAcquisitionSequence	SQ	1
(0018,9508)	Primary Positioner Scan Arc	PrimaryPositionerScanArc	FL	1
(0018,9509)	Secondary Positioner Scan Arc	SecondaryPositionerScanArc	FL	1
(0018,9510)	Primary Positioner Scan Start Angle	PrimaryPositionerScanStartAngle	FL	1
(0018,9511)	Secondary Positioner Scan Start Angle	SecondaryPositionerScanStartAngle	FL	1
(0018,9514)	Primary Positioner Increment	PrimaryPositionerIncrement	FL	1
(0018,9515)	Secondary Positioner Increment	SecondaryPositionerIncrement	FL	1
(0018,9516)	Start Acquisition DateTime	StartAcquisitionDateTime	DT	1
(0018,9517)	End Acquisition DateTime	EndAcquisitionDateTime	DT	1
(0018,9524)	Application Name	ApplicationName	LO	1
(0018,9525)	Application Version	ApplicationVersion	LO	1
(0018,9526)	Application Manufacturer	ApplicationManufacturer	LO	1
(0018,9527)	Algorithm Type	AlgorithmType	CS	1
(0018,9528)	Algorithm Description	AlgorithmDescription	LO	1
(0018,9530)	X-Ray 3D Reconstruction Sequence	XRay3DReconstructionSequence	SQ	1
(0018,9531)	Reconstruction Description	ReconstructionDescription	LO	1
(0018,9538)	Per Projection Acquisition Sequence	PerProjectionAcquisitionSequence	SQ	1
(0018,9601)	Diffusion b-matrix Sequence	DiffusionBMatrixSequence	SQ	1
(0018,9602)	Diffusion b-value XX	DiffusionBValueXX	FD	1
(0018,9603)	Diffusion b-value XY	DiffusionBValueXY	FD	1
(0018,9604)	Diffusion b-value XZ	DiffusionBValueXZ	FD	1
(0018,9605)	Diffusion b-value YY	DiffusionBValueYY	FD	1
(0018,9606)	Diffusion b-value YZ	DiffusionBValueYZ	FD	1
(0018,9607)	Diffusion b-value ZZ	DiffusionBValueZZ	FD	1
(0018,9701)	Decay Correction DateTime	DecayCorrectionDateTime	DT	1
(0018,9715)	Start Density Threshold	StartDensityThreshold	FD	1
(0018,9716)	Start Relative Density Difference Threshold	StartRelativeDensityDifferenceThreshold	FD	1
(0018,9717)	Start Cardiac Trigger Count Threshold	StartCardiacTriggerCountThreshold	FD	1
(0018,9718)	Start Respiratory Trigger Count Threshold	StartRespiratoryTriggerCountThreshold	FD	1
(0018,9719)	Termination Counts Threshold	TerminationCountsThreshold	FD	1
(0018,9720)	Termination Density Threshold	TerminationDensityThreshold	FD	1
(0018,9721)	Termination Relative Density Threshold	TerminationRelativeDensityThreshold	FD	1
(0018,9722)	Termination Time Threshold	TerminationTimeThreshold	FD	1
(0018,9723)	Termination Cardiac Trigger Count Threshold	TerminationCardiacTriggerCountThreshold	FD	1
(0018,9724)	Termination Respiratory Trigger Count Threshold	TerminationRespiratoryTriggerCountThreshold	FD	1
(0018,9725)	Detector Geometry	DetectorGeometry	CS	1
(0018,9726)	Transverse Detector Separation	TransverseDetectorSeparation	FD	1
(0018,9727)	Axial Detector Dimension	AxialDetectorDimension	FD	1
(0018,9729)	Radiopharmaceutical Agent Number	RadiopharmaceuticalAgentNumber	US	1
(0018,9732)	PET Frame Acquisition Sequence	PETFrameAcquisitionSequence	SQ	1
(0018,9733)	PET Detector Motion Details Sequence	PETDetectorMotionDetailsSequence	SQ	1
(0018,9734)	PET Table Dynamics Sequence	PETTableDynamicsSequence	SQ	1
(0018,9735)	PET Position Sequence	PETPositionSequence	SQ	1
(0018,9736)	PET Frame Correction Factors Sequence	PETFrameCorrectionFactorsSequence	SQ	1
(0018,9737)	Radiopharmaceutical Usage Sequence	RadiopharmaceuticalUsageSequence	SQ	1
(0018,9738)	Attenuation Correction Source	AttenuationCorrectionSource	CS	1
(0018,9739)	Number of Iterations	NumberOfIterations	US	1
(0018,9740)	Number of Subsets	NumberOfSubsets	US	1
(0018,9749)	PET Reconstruction Sequence	PETReconstructionSequence	SQ	1
(0018,9751)	PET Frame Type Sequence	PETFrameTypeSequence	SQ	1
(0018,9755)	Time of Flight Information Used	TimeOfFlightInformationUsed	CS	1
(0018,9756)	Reconstruction Type	ReconstructionType	CS	1
(0018,9758)	Decay Corrected	DecayCorrected	CS	1
(0018,9759)	Attenuation Corrected	AttenuationCorrected	CS	1
(0018,9760)	Scatter Corrected	ScatterCorrected	CS	1
(0018,9761)	Dead Time Corrected	DeadTimeCorrected	CS	1
(0018,9762)	Gantry Motion Corrected	GantryMotionCorrected	CS	1
(0018,9763)	Patient Motion Corrected	PatientMotionCorrected	CS	1
(0018,9764)	Count Loss Normalization Corrected	CountLossNormalizationCorrected	CS	1
(0018,9765)	Randoms Corrected	RandomsCorrected	CS	1
(0018,9766)	Non-uniform Radial Sampling Corrected	NonUniformRadialSamplingCorrected	CS	1
(0018,9767)	Sensitivity Calibrated	SensitivityCalibrated	CS	1
(0018,9768)	Detector Normalization Correction	DetectorNormalizationCorrection	CS	1
(0018,9769)	Iterative Reconstruction Method	IterativeReconstructionMethod	CS	1
(0018,9770)	Attenuation Correction Temporal Relationship	AttenuationCorrectionTemporalRelationship	CS	1
(0018,9771)	Patient Physiological State Sequence	PatientPhysiologicalStateSequence	SQ	1
(0018,9772)	Patient Physiological State Code Sequence	PatientPhysiologicalStateCodeSequence	SQ	1
(0018,9801)	Depth(s) of Focus	DepthsOfFocus	FD	1-n
(0018,9803)	Excluded Intervals Sequence	ExcludedIntervalsSequence	SQ	1
(0018,9804)	Exclusion Start Datetime	ExclusionStartDatetime	DT	1
(0018,9805)	Exclusion Duration	ExclusionDuration	FD	1
(0018,9806)	US Image Description Sequence	USImageDescriptionSequence	SQ	1
(0018,9807)	Image Data Type Sequence	ImageDataTypeSequence	SQ	1
(0018,9808)	Data Type	DataType	CS	1
(0018,9809)	Transducer Scan Pattern Code Sequence	TransducerScanPatternCodeSequence	SQ	1
(0018,980B)	Aliased Data Type	AliasedDataType	CS	1
(0018,980C)	Position Measuring Device Used	PositionMeasuringDeviceUsed	CS	1
(0018,980D)	Transducer Geometry Code Sequence	TransducerGeometryCodeSequence	SQ	1
(0018,980E)	Transducer Beam Steering Code Sequence	TransducerBeamSteeringCodeSequence	SQ	1
(0018,980F)	Transducer Application Code Sequence	TransducerApplicationCodeSequence	SQ	1
(0018,A001)	Contributing Equipment Sequence	ContributingEquipmentSequence	SQ	1
(0018,A002)	Contribution Date Time	ContributionDateTime	DT	1
(0018,A003)	Contribution Description	ContributionDescription	ST	1
(0020,000D)	Study Instance UID	StudyInstanceUID	UI	1
(0020,000E)	Series Instance UID	SeriesInstanceUID	UI	1
(0020,0010)	Study ID	StudyID	SH	1
(0020,0011)	Series Number	SeriesNumber	IS	1
(0020,0012)	Acquisition Number	AcquisitionNumber	IS	1
(0020,0013)	Instance Number	InstanceNumber	IS	1
(0020,0014)	Isotope Number	IsotopeNumber	IS	1	RET
(0020,0015)	Phase Number	PhaseNumber	IS	1	RET
(0020,0016)	Interval Number	IntervalNumber	IS	1	RET
(0020,0017)	Time Slot Number	TimeSlotNumber	IS	1	RET
(0020,0018)	Angle Number	AngleNumber	IS	1	RET
(0020,0019)	Item Number	ItemNumber	IS	1
(0020,0020)	Patient Orientation	PatientOrientation	CS	2
(0020,0022)	Overlay Number	OverlayNumber	IS	1	RET
(0020,0024)	Curve Number	CurveNumber	IS	1	RET
(0020,0026)	LUT Number	LUTNumber	IS	1	RET
(0020,0030)	Image Position	ImagePosition	DS	3	RET
(0020,0032)	Image Position (Patient)	ImagePositionPatient	DS	3
(0020,0035)	Image Orientation	ImageOrientation	DS	6	RET
(0020,0037)	Image Orientation (Patient)	ImageOrientationPatient	DS	6
(0020,0050)	Location	Location	DS	1	RET
(0020,0052)	Frame of Reference UID	FrameOfReferenceUID	UI	1
(0020,0060)	Laterality	Laterality	CS	1
(0020,0062)	Image Laterality	ImageLaterality	CS	1
(0020,0070)	Image Geometry Type	ImageGeometryType	LO	1	RET
(0020,0080)	Masking Image	MaskingImage	CS	1-n	RET
(0020,00AA)	Report Number	ReportNumber	IS	1	RET
(0020,0100)	Temporal Position Identifier	TemporalPositionIdentifier	IS	1
(0020,0105)	Number of Temporal Positions	NumberOfTemporalPositions	IS	1
(0020,0110)	Temporal Resolution	TemporalResolution	DS	1
(0020,0200)	Synchronization Frame of Reference UID	SynchronizationFrameOfReferenceUID	UI	1
(0020,0242)	SOP Instance UID of Concatenation Source	SOPInstanceUIDOfConcatenationSource	UI	1
(0020,1000)	Series in Study	SeriesInStudy	IS	1	RET
(0020,1001)	Acquisitions in Series	AcquisitionsInSeries	IS	1	RET
(0020,1002)	Images in Acquisition	ImagesInAcquisition	IS	1
(0020,1003)	Images in Series	ImagesInSeries	IS	1	RET
(0020,1004)	Acquisitions in Study	AcquisitionsInStudy	IS	1	RET
(0020,1005)	Images in Study	ImagesInStudy	IS	1	RET
(0020,1020)	Reference	Reference	LO	1-n	RET
(0020,1040)	Position Reference Indicator	PositionReferenceIndicator	LO	1
(0020,1041)	Slice Location	SliceLocation	DS	1
(0020,1070)	Other Study Numbers	OtherStudyNumbers	IS	1-n	RET
(0020,1200)	Number of Patient Related Studies	NumberOfPatientRelatedStudies	IS	1
(0020,1202)	Number of Patient Related Series	NumberOfPatientRelatedSeries	IS	1
(0020,1204)	Number of Patient Related Instances	NumberOfPatientRelatedInstances	IS	1
(0020,1206)	Number of Study Related Series	NumberOfStudyRelatedSeries	IS	1
(0020,1208)	Number of Study Related Instances	NumberOfStudyRelatedInstances	IS	1
(0020,1209)	Number of Series Related Instances	NumberOfSeriesRelatedInstances	IS	1
(0020,3100 to 31FF)	Source Image IDs	SourceImageIDs	CS	1-n	RET
(0020,3401)	Modifying Device ID	ModifyingDeviceID	CS	1	RET
(0020,3402)	Modified Image ID	ModifiedImageID	CS	1	RET
(0020,3403)	Modified Image Date	ModifiedImageDate	DA	1	RET
(0020,3404)	Modifying Device Manufacturer	ModifyingDeviceManufacturer	LO	1	RET
(0020,3405)	Modified Image Time	ModifiedImageTime	TM	1	RET
(0020,3406)	Modified Image Description	ModifiedImageDescription	LO	1	RET
(0020,4000)	Image Comments	ImageComments	LT	1
(0020,5000)	Original Image Identification	OriginalImageIdentification	AT	1-n	RET
(0020,5002)	Original Image Identification Nomenclature	OriginalImageIdentificationNomenclature	LO	1-n	RET
(0020,9056)	Stack ID	StackID	SH	1
(0020,9057)	In-Stack Position Number	InStackPositionNumber	UL	1
(0020,9071)	Frame Anatomy Sequence	FrameAnatomySequence	SQ	1
(0020,9072)	Frame Laterality	FrameLaterality	CS	1
(0020,9111)	Frame Content Sequence	FrameContentSequence	SQ	1
(0020,9113)	Plane Position Sequence	PlanePositionSequence	SQ	1
(0020,9116)	Plane Orientation Sequence	PlaneOrientationSequence	SQ	1
(0020,9128)	Temporal Position Index	TemporalPositionIndex	UL	1
(0020,9153)	Nominal Cardiac Trigger Delay Time	NominalCardiacTriggerDelayTime	FD	1
(0020,9154)	Nominal Cardiac Trigger Time Prior To R-Peak	NominalCardiacTriggerTimePriorToRPeak	FL	1
(0020,9155)	Actual Cardiac Trigger Time Prior To R-Peak	ActualCardiacTriggerTimePriorToRPeak	FL	1
(0020,9156)	Frame Acquisition Number	FrameAcquisitionNumber	US	1
(0020,9157)	Dimension Index Values	DimensionIndexValues	UL	1-n
(0020,9158)	Frame Comments	FrameComments	LT	1
(0020,9161)	Concatenation UID	ConcatenationUID	UI	1
(0020,9162)	In-concatenation Number	InConcatenationNumber	US	1
(0020,9163)	In-concatenation Total Number	InConcatenationTotalNumber	US	1
(0020,9164)	Dimension Organization UID	DimensionOrganizationUID	UI	1
(0020,9165)	Dimension Index Pointer	DimensionIndexPointer	AT	1
(0020,9167)	Functional Group Pointer	FunctionalGroupPointer	AT	1
(0020,9213)	Dimension Index Private Creator	DimensionIndexPrivateCreator	LO	1
(0020,9221)	Dimension Organization Sequence	DimensionOrganizationSequence	SQ	1
(0020,9222)	Dimension Index Sequence	DimensionIndexSequence	SQ	1
(0020,9228)	Concatenation Frame Offset Number	ConcatenationFrameOffsetNumber	UL	1
(0020,9238)	Functional Group Private Creator	FunctionalGroupPrivateCreator	LO	1
(0020,9241)	Nominal Percentage of Cardiac Phase	NominalPercentageOfCardiacPhase	FL	1
(0020,9245)	Nominal Percentage of Respiratory Phase	NominalPercentageOfRespiratoryPhase	FL	1
(0020,9246)	Starting Respiratory Amplitude	StartingRespiratoryAmplitude	FL	1
(0020,9247)	Starting Respiratory Phase	StartingRespiratoryPhase	CS	1
(0020,9248)	Ending Respiratory Amplitude	EndingRespiratoryAmplitude	FL	1
(0020,9249)	Ending Respiratory Phase	EndingRespiratoryPhase	CS	1
(0020,9250)	Respiratory Trigger Type	RespiratoryTriggerType	CS	1
(0020,9251)	R-R Interval Time Nominal	RRIntervalTimeNominal	FD	1
(0020,9252)	Actual Cardiac Trigger Delay Time	ActualCardiacTriggerDelayTime	FD	1
(0020,9253)	Respiratory Synchronization Sequence	RespiratorySynchronizationSequence	SQ	1
(0020,9254)	Respiratory Interval Time	RespiratoryIntervalTime	FD	1
(0020,9255)	Nominal Respiratory Trigger Delay Time	NominalRespiratoryTriggerDelayTime	FD	1
(0020,9256)	Respiratory Trigger Delay Threshold	RespiratoryTriggerDelayThreshold	FD	1
(0020,9257)	Actual Respiratory Trigger Delay Time	ActualRespiratoryTriggerDelayTime	FD	1
(0020,9301)	Image Position (Volume)	ImagePositionVolume	FD	3
(0020,9302)	Image Orientation (Volume)	ImageOrientationVolume	FD	6
(0020,9307)	Ultrasound Acquisition Geometry	UltrasoundAcquisitionGeometry	CS	1
(0020,9308)	Apex Position	ApexPosition	FD	3
(0020,9309)	Volume to Transducer Mapping Matrix	VolumeToTransducerMappingMatrix	FD	16
(0020,930A)	Volume to Table Mapping Matrix	VolumeToTableMappingMatrix	FD	16
(0020,930C)	Patient Frame of Reference Source	PatientFrameOfReferenceSource	CS	1
(0020,930D)	Temporal Position Time Offset	TemporalPositionTimeOffset	FD	1
(0020,930E)	Plane Position (Volume) Sequence	PlanePositionVolumeSequence	SQ	1
(0020,930F)	Plane Orientation (Volume) Sequence	PlaneOrientationVolumeSequence	SQ	1
(0020,9310)	Temporal Position Sequence	TemporalPositionSequence	SQ	1
(0020,9311)	Dimension Organization Type	DimensionOrganizationType	CS	1
(0020,9312)	Volume Frame of Reference UID	VolumeFrameOfReferenceUID	UI	1
(0020,9313)	Table Frame of Reference UID	TableFrameOfReferenceUID	UI	1
(0020,9421)	Dimension Description Label	DimensionDescriptionLabel	LO	1
(0020,9450)	Patient Orientation in Frame Sequence	PatientOrientationInFrameSequence	SQ	1
(0020,9453)	Frame Label	FrameLabel	LO	1
(0020,9518)	Acquisition Index	AcquisitionIndex	US	1-n
(0020,9529)	Contributing SOP Instances Reference Sequence	ContributingSOPInstancesReferenceSequence	SQ	1
(0020,9536)	Reconstruction Index	ReconstructionIndex	US	1
(0022,0001)	Light Path Filter Pass-Through Wavelength	LightPathFilterPassThroughWavelength	US	1
(0022,0002)	Light Path Filter Pass Band	LightPathFilterPassBand	US	2
(0022,0003)	Image Path Filter Pass-Through Wavelength	ImagePathFilterPassThroughWavelength	US	1
(0022,0004)	Image Path Filter Pass Band	ImagePathFilterPassBand	US	2
(0022,0005)	Patient Eye Movement Commanded	PatientEyeMovementCommanded	CS	1
(0022,0006)	Patient Eye Movement Command Code Sequence	PatientEyeMovementCommandCodeSequence	SQ	1
(0022,0007)	Spherical Lens Power	SphericalLensPower	FL	1
(0022,0008)	Cylinder Lens Power	CylinderLensPower	FL	1
(0022,0009)	Cylinder Axis	CylinderAxis	FL	1
(0022,000A)	Emmetropic Magnification	EmmetropicMagnification	FL	1
(0022,000B)	Intra Ocular Pressure	IntraOcularPressure	FL	1
(0022,000C)	Horizontal Field of View	HorizontalFieldOfView	FL	1
(0022,000D)	Pupil Dilated	PupilDilated	CS	1
(0022,000E)	Degree of Dilation	DegreeOfDilation	FL	1
(0022,0013)	Stereo Vertical Pixel Offset	StereoVerticalPixelOffset	FL	1
(0022,0010)	Stereo Baseline Angle	StereoBaselineAngle	FL	1
(0022,0011)	Stereo Baseline Displacement	StereoBaselineDisplacement	FL	1
(0022,0012)	Stereo Horizontal Pixel Offset	StereoHorizontalPixelOffset	FL	1
(0022,0014)	Stereo Rotation	StereoRotation	FL	1
(0022,0015)	Acquisition Device Type Code Sequence	AcquisitionDeviceTypeCodeSequence	SQ	1
(0022,0016)	Illumination Type Code Sequence	IlluminationTypeCodeSequence	SQ	1
(0022,0017)	Light Path Filter Type Stack Code Sequence	LightPathFilterTypeStackCodeSequence	SQ	1
(0022,0018)	Image Path Filter Type Stack Code Sequence	ImagePathFilterTypeStackCodeSequence	SQ	1
(0022,0019)	Lenses Code Sequence	LensesCodeSequence	SQ	1
(0022,001A)	Channel Description Code Sequence	ChannelDescriptionCodeSequence	SQ	1
(0022,001B)	Refractive State Sequence	RefractiveStateSequence	SQ	1
(0022,001C)	Mydriatic Agent Code Sequence	MydriaticAgentCodeSequence	SQ	1
(0022,001D)	Relative Image Position Code Sequence	RelativeImagePositionCodeSequence	SQ	1
(0022,001E)	Camera Angle of View	CameraAngleOfView	FL	1
(0022,0020)	Stereo Pairs Sequence	StereoPairsSequence	SQ	1
(0022,0021)	Left Image Sequence	LeftImageSequence	SQ	1
(0022,0022)	Right Image Sequence	RightImageSequence	SQ	1
(0022,0030)	Axial Length of the Eye	AxialLengthOfTheEye	FL	1
(0022,0031)	Ophthalmic Frame Location Sequence	OphthalmicFrameLocationSequence	SQ	1
(0022,0032)	Reference Coordinates	ReferenceCoordinates	FL	2-2n
(0022,0035)	Depth Spatial Resolution	DepthSpatialResolution	FL	1
(0022,0036)	Maximum Depth Distortion	MaximumDepthDistortion	FL	1
(0022,0037)	Along-scan Spatial Resolution	AlongScanSpatialResolution	FL	1
(0022,0038)	Maximum Along-scan Distortion	MaximumAlongScanDistortion	FL	1
(0022,0039)	Ophthalmic Image Orientation	OphthalmicImageOrientation	CS	1
(0022,0041)	Depth of Transverse Image	DepthOfTransverseImage	FL	1
(0022,0042)	Mydriatic Agent Concentration Units Sequence	MydriaticAgentConcentrationUnitsSequence	SQ	1
(0022,0048)	Across-scan Spatial Resolution	AcrossScanSpatialResolution	FL	1
(0022,0049)	Maximum Across-scan Distortion	MaximumAcrossScanDistortion	FL	1
(0022,004E)	Mydriatic Agent Concentration	MydriaticAgentConcentration	DS	1
(0022,0055)	Illumination Wave Length	IlluminationWaveLength	FL	1
(0022,0056)	Illumination Power	IlluminationPower	FL	1
(0022,0057)	Illumination Bandwidth	IlluminationBandwidth	FL	1
(0022,0058)	Mydriatic Agent Sequence	MydriaticAgentSequence	SQ	1
(0022,1007)	Ophthalmic Axial Measurements Right Eye Sequence	OphthalmicAxialMeasurementsRightEyeSequence	SQ	1
(0022,1008)	Ophthalmic Axial Measurements Left Eye Sequence	OphthalmicAxialMeasurementsLeftEyeSequence	SQ	1
(0022,1010)	Ophthalmic Axial Length Measurements Type	OphthalmicAxialLengthMeasurementsType	CS	1
(0022,1019)	Ophthalmic Axial Length	OphthalmicAxialLength	FL	1
(0022,1024)	Lens Status Code Sequence	LensStatusCodeSequence	SQ	1
(0022,1025)	Vitreous Status Code Sequence	VitreousStatusCodeSequence	SQ	1
(0022,1028)	IOL Formula Code Sequence	IOLFormulaCodeSequence	SQ	1
(0022,1029)	IOL Formula Detail	IOLFormulaDetail	LO	1
(0022,1033)	Keratometer Index	KeratometerIndex	FL	1
(0022,1035)	Source of Ophthalmic Axial Length Code Sequence	SourceOfOphthalmicAxialLengthCodeSequence	SQ	1
(0022,1037)	Target Refraction	TargetRefraction	FL	1
(0022,1039)	Refractive Procedure Occurred	RefractiveProcedureOccurred	CS	1
(0022,1040)	Refractive Surgery Type Code Sequence	RefractiveSurgeryTypeCodeSequence	SQ	1
(0022,1044)	Ophthalmic Ultrasound Axial Measurements Type Code Sequence	OphthalmicUltrasoundAxialMeasurementsTypeCodeSequence	SQ	1
(0022,1050)	Ophthalmic Axial Length Measurements Sequence	OphthalmicAxialLengthMeasurementsSequence	SQ	1
(0022,1053)	IOL Power	IOLPower	FL	1
(0022,1054)	Predicted Refractive Error	PredictedRefractiveError	FL	1
(0022,1059)	Ophthalmic Axial Length Velocity	OphthalmicAxialLengthVelocity	FL	1
(0022,1065)	Lens Status Description	LensStatusDescription	LO	1
(0022,1066)	Vitreous Status Description	VitreousStatusDescription	LO	1
(0022,1090)	IOL Power Sequence	IOLPowerSequence	SQ	1
(0022,1092)	Lens Constant Sequence	LensConstantSequence	SQ	1
(0022,1093)	IOL Manufacturer	IOLManufacturer	LO	1
(0022,1094)	Lens Constant Description	LensConstantDescription	LO	1
(0022,1096)	Keratometry Measurement Type Code Sequence	KeratometryMeasurementTypeCodeSequence	SQ	1
(0022,1100)	Referenced Ophthalmic Axial Measurements Sequence	ReferencedOphthalmicAxialMeasurementsSequence	SQ	1
(0022,1101)	Ophthalmic Axial Length Measurements Segment Name Code Sequence	OphthalmicAxialLengthMeasurementsSegmentNameCodeSequence	SQ	1
(0022,1103)	Refractive Error Before Refractive Surgery Code Sequence	RefractiveErrorBeforeRefractiveSurgeryCodeSequence	SQ	1
(0022,1121)	IOL Power For Exact Emmetropia	IOLPowerForExactEmmetropia	FL	1
(0022,1122)	IOL Power For Exact Target Refraction	IOLPowerForExactTargetRefraction	FL	1
(0022,1125)	Anterior Chamber Depth Definition Code Sequence	AnteriorChamberDepthDefinitionCodeSequence	SQ	1
(0022,1130)	Lens Thickness	LensThickness	FL	1
(0022,1131)	Anterior Chamber Depth	AnteriorChamberDepth	FL	1
(0022,1132)	Source of Lens Thickness Data Code Sequence	SourceOfLensThicknessDataCodeSequence	SQ	1
(0022,1133)	Source of Anterior Chamber Depth Data Code Sequence	SourceOfAnteriorChamberDepthDataCodeSequence	SQ	1
(0022,1135)	Source of Refractive Error Data Code Sequence	SourceOfRefractiveErrorDataCodeSequence	SQ	1
(0022,1140)	Ophthalmic Axial Length Measurement Modified	OphthalmicAxialLengthMeasurementModified	CS	1
(0022,1150)	Ophthalmic Axial Length Data Source Code Sequence	OphthalmicAxialLengthDataSourceCodeSequence	SQ	1
(0022,1153)	Ophthalmic Axial Length Acquisition Method Code Sequence	OphthalmicAxialLengthAcquisitionMethodCodeSequence	SQ	1
(0022,1155)	Signal to Noise Ratio	SignalToNoiseRatio	FL	1
(0022,1159)	Ophthalmic Axial Length Data Source Description	OphthalmicAxialLengthDataSourceDescription	LO	1
(0022,1210)	Ophthalmic Axial Length Measurements Total Length Sequence	OphthalmicAxialLengthMeasurementsTotalLengthSequence	SQ	1
(0022,1211)	Ophthalmic Axial Length Measurements Segmental Length Sequence	OphthalmicAxialLengthMeasurementsSegmentalLengthSequence	SQ	1
(0022,1212)	Ophthalmic Axial Length Measurements Length Summation Sequence	OphthalmicAxialLengthMeasurementsLengthSummationSequence	SQ	1
(0022,1220)	Ultrasound Ophthalmic Axial Length Measurements Sequence	UltrasoundOphthalmicAxialLengthMeasurementsSequence	SQ	1
(0022,1225)	Optical Ophthalmic Axial Length Measurements Sequence	OpticalOphthalmicAxialLengthMeasurementsSequence	SQ	1
(0022,1230)	Ultrasound Selected Ophthalmic Axial Length Sequence	UltrasoundSelectedOphthalmicAxialLengthSequence	SQ	1
(0022,1250)	Ophthalmic Axial Length Selection Method Code Sequence	OphthalmicAxialLengthSelectionMethodCodeSequence	SQ	1
(0022,1255)	Optical Selected Ophthalmic Axial Length Sequence	OpticalSelectedOphthalmicAxialLengthSequence	SQ	1
(0022,1257)	Selected Segmental Ophthalmic Axial Length Sequence	SelectedSegmentalOphthalmicAxialLengthSequence	SQ	1
(0022,1260)	Selected Total Ophthalmic Axial Length Sequence	SelectedTotalOphthalmicAxialLengthSequence	SQ	1
(0022,1262)	Ophthalmic Axial Length Quality Metric Sequence	OphthalmicAxialLengthQualityMetricSequence	SQ	1
(0022,1273)	Ophthalmic Axial Length Quality Metric Type Description	OphthalmicAxialLengthQualityMetricTypeDescription	LO	1
(0022,1300)	Intraocular Lens Calculations Right Eye Sequence	IntraocularLensCalculationsRightEyeSequence	SQ	1
(0022,1310)	Intraocular Lens Calculations Left Eye Sequence	IntraocularLensCalculationsLeftEyeSequence	SQ	1
(0022,1330)	Referenced Ophthalmic Axial Length Measurement QC Image Sequence	ReferencedOphthalmicAxialLengthMeasurementQCImageSequence	SQ	1
(0024,0010)	Visual Field Horizontal Extent	VisualFieldHorizontalExtent	FL	1
(0024,0011)	Visual Field Vertical Extent	VisualFieldVerticalExtent	FL	1
(0024,0012)	Visual Field Shape	VisualFieldShape	CS	1
(0024,0016)	Screening Test Mode Code Sequence	ScreeningTestModeCodeSequence	SQ	1
(0024,0018)	Maximum Stimulus Luminance	MaximumStimulusLuminance	FL	1
(0024,0020)	Background Luminance	BackgroundLuminance	FL	1
(0024,0021)	Stimulus Color Code Sequence	StimulusColorCodeSequence	SQ	1
(0024,0024)	Background Illumination Color Code Sequence	BackgroundIlluminationColorCodeSequence	SQ	1
(0024,0025)	Stimulus Area	StimulusArea	FL	1
(0024,0028)	Stimulus Presentation Time	StimulusPresentationTime	FL	1
(0024,0032)	Fixation Sequence	FixationSequence	SQ	1
(0024,0033)	Fixation Monitoring Code Sequence	FixationMonitoringCodeSequence	SQ	1
(0024,0034)	Visual Field Catch Trial Sequence	VisualFieldCatchTrialSequence	SQ	1
(0024,0035)	Fixation Checked Quantity	FixationCheckedQuantity	US	1
(0024,0036)	Patient Not Properly Fixated Quantity	PatientNotProperlyFixatedQuantity	US	1
(0024,0037)	Presented Visual Stimuli Data Flag	PresentedVisualStimuliDataFlag	CS	1
(0024,0038)	Number of Visual Stimuli	NumberOfVisualStimuli	US	1
(0024,0039)	Excessive Fixation Losses Data Flag	ExcessiveFixationLossesDataFlag	CS	1
(0024,0040)	Excessive Fixation Losses	ExcessiveFixationLosses	CS	1
(0024,0042)	Stimuli Retesting Quantity	StimuliRetestingQuantity	US	1
(0024,0044)	Comments on Patient’s Performance of Visual Field	CommentsOnPatientPerformanceOfVisualField	LT	1
(0024,0045)	False Negatives Estimate Flag	FalseNegativesEstimateFlag	CS	1
(0024,0046)	False Negatives Estimate	FalseNegativesEstimate	FL	1
(0024,0048)	Negative Catch Trials Quantity	NegativeCatchTrialsQuantity	US	1
(0024,0050)	False Negatives Quantity	FalseNegativesQuantity	US	1
(0024,0051)	Excessive False Negatives Data Flag	ExcessiveFalseNegativesDataFlag	CS	1
(0024,0052)	Excessive False Negatives	ExcessiveFalseNegatives	CS	1
(0024,0053)	False Positives Estimate Flag	FalsePositivesEstimateFlag	CS	1
(0024,0054)	False Positives Estimate	FalsePositivesEstimate	FL	1
(0024,0055)	Catch Trials Data Flag	CatchTrialsDataFlag	CS	1
(0024,0056)	Positive Catch Trials Quantity	PositiveCatchTrialsQuantity	US	1
(0024,0057)	Test Point Normals Data Flag	TestPointNormalsDataFlag	CS	1
(0024,0058)	Test Point Normals Sequence	TestPointNormalsSequence	SQ	1
(0024,0059)	Global Deviation Probability Normals Flag	GlobalDeviationProbabilityNormalsFlag	CS	1
(0024,0060)	False Positives Quantity	FalsePositivesQuantity	US	1
(0024,0061)	Excessive False Positives Data Flag	ExcessiveFalsePositivesDataFlag	CS	1
(0024,0062)	Excessive False Positives	ExcessiveFalsePositives	CS	1
(0024,0063)	Visual Field Test Normals Flag	VisualFieldTestNormalsFlag	CS	1
(0024,0064)	Results Normals Sequence	ResultsNormalsSequence	SQ	1
(0024,0065)	Age Corrected Sensitivity Deviation Algorithm Sequence	AgeCorrectedSensitivityDeviationAlgorithmSequence	SQ	1
(0024,0066)	Global Deviation From Normal	GlobalDeviationFromNormal	FL	1
(0024,0067)	Generalized Defect Sensitivity Deviation Algorithm Sequence	GeneralizedDefectSensitivityDeviationAlgorithmSequence	SQ	1
(0024,0068)	Localized Deviation from Normal	LocalizedDeviationfromNormal	FL	1
(0024,0069)	Patient Reliability Indicator	PatientReliabilityIndicator	LO	1
(0024,0070)	Visual Field Mean Sensitivity	VisualFieldMeanSensitivity	FL	1
(0024,0071)	Global Deviation Probability	GlobalDeviationProbability	FL	1
(0024,0072)	Local Deviation Probability Normals Flag	LocalDeviationProbabilityNormalsFlag	CS	1
(0024,0073)	Localized Deviation Probability	LocalizedDeviationProbability	FL	1
(0024,0074)	Short Term Fluctuation Calculated	ShortTermFluctuationCalculated	CS	1
(0024,0075)	Short Term Fluctuation	ShortTermFluctuation	FL	1
(0024,0076)	Short Term Fluctuation Probability Calculated	ShortTermFluctuationProbabilityCalculated	CS	1
(0024,0077)	Short Term Fluctuation Probability	ShortTermFluctuationProbability	FL	1
(0024,0078)	Corrected Localized Deviation From Normal Calculated	CorrectedLocalizedDeviationFromNormalCalculated	CS	1
(0024,0079)	Corrected Localized Deviation From Normal	CorrectedLocalizedDeviationFromNormal	FL	1
(0024,0080)	Corrected Localized Deviation From Normal Probability Calculated	CorrectedLocalizedDeviationFromNormalProbabilityCalculated	CS	1
(0024,0081)	Corrected Localized Deviation From Normal Probability	CorrectedLocalizedDeviationFromNormalProbability	FL	1
(0024,0083)	Global Deviation Probability Sequence	GlobalDeviationProbabilitySequence	SQ	1
(0024,0085)	Localized Deviation Probability Sequence	LocalizedDeviationProbabilitySequence	SQ	1
(0024,0086)	Foveal Sensitivity Measured	FovealSensitivityMeasured	CS	1
(0024,0087)	Foveal Sensitivity	FovealSensitivity	FL	1
(0024,0088)	Visual Field Test Duration	VisualFieldTestDuration	FL	1
(0024,0089)	Visual Field Test Point Sequence	VisualFieldTestPointSequence	SQ	1
(0024,0090)	Visual Field Test Point X-Coordinate	VisualFieldTestPointXCoordinate	FL	1
(0024,0091)	Visual Field Test Point Y-Coordinate	VisualFieldTestPointYCoordinate	FL	1
(0024,0092)	Age Corrected Sensitivity Deviation Value	AgeCorrectedSensitivityDeviationValue	FL	1
(0024,0093)	Stimulus Results	StimulusResults	CS	1
(0024,0094)	Sensitivity Value	SensitivityValue	FL	1
(0024,0095)	Retest Stimulus Seen	RetestStimulusSeen	CS	1
(0024,0096)	Retest Sensitivity Value	RetestSensitivityValue	FL	1
(0024,0097)	Visual Field Test Point Normals Sequence	VisualFieldTestPointNormalsSequence	SQ	1
(0024,0098)	Quantified Defect	QuantifiedDefect	FL	1
(0024,0100)	Age Corrected Sensitivity Deviation Probability Value	AgeCorrectedSensitivityDeviationProbabilityValue	FL	1
(0024,0102)	Generalized Defect Corrected Sensitivity Deviation Flag	GeneralizedDefectCorrectedSensitivityDeviationFlag	CS	1
(0024,0103)	Generalized Defect Corrected Sensitivity Deviation Value	GeneralizedDefectCorrectedSensitivityDeviationValue	FL	1
(0024,0104)	Generalized Defect Corrected Sensitivity Deviation Probability Value	GeneralizedDefectCorrectedSensitivityDeviationProbabilityValue	FL	1
(0024,0105)	Minimum Sensitivity Value	MinimumSensitivityValue	FL	1
(0024,0106)	Blind Spot Localized	BlindSpotLocalized	CS	1
(0024,0107)	Blind Spot X-Coordinate	BlindSpotXCoordinate	FL	1
(0024,0108)	Blind Spot Y-Coordinate	BlindSpotYCoordinate	FL	1
(0024,0110)	Visual Acuity Measurement Sequence	VisualAcuityMeasurementSequence	SQ	1
(0024,0112)	Refractive Parameters Used on Patient Sequence	RefractiveParametersUsedOnPatientSequence	SQ	1
(0024,0113)	Measurement Laterality	MeasurementLaterality	CS	1
(0024,0114)	Ophthalmic Patient Clinical Information Left Eye Sequence	OphthalmicPatientClinicalInformationLeftEyeSequence	SQ	1
(0024,0115)	Ophthalmic Patient Clinical Information Right Eye Sequence	OphthalmicPatientClinicalInformationRightEyeSequence	SQ	1
(0024,0117)	Foveal Point Normative Data Flag	FovealPointNormativeDataFlag	CS	1
(0024,0118)	Foveal Point Probability Value	FovealPointProbabilityValue	FL	1
(0024,0120)	Screening Baseline Measured	ScreeningBaselineMeasured	CS	1
(0024,0122)	Screening Baseline Measured Sequence	ScreeningBaselineMeasuredSequence	SQ	1
(0024,0124)	Screening Baseline Type	ScreeningBaselineType	CS	1
(0024,0126)	Screening Baseline Value	ScreeningBaselineValue	FL	1
(0024,0202)	Algorithm Source	AlgorithmSource	LO	1
(0024,0306)	Data Set Name	DataSetName	LO	1
(0024,0307)	Data Set Version	DataSetVersion	LO	1
(0024,0308)	Data Set Source	DataSetSource	LO	1
(0024,0309)	Data Set Description	DataSetDescription	LO	1
(0024,0317)	Visual Field Test Reliability Global Index Sequence	VisualFieldTestReliabilityGlobalIndexSequence	SQ	1
(0024,0320)	Visual Field Global Results Index Sequence	VisualFieldGlobalResultsIndexSequence	SQ	1
(0024,0325)	Data Observation Sequence	DataObservationSequence	SQ	1
(0024,0338)	Index Normals Flag	IndexNormalsFlag	CS	1
(0024,0341)	Index Probability	IndexProbability	FL	1
(0024,0344)	Index Probability Sequence	IndexProbabilitySequence	SQ	1
(0028,0002)	Samples per Pixel	SamplesPerPixel	US	1
(0028,0003)	Samples per Pixel Used	SamplesPerPixelUsed	US	1
(0028,0004)	Photometric Interpretation	PhotometricInterpretation	CS	1
(0028,0005)	Image Dimensions	ImageDimensions	US	1	RET
(0028,0006)	Planar Configuration	PlanarConfiguration	US	1
(0028,0008)	Number of Frames	NumberOfFrames	IS	1
(0028,0009)	Frame Increment Pointer	FrameIncrementPointer	AT	1-n
(0028,000A)	Frame Dimension Pointer	FrameDimensionPointer	AT	1-n
(0028,0010)	Rows	Rows	US	1
(0028,0011)	Columns	Columns	US	1
(0028,0012)	Planes	Planes	US	1	RET
(0028,0014)	Ultrasound Color Data Present	UltrasoundColorDataPresent	US	1
(0028,0020)					RET
(0028,0030)	Pixel Spacing	PixelSpacing	DS	2
(0028,0031)	Zoom Factor	ZoomFactor	DS	2
(0028,0032)	Zoom Center	ZoomCenter	DS	2
(0028,0034)	Pixel Aspect Ratio	PixelAspectRatio	IS	2
(0028,0040)	Image Format	ImageFormat	CS	1	RET
(0028,0050)	Manipulated Image	ManipulatedImage	LO	1-n	RET
(0028,0051)	Corrected Image	CorrectedImage	CS	1-n
(0028,005F)	Compression Recognition Code	CompressionRecognitionCode	LO	1	RET
(0028,0060)	Compression Code	CompressionCode	CS	1	RET
(0028,0061)	Compression Originator	CompressionOriginator	SH	1	RET
(0028,0062)	Compression Label	CompressionLabel	LO	1	RET
(0028,0063)	Compression Description	CompressionDescription	SH	1	RET
(0028,0065)	Compression Sequence	CompressionSequence	CS	1-n	RET
(0028,0066)	Compression Step Pointers	CompressionStepPointers	AT	1-n	RET
(0028,0068)	Repeat Interval	RepeatInterval	US	1	RET
(0028,0069)	Bits Grouped	BitsGrouped	US	1	RET
(0028,0070)	Perimeter Table	PerimeterTable	US	1-n	RET
(0028,0071)	Perimeter Value	PerimeterValue	US or SS	1	RET
(0028,0080)	Predictor Rows	PredictorRows	US	1	RET
(0028,0081)	Predictor Columns	PredictorColumns	US	1	RET
(0028,0082)	Predictor Constants	PredictorConstants	US	1-n	RET
(0028,0090)	Blocked Pixels	BlockedPixels	CS	1	RET
(0028,0091)	Block Rows	BlockRows	US	1	RET
(0028,0092)	Block Columns	BlockColumns	US	1	RET
(0028,0093)	Row Overlap	RowOverlap	US	1	RET
(0028,0094)	Column Overlap	ColumnOverlap	US	1	RET
(0028,0100)	Bits Allocated	BitsAllocated	US	1
(0028,0101)	Bits Stored	BitsStored	US	1
(0028,0102)	High Bit	HighBit	US	1
(0028,0103)	Pixel Representation	PixelRepresentation	US	1
(0028,0104)	Smallest Valid Pixel Value	SmallestValidPixelValue	US or SS	1	RET
(0028,0105)	Largest Valid Pixel Value	LargestValidPixelValue	US or SS	1	RET
(0028,0106)	Smallest Image Pixel Value	SmallestImagePixelValue	US or SS	1
(0028,0107)	Largest Image Pixel Value	LargestImagePixelValue	US or SS	1
(0028,0108)	Smallest Pixel Value in Series	SmallestPixelValueInSeries	US or SS	1
(0028,0109)	Largest Pixel Value in Series	LargestPixelValueInSeries	US or SS	1
(0028,0110)	Smallest Image Pixel Value in Plane	SmallestImagePixelValueInPlane	US or SS	1	RET
(0028,0111)	Largest Image Pixel Value in Plane	LargestImagePixelValueInPlane	US or SS	1	RET
(0028,0120)	Pixel Padding Value	PixelPaddingValue	US or SS	1
(0028,0121)	Pixel Padding Range Limit	PixelPaddingRangeLimit	US or SS	1
(0028,0200)	Image Location	ImageLocation	US	1	RET
(0028,0300)	Quality Control Image	QualityControlImage	CS	1
(0028,0301)	Burned In Annotation	BurnedInAnnotation	CS	1
(0028,0302)	Recognizable Visual Features	RecognizableVisualFeatures	CS	1
(0028,0303)	Longitudinal Temporal Information Modified	LongitudinalTemporalInformationModified	CS	1
(0028,0400)	Transform Label	TransformLabel	LO	1	RET
(0028,0401)	Transform Version Number	TransformVersionNumber	LO	1	RET
(0028,0402)	Number of Transform Steps	NumberOfTransformSteps	US	1	RET
(0028,0403)	Sequence of Compressed Data	SequenceOfCompressedData	LO	1-n	RET
(0028,0404)	Details of Coefficients	DetailsOfCoefficients	AT	1-n	RET
(0028,04x0)	Rows For Nth Order Coefficients	RowsForNthOrderCoefficients	US	1	RET
(0028,04x1)	Columns For Nth Order Coefficients	ColumnsForNthOrderCoefficients	US	1	RET
(0028,04x2)	Coefficient Coding	CoefficientCoding	LO	1-n	RET
(0028,04x3)	Coefficient Coding Pointers	CoefficientCodingPointers	AT	1-n	RET
(0028,0700)	DCT Label	DCTLabel	LO	1	RET
(0028,0701)	Data Block Description	DataBlockDescription	CS	1-n	RET
(0028,0702)	Data Block	DataBlock	AT	1-n	RET
(0028,0710)	Normalization Factor Format	NormalizationFactorFormat	US	1	RET
(0028,0720)	Zonal Map Number Format	ZonalMapNumberFormat	US	1	RET
(0028,0721)	Zonal Map Location	ZonalMapLocation	AT	1-n	RET
(0028,0722)	Zonal Map Format	ZonalMapFormat	US	1	RET
(0028,0730)	Adaptive Map Format	AdaptiveMapFormat	US	1	RET
(0028,0740)	Code Number Format	CodeNumberFormat	US	1	RET
(0028,08x0)	Code Label	CodeLabel	CS	1-n	RET
(0028,08x2)	Number of Tables	NumberOfTables	US	1	RET
(0028,08x3)	Code Table Location	CodeTableLocation	AT	1-n	RET
(0028,08x4)	Bits For Code Word	BitsForCodeWord	US	1	RET
(0028,08x8)	Image Data Location	ImageDataLocation	AT	1-n	RET
(0028,0A02)	Pixel Spacing Calibration Type	PixelSpacingCalibrationType	CS	1
(0028,0A04)	Pixel Spacing Calibration Description	PixelSpacingCalibrationDescription	LO	1
(0028,1040)	Pixel Intensity Relationship	PixelIntensityRelationship	CS	1
(0028,1041)	Pixel Intensity Relationship Sign	PixelIntensityRelationshipSign	SS	1
(0028,1050)	Window Center	WindowCenter	DS	1-n
(0028,1051)	Window Width	WindowWidth	DS	1-n
(0028,1052)	Rescale Intercept	RescaleIntercept	DS	1
(0028,1053)	Rescale Slope	RescaleSlope	DS	1
(0028,1054)	Rescale Type	RescaleType	LO	1
(0028,1055)	Window Center & Width Explanation	WindowCenterWidthExplanation	LO	1-n
(0028,1056)	VOI LUT Function	VOILUTFunction	CS	1
(0028,1080)	Gray Scale	GrayScale	CS	1	RET
(0028,1090)	Recommended Viewing Mode	RecommendedViewingMode	CS	1
(0028,1100)	Gray Lookup Table Descriptor	GrayLookupTableDescriptor	US or SS	3	RET
(0028,1101)	Red Palette Color Lookup Table Descriptor	RedPaletteColorLookupTableDescriptor	US or SS	3
(0028,1102)	Green Palette Color Lookup Table Descriptor	GreenPaletteColorLookupTableDescriptor	US or SS	3
(0028,1103)	Blue Palette Color Lookup Table Descriptor	BluePaletteColorLookupTableDescriptor	US or SS	3
(0028,1104)	Alpha Palette Color Lookup Table Descriptor	AlphaPaletteColorLookupTableDescriptor	US	3
(0028,1111)	Large Red Palette Color Lookup Table Descriptor	LargeRedPaletteColorLookupTableDescriptor	US or SS	4	RET
(0028,1112)	Large Green Palette Color Lookup Table Descriptor	LargeGreenPaletteColorLookupTableDescriptor	US or SS	4	RET
(0028,1113)	Large Blue Palette Color Lookup Table Descriptor	LargeBluePaletteColorLookupTableDescriptor	US or SS	4	RET
(0028,1199)	Palette Color Lookup Table UID	PaletteColorLookupTableUID	UI	1
(0028,1200)	Gray Lookup Table Data	GrayLookupTableData	US or SS or OW	1-n 1	RET
(0028,1201)	Red Palette Color Lookup Table Data	RedPaletteColorLookupTableData	OW	1
(0028,1202)	Green Palette Color Lookup Table Data	GreenPaletteColorLookupTableData	OW	1
(0028,1203)	Blue Palette Color Lookup Table Data	BluePaletteColorLookupTableData	OW	1
(0028,1204)	Alpha Palette Color Lookup Table Data	AlphaPaletteColorLookupTableData	OW	1
(0028,1211)	Large Red Palette Color Lookup Table Data	LargeRedPaletteColorLookupTableData	OW	1	RET
(0028,1212)	Large Green Palette Color Lookup Table Data	LargeGreenPaletteColorLookupTableData	OW	1	RET
(0028,1213)	Large Blue Palette Color Lookup Table Data	LargeBluePaletteColorLookupTableData	OW	1	RET
(0028,1214)	Large Palette Color Lookup Table UID	LargePaletteColorLookupTableUID	UI	1	RET
(0028,1221)	Segmented Red Palette Color Lookup Table Data	SegmentedRedPaletteColorLookupTableData	OW	1
(0028,1222)	Segmented Green Palette Color Lookup Table Data	SegmentedGreenPaletteColorLookupTableData	OW	1
(0028,1223)	Segmented Blue Palette Color Lookup Table Data	SegmentedBluePaletteColorLookupTableData	OW	1
(0028,1300)	Breast Implant Present	BreastImplantPresent	CS	1
(0028,1350)	Partial View	PartialView	CS	1
(0028,1351)	Partial View Description	PartialViewDescription	ST	1
(0028,1352)	Partial View Code Sequence	PartialViewCodeSequence	SQ	1
(0028,135A)	Spatial Locations Preserved	SpatialLocationsPreserved	CS	1
(0028,1401)	Data Frame Assignment Sequence	DataFrameAssignmentSequence	SQ	1
(0028,1402)	Data Path Assignment	DataPathAssignment	CS	1
(0028,1403)	Bits Mapped to Color Lookup Table	BitsMappedToColorLookupTable	US	1
(0028,1404)	Blending LUT 1 Sequence	BlendingLUT1Sequence	SQ	1
(0028,1405)	Blending LUT 1 Transfer Function	BlendingLUT1TransferFunction	CS	1
(0028,1406)	Blending Weight Constant	BlendingWeightConstant	FD	1
(0028,1407)	Blending Lookup Table Descriptor	BlendingLookupTableDescriptor	US	3
(0028,1408)	Blending Lookup Table Data	BlendingLookupTableData	OW	1
(0028,140B)	Enhanced Palette Color Lookup Table Sequence	EnhancedPaletteColorLookupTableSequence	SQ	1
(0028,140C)	Blending LUT 2 Sequence	BlendingLUT2Sequence	SQ	1
(0028,140D)	Blending LUT 2 Transfer Function	BlendingLUT2TransferFunction	CS	1
(0028,140E)	Data Path ID	DataPathID	CS	1
(0028,140F)	RGB LUT Transfer Function	RGBLUTTransferFunction	CS	1
(0028,1410)	Alpha LUT Transfer Function	AlphaLUTTransferFunction	CS	1
(0028,2000)	ICC Profile	ICCProfile	OB	1
(0028,2110)	Lossy Image Compression	LossyImageCompression	CS	1
(0028,2112)	Lossy Image Compression Ratio	LossyImageCompressionRatio	DS	1-n
(0028,2114)	Lossy Image Compression Method	LossyImageCompressionMethod	CS	1-n
(0028,3000)	Modality LUT Sequence	ModalityLUTSequence	SQ	1
(0028,3002)	LUT Descriptor	LUTDescriptor	US or SS	3
(0028,3003)	LUT Explanation	LUTExplanation	LO	1
(0028,3004)	Modality LUT Type	ModalityLUTType	LO	1
(0028,3006)	LUT Data	LUTData	US or OW	1-n 1
(0028,3010)	VOI LUT Sequence	VOILUTSequence	SQ	1
(0028,3110)	Softcopy VOI LUT Sequence	SoftcopyVOILUTSequence	SQ	1
(0028,4000)	Image Presentation Comments	ImagePresentationComments	LT	1	RET
(0028,5000)	Bi-Plane Acquisition Sequence	BiPlaneAcquisitionSequence	SQ	1	RET
(0028,6010)	Representative Frame Number	RepresentativeFrameNumber	US	1
(0028,6020)	Frame Numbers of Interest (FOI)	FrameNumbersOfInterest	US	1-n
(0028,6022)	Frame of Interest Description	FrameOfInterestDescription	LO	1-n
(0028,6023)	Frame of Interest Type	FrameOfInterestType	CS	1-n
(0028,6030)	Mask Pointer(s)	MaskPointers	US	1-n	RET
(0028,6040)	R Wave Pointer	RWavePointer	US	1-n
(0028,6100)	Mask Subtraction Sequence	MaskSubtractionSequence	SQ	1
(0028,6101)	Mask Operation	MaskOperation	CS	1
(0028,6102)	Applicable Frame Range	ApplicableFrameRange	US	2-2n
(0028,6110)	Mask Frame Numbers	MaskFrameNumbers	US	1-n
(0028,6112)	Contrast Frame Averaging	ContrastFrameAveraging	US	1
(0028,6114)	Mask Sub-pixel Shift	MaskSubPixelShift	FL	2
(0028,6120)	TID Offset	TIDOffset	SS	1
(0028,6190)	Mask Operation Explanation	MaskOperationExplanation	ST	1
(0028,7FE0)	Pixel Data Provider URL	PixelDataProviderURL	UT	1
(0028,9001)	Data Point Rows	DataPointRows	UL	1
(0028,9002)	Data Point Columns	DataPointColumns	UL	1
(0028,9003)	Signal Domain Columns	SignalDomainColumns	CS	1
(0028,9099)	Largest Monochrome Pixel Value	LargestMonochromePixelValue	US	1	RET
(0028,9108)	Data Representation	DataRepresentation	CS	1
(0028,9110)	Pixel Measures Sequence	PixelMeasuresSequence	SQ	1
(0028,9132)	Frame VOI LUT Sequence	FrameVOILUTSequence	SQ	1
(0028,9145)	Pixel Value Transformation Sequence	PixelValueTransformationSequence	SQ	1
(0028,9235)	Signal Domain Rows	SignalDomainRows	CS	1
(0028,9411)	Display Filter Percentage	DisplayFilterPercentage	FL	1
(0028,9415)	Frame Pixel Shift Sequence	FramePixelShiftSequence	SQ	1
(0028,9416)	Subtraction Item ID	SubtractionItemID	US	1
(0028,9422)	Pixel Intensity Relationship LUT Sequence	PixelIntensityRelationshipLUTSequence	SQ	1
(0028,9443)	Frame Pixel Data Properties Sequence	FramePixelDataPropertiesSequence	SQ	1
(0028,9444)	Geometrical Properties	GeometricalProperties	CS	1
(0028,9445)	Geometric Maximum Distortion	GeometricMaximumDistortion	FL	1
(0028,9446)	Image Processing Applied	ImageProcessingApplied	CS	1-n
(0028,9454)	Mask Selection Mode	MaskSelectionMode	CS	1
(0028,9474)	LUT Function	LUTFunction	CS	1
(0028,9478)	Mask Visibility Percentage	MaskVisibilityPercentage	FL	1
(0028,9501)	Pixel Shift Sequence	PixelShiftSequence	SQ	1
(0028,9502)	Region Pixel Shift Sequence	RegionPixelShiftSequence	SQ	1
(0028,9503)	Vertices of the Region	VerticesOfTheRegion	SS	2-2n
(0028,9505)	Multi-frame Presentation Sequence	MultiFramePresentationSequence	SQ	1
(0028,9506)	Pixel Shift Frame Range	PixelShiftFrameRange	US	2-2n
(0028,9507)	LUT Frame Range	LUTFrameRange	US	2-2n
(0028,9520)	Image to Equipment Mapping Matrix	ImageToEquipmentMappingMatrix	DS	16
(0028,9537)	Equipment Coordinate System Identification	EquipmentCoordinateSystemIdentification	CS	1
(0032,000A)	Study Status ID	StudyStatusID	CS	1	RET
(0032,000C)	Study Priority ID	StudyPriorityID	CS	1	RET
(0032,0012)	Study ID Issuer	StudyIDIssuer	LO	1	RET
(0032,0032)	Study Verified Date	StudyVerifiedDate	DA	1	RET
(0032,0033)	Study Verified Time	StudyVerifiedTime	TM	1	RET
(0032,0034)	Study Read Date	StudyReadDate	DA	1	RET
(0032,0035)	Study Read Time	StudyReadTime	TM	1	RET
(0032,1000)	Scheduled Study Start Date	ScheduledStudyStartDate	DA	1	RET
(0032,1001)	Scheduled Study Start Time	ScheduledStudyStartTime	TM	1	RET
(0032,1010)	Scheduled Study Stop Date	ScheduledStudyStopDate	DA	1	RET
(0032,1011)	Scheduled Study Stop Time	ScheduledStudyStopTime	TM	1	RET
(0032,1020)	Scheduled Study Location	ScheduledStudyLocation	LO	1	RET
(0032,1021)	Scheduled Study Location AE Title	ScheduledStudyLocationAETitle	AE	1-n	RET
(0032,1030)	Reason for Study	ReasonForStudy	LO	1	RET
(0032,1031)	Requesting Physician Identification Sequence	RequestingPhysicianIdentificationSequence	SQ	1
(0032,1032)	Requesting Physician	RequestingPhysician	PN	1
(0032,1033)	Requesting Service	RequestingService	LO	1
(0032,1034)	Requesting Service Code Sequence	RequestingServiceCodeSequence	SQ	1
(0032,1040)	Study Arrival Date	StudyArrivalDate	DA	1	RET
(0032,1041)	Study Arrival Time	StudyArrivalTime	TM	1	RET
(0032,1050)	Study Completion Date	StudyCompletionDate	DA	1	RET
(0032,1051)	Study Completion Time	StudyCompletionTime	TM	1	RET
(0032,1055)	Study Component Status ID	StudyComponentStatusID	CS	1	RET
(0032,1060)	Requested Procedure Description	RequestedProcedureDescription	LO	1
(0032,1064)	Requested Procedure Code Sequence	RequestedProcedureCodeSequence	SQ	1
(0032,1070)	Requested Contrast Agent	RequestedContrastAgent	LO	1
(0032,4000)	Study Comments	StudyComments	LT	1	RET
(0038,0004)	Referenced Patient Alias Sequence	ReferencedPatientAliasSequence	SQ	1
(0038,0008)	Visit Status ID	VisitStatusID	CS	1
(0038,0010)	Admission ID	AdmissionID	LO	1
(0038,0011)	Issuer of Admission ID	IssuerOfAdmissionID	LO	1	RET
(0038,0014)	Issuer of Admission ID Sequence	IssuerOfAdmissionIDSequence	SQ	1
(0038,0016)	Route of Admissions	RouteOfAdmissions	LO	1
(0038,001A)	Scheduled Admission Date	ScheduledAdmissionDate	DA	1	RET
(0038,001B)	Scheduled Admission Time	ScheduledAdmissionTime	TM	1	RET
(0038,001C)	Scheduled Discharge Date	ScheduledDischargeDate	DA	1	RET
(0038,001D)	Scheduled Discharge Time	ScheduledDischargeTime	TM	1	RET
(0038,001E)	Scheduled Patient Institution Residence	ScheduledPatientInstitutionResidence	LO	1	RET
(0038,0020)	Admitting Date	AdmittingDate	DA	1
(0038,0021)	Admitting Time	AdmittingTime	TM	1
(0038,0030)	Discharge Date	DischargeDate	DA	1	RET
(0038,0032)	Discharge Time	DischargeTime	TM	1	RET
(0038,0040)	Discharge Diagnosis Description	DischargeDiagnosisDescription	LO	1	RET
(0038,0044)	Discharge Diagnosis Code Sequence	DischargeDiagnosisCodeSequence	SQ	1	RET
(0038,0050)	Special Needs	SpecialNeeds	LO	1
(0038,0060)	Service Episode ID	ServiceEpisodeID	LO	1
(0038,0061)	Issuer of Service Episode ID	IssuerOfServiceEpisodeID	LO	1	RET
(0038,0062)	Service Episode Description	ServiceEpisodeDescription	LO	1
(0038,0064)	Issuer of Service Episode ID Sequence	IssuerOfServiceEpisodeIDSequence	SQ	1
(0038,0100)	Pertinent Documents Sequence	PertinentDocumentsSequence	SQ	1
(0038,0300)	Current Patient Location	CurrentPatientLocation	LO	1
(0038,0400)	Patient’s Institution Residence	PatientInstitutionResidence	LO	1
(0038,0500)	Patient State	PatientState	LO	1
(0038,0502)	Patient Clinical Trial Participation Sequence	PatientClinicalTrialParticipationSequence	SQ	1
(0038,4000)	Visit Comments	VisitComments	LT	1
(003A,0004)	Waveform Originality	WaveformOriginality	CS	1
(003A,0005)	Number of Waveform Channels	NumberOfWaveformChannels	US	1
(003A,0010)	Number of Waveform Samples	NumberOfWaveformSamples	UL	1
(003A,001A)	Sampling Frequency	SamplingFrequency	DS	1
(003A,0020)	Multiplex Group Label	MultiplexGroupLabel	SH	1
(003A,0200)	Channel Definition Sequence	ChannelDefinitionSequence	SQ	1
(003A,0202)	Waveform Channel Number	WaveformChannelNumber	IS	1
(003A,0203)	Channel Label	ChannelLabel	SH	1
(003A,0205)	Channel Status	ChannelStatus	CS	1-n
(003A,0208)	Channel Source Sequence	ChannelSourceSequence	SQ	1
(003A,0209)	Channel Source Modifiers Sequence	ChannelSourceModifiersSequence	SQ	1
(003A,020A)	Source Waveform Sequence	SourceWaveformSequence	SQ	1
(003A,020C)	Channel Derivation Description	ChannelDerivationDescription	LO	1
(003A,0210)	Channel Sensitivity	ChannelSensitivity	DS	1
(003A,0211)	Channel Sensitivity Units Sequence	ChannelSensitivityUnitsSequence	SQ	1
(003A,0212)	Channel Sensitivity Correction Factor	ChannelSensitivityCorrectionFactor	DS	1
(003A,0213)	Channel Baseline	ChannelBaseline	DS	1
(003A,0214)	Channel Time Skew	ChannelTimeSkew	DS	1
(003A,0215)	Channel Sample Skew	ChannelSampleSkew	DS	1
(003A,0218)	Channel Offset	ChannelOffset	DS	1
(003A,021A)	Waveform Bits Stored	WaveformBitsStored	US	1
(003A,0220)	Filter Low Frequency	FilterLowFrequency	DS	1
(003A,0221)	Filter High Frequency	FilterHighFrequency	DS	1
(003A,0222)	Notch Filter Frequency	NotchFilterFrequency	DS	1
(003A,0223)	Notch Filter Bandwidth	NotchFilterBandwidth	DS	1
(003A,0230)	Waveform Data Display Scale	WaveformDataDisplayScale	FL	1
(003A,0231)	Waveform Display Background CIELab Value	WaveformDisplayBackgroundCIELabValue	US	3
(003A,0240)	Waveform Presentation Group Sequence	WaveformPresentationGroupSequence	SQ	1
(003A,0241)	Presentation Group Number	PresentationGroupNumber	US	1
(003A,0242)	Channel Display Sequence	ChannelDisplaySequence	SQ	1
(003A,0244)	Channel Recommended Display CIELab Value	ChannelRecommendedDisplayCIELabValue	US	3
(003A,0245)	Channel Position	ChannelPosition	FL	1
(003A,0246)	Display Shading Flag	DisplayShadingFlag	CS	1
(003A,0247)	Fractional Channel Display Scale	FractionalChannelDisplayScale	FL	1
(003A,0248)	Absolute Channel Display Scale	AbsoluteChannelDisplayScale	FL	1
(003A,0300)	Multiplexed Audio Channels Description Code Sequence	MultiplexedAudioChannelsDescriptionCodeSequence	SQ	1
(003A,0301)	Channel Identification Code	ChannelIdentificationCode	IS	1
(003A,0302)	Channel Mode	ChannelMode	CS	1
(0040,0001)	Scheduled Station AE Title	ScheduledStationAETitle	AE	1-n
(0040,0002)	Scheduled Procedure Step Start Date	ScheduledProcedureStepStartDate	DA	1
(0040,0003)	Scheduled Procedure Step Start Time	ScheduledProcedureStepStartTime	TM	1
(0040,0004)	Scheduled Procedure Step End Date	ScheduledProcedureStepEndDate	DA	1
(0040,0005)	Scheduled Procedure Step End Time	ScheduledProcedureStepEndTime	TM	1
(0040,0006)	Scheduled Performing Physician’s Name	ScheduledPerformingPhysicianName	PN	1
(0040,0007)	Scheduled Procedure Step Description	ScheduledProcedureStepDescription	LO	1
(0040,0008)	Scheduled Protocol Code Sequence	ScheduledProtocolCodeSequence	SQ	1
(0040,0009)	Scheduled Procedure Step ID	ScheduledProcedureStepID	SH	1
(0040,000A)	Stage Code Sequence	StageCodeSequence	SQ	1
(0040,000B)	Scheduled Performing Physician Identification Sequence	ScheduledPerformingPhysicianIdentificationSequence	SQ	1
(0040,0010)	Scheduled Station Name	ScheduledStationName	SH	1-n
(0040,0011)	Scheduled Procedure Step Location	ScheduledProcedureStepLocation	SH	1
(0040,0012)	Pre-Medication	PreMedication	LO	1
(0040,0020)	Scheduled Procedure Step Status	ScheduledProcedureStepStatus	CS	1
(0040,0026)	Order Placer Identifier Sequence	OrderPlacerIdentifierSequence	SQ	1
(0040,0027)	Order Filler Identifier Sequence	OrderFillerIdentifierSequence	SQ	1
(0040,0031)	Local Namespace Entity ID	LocalNamespaceEntityID	UT	1
(0040,0032)	Universal Entity ID	UniversalEntityID	UT	1
(0040,0033)	Universal Entity ID Type	UniversalEntityIDType	CS	1
(0040,0035)	Identifier Type Code	IdentifierTypeCode	CS	1
(0040,0036)	Assigning Facility Sequence	AssigningFacilitySequence	SQ	1
(0040,0039)	Assigning Jurisdiction Code Sequence	AssigningJurisdictionCodeSequence	SQ	1
(0040,003A)	Assigning Agency or Department Code Sequence	AssigningAgencyOrDepartmentCodeSequence	SQ	1
(0040,0100)	Scheduled Procedure Step Sequence	ScheduledProcedureStepSequence	SQ	1
(0040,0220)	Referenced Non-Image Composite SOP Instance Sequence	ReferencedNonImageCompositeSOPInstanceSequence	SQ	1
(0040,0241)	Performed Station AE Title	PerformedStationAETitle	AE	1
(0040,0242)	Performed Station Name	PerformedStationName	SH	1
(0040,0243)	Performed Location	PerformedLocation	SH	1
(0040,0244)	Performed Procedure Step Start Date	PerformedProcedureStepStartDate	DA	1
(0040,0245)	Performed Procedure Step Start Time	PerformedProcedureStepStartTime	TM	1
(0040,0250)	Performed Procedure Step End Date	PerformedProcedureStepEndDate	DA	1
(0040,0251)	Performed Procedure Step End Time	PerformedProcedureStepEndTime	TM	1
(0040,0252)	Performed Procedure Step Status	PerformedProcedureStepStatus	CS	1
(0040,0253)	Performed Procedure Step ID	PerformedProcedureStepID	SH	1
(0040,0254)	Performed Procedure Step Description	PerformedProcedureStepDescription	LO	1
(0040,0255)	Performed Procedure Type Description	PerformedProcedureTypeDescription	LO	1
(0040,0260)	Performed Protocol Code Sequence	PerformedProtocolCodeSequence	SQ	1
(0040,0261)	Performed Protocol Type	PerformedProtocolType	CS	1
(0040,0270)	Scheduled Step Attributes Sequence	ScheduledStepAttributesSequence	SQ	1
(0040,0275)	Request Attributes Sequence	RequestAttributesSequence	SQ	1
(0040,0280)	Comments on the Performed Procedure Step	CommentsOnThePerformedProcedureStep	ST	1
(0040,0281)	Performed Procedure Step Discontinuation Reason Code Sequence	PerformedProcedureStepDiscontinuationReasonCodeSequence	SQ	1
(0040,0293)	Quantity Sequence	QuantitySequence	SQ	1
(0040,0294)	Quantity	Quantity	DS	1
(0040,0295)	Measuring Units Sequence	MeasuringUnitsSequence	SQ	1
(0040,0296)	Billing Item Sequence	BillingItemSequence	SQ	1
(0040,0300)	Total Time of Fluoroscopy	TotalTimeOfFluoroscopy	US	1
(0040,0301)	Total Number of Exposures	TotalNumberOfExposures	US	1
(0040,0302)	Entrance Dose	EntranceDose	US	1
(0040,0303)	Exposed Area	ExposedArea	US	1-2
(0040,0306)	Distance Source to Entrance	DistanceSourceToEntrance	DS	1
(0040,0307)	Distance Source to Support	DistanceSourceToSupport	DS	1	RET
(0040,030E)	Exposure Dose Sequence	ExposureDoseSequence	SQ	1
(0040,0310)	Comments on Radiation Dose	CommentsOnRadiationDose	ST	1
(0040,0312)	X-Ray Output	XRayOutput	DS	1
(0040,0314)	Half Value Layer	HalfValueLayer	DS	1
(0040,0316)	Organ Dose	OrganDose	DS	1
(0040,0318)	Organ Exposed	OrganExposed	CS	1
(0040,0320)	Billing Procedure Step Sequence	BillingProcedureStepSequence	SQ	1
(0040,0321)	Film Consumption Sequence	FilmConsumptionSequence	SQ	1
(0040,0324)	Billing Supplies and Devices Sequence	BillingSuppliesAndDevicesSequence	SQ	1
(0040,0330)	Referenced Procedure Step Sequence	ReferencedProcedureStepSequence	SQ	1	RET
(0040,0340)	Performed Series Sequence	PerformedSeriesSequence	SQ	1
(0040,0400)	Comments on the Scheduled Procedure Step	CommentsOnTheScheduledProcedureStep	LT	1
(0040,0440)	Protocol Context Sequence	ProtocolContextSequence	SQ	1
(0040,0441)	Content Item Modifier Sequence	ContentItemModifierSequence	SQ	1
(0040,0500)	Scheduled Specimen Sequence	ScheduledSpecimenSequence	SQ	1
(0040,050A)	Specimen Accession Number	SpecimenAccessionNumber	LO	1	RET
(0040,0512)	Container Identifier	ContainerIdentifier	LO	1
(0040,0513)	Issuer of the Container Identifier Sequence	IssuerOfTheContainerIdentifierSequence	SQ	1
(0040,0515)	Alternate Container Identifier Sequence	AlternateContainerIdentifierSequence	SQ	1
(0040,0518)	Container Type Code Sequence	ContainerTypeCodeSequence	SQ	1
(0040,051A)	Container Description	ContainerDescription	LO	1
(0040,0520)	Container Component Sequence	ContainerComponentSequence	SQ	1
(0040,0550)	Specimen Sequence	SpecimenSequence	SQ	1	RET
(0040,0551)	Specimen Identifier	SpecimenIdentifier	LO	1
(0040,0552)	Specimen Description Sequence (Trial)	SpecimenDescriptionSequenceTrial	SQ	1	RET
(0040,0553)	Specimen Description (Trial)	SpecimenDescriptionTrial	ST	1	RET
(0040,0554)	Specimen UID	SpecimenUID	UI	1
(0040,0555)	Acquisition Context Sequence	AcquisitionContextSequence	SQ	1
(0040,0556)	Acquisition Context Description	AcquisitionContextDescription	ST	1
(0040,059A)	Specimen Type Code Sequence	SpecimenTypeCodeSequence	SQ	1
(0040,0560)	Specimen Description Sequence	SpecimenDescriptionSequence	SQ	1
(0040,0562)	Issuer of the Specimen Identifier Sequence	IssuerOfTheSpecimenIdentifierSequence	SQ	1
(0040,0600)	Specimen Short Description	SpecimenShortDescription	LO	1
(0040,0602)	Specimen Detailed Description	SpecimenDetailedDescription	UT	1
(0040,0610)	Specimen Preparation Sequence	SpecimenPreparationSequence	SQ	1
(0040,0612)	Specimen Preparation Step Content Item Sequence	SpecimenPreparationStepContentItemSequence	SQ	1
(0040,0620)	Specimen Localization Content Item Sequence	SpecimenLocalizationContentItemSequence	SQ	1
(0040,06FA)	Slide Identifier	SlideIdentifier	LO	1	RET
(0040,071A)	Image Center Point Coordinates Sequence	ImageCenterPointCoordinatesSequence	SQ	1
(0040,072A)	X Offset in Slide Coordinate System	XOffsetInSlideCoordinateSystem	DS	1
(0040,073A)	Y Offset in Slide Coordinate System	YOffsetInSlideCoordinateSystem	DS	1
(0040,074A)	Z Offset in Slide Coordinate System	ZOffsetInSlideCoordinateSystem	DS	1
(0040,08D8)	Pixel Spacing Sequence	PixelSpacingSequence	SQ	1	RET
(0040,08DA)	Coordinate System Axis Code Sequence	CoordinateSystemAxisCodeSequence	SQ	1	RET
(0040,08EA)	Measurement Units Code Sequence	MeasurementUnitsCodeSequence	SQ	1
(0040,09F8)	Vital Stain Code Sequence (Trial)	VitalStainCodeSequenceTrial	SQ	1	RET
(0040,1001)	Requested Procedure ID	RequestedProcedureID	SH	1
(0040,1002)	Reason for the Requested Procedure	ReasonForTheRequestedProcedure	LO	1
(0040,1003)	Requested Procedure Priority	RequestedProcedurePriority	SH	1
(0040,1004)	Patient Transport Arrangements	PatientTransportArrangements	LO	1
(0040,1005)	Requested Procedure Location	RequestedProcedureLocation	LO	1
(0040,1006)	Placer Order Number / Procedure	PlacerOrderNumberProcedure	SH	1	RET
(0040,1007)	Filler Order Number / Procedure	FillerOrderNumberProcedure	SH	1	RET
(0040,1008)	Confidentiality Code	ConfidentialityCode	LO	1
(0040,1009)	Reporting Priority	ReportingPriority	SH	1
(0040,100A)	Reason for Requested Procedure Code Sequence	ReasonForRequestedProcedureCodeSequence	SQ	1
(0040,1010)	Names of Intended Recipients of Results	NamesOfIntendedRecipientsOfResults	PN	1-n
(0040,1011)	Intended Recipients of Results Identification Sequence	IntendedRecipientsOfResultsIdentificationSequence	SQ	1
(0040,1012)	Reason For Performed Procedure Code Sequence	ReasonForPerformedProcedureCodeSequence	SQ	1
(0040,1060)	Requested Procedure Description (Trial)	RequestedProcedureDescriptionTrial	LO	1	RET
(0040,1101)	Person Identification Code Sequence	PersonIdentificationCodeSequence	SQ	1
(0040,1102)	Person’s Address	PersonAddress	ST	1
(0040,1103)	Person’s Telephone Numbers	PersonTelephoneNumbers	LO	1-n
(0040,1400)	Requested Procedure Comments	RequestedProcedureComments	LT	1
(0040,2001)	Reason for the Imaging Service Request	ReasonForTheImagingServiceRequest	LO	1	RET
(0040,2004)	Issue Date of Imaging Service Request	IssueDateOfImagingServiceRequest	DA	1
(0040,2005)	Issue Time of Imaging Service Request	IssueTimeOfImagingServiceRequest	TM	1
(0040,2006)	Placer Order Number / Imaging Service Request (Retired)	PlacerOrderNumberImagingServiceRequestRetired	SH	1	RET
(0040,2007)	Filler Order Number / Imaging Service Request (Retired)	FillerOrderNumberImagingServiceRequestRetired	SH	1	RET
(0040,2008)	Order Entered By	OrderEnteredBy	PN	1
(0040,2009)	Order Enterer’s Location	OrderEntererLocation	SH	1
(0040,2010)	Order Callback Phone Number	OrderCallbackPhoneNumber	SH	1
(0040,2016)	Placer Order Number / Imaging Service Request	PlacerOrderNumberImagingServiceRequest	LO	1
(0040,2017)	Filler Order Number / Imaging Service Request	FillerOrderNumberImagingServiceRequest	LO	1
(0040,2400)	Imaging Service Request Comments	ImagingServiceRequestComments	LT	1
(0040,3001)	Confidentiality Constraint on Patient Data Description	ConfidentialityConstraintOnPatientDataDescription	LO	1
(0040,4001)	General Purpose Scheduled Procedure Step Status	GeneralPurposeScheduledProcedureStepStatus	CS	1
(0040,4002)	General Purpose Performed Procedure Step Status	GeneralPurposePerformedProcedureStepStatus	CS	1
(0040,4003)	General Purpose Scheduled Procedure Step Priority	GeneralPurposeScheduledProcedureStepPriority	CS	1
(0040,4004)	Scheduled Processing Applications Code Sequence	ScheduledProcessingApplicationsCodeSequence	SQ	1
(0040,4005)	Scheduled Procedure Step Start DateTime	ScheduledProcedureStepStartDateTime	DT	1
(0040,4006)	Multiple Copies Flag	MultipleCopiesFlag	CS	1
(0040,4007)	Performed Processing Applications Code Sequence	PerformedProcessingApplicationsCodeSequence	SQ	1
(0040,4009)	Human Performer Code Sequence	HumanPerformerCodeSequence	SQ	1
(0040,4010)	Scheduled Procedure Step Modification Date Time	ScheduledProcedureStepModificationDateTime	DT	1
(0040,4011)	Expected Completion Date Time	ExpectedCompletionDateTime	DT	1
(0040,4015)	Resulting General Purpose Performed Procedure Steps Sequence	ResultingGeneralPurposePerformedProcedureStepsSequence	SQ	1
(0040,4016)	Referenced General Purpose Scheduled Procedure Step Sequence	ReferencedGeneralPurposeScheduledProcedureStepSequence	SQ	1
(0040,4018)	Scheduled Workitem Code Sequence	ScheduledWorkitemCodeSequence	SQ	1
(0040,4019)	Performed Workitem Code Sequence	PerformedWorkitemCodeSequence	SQ	1
(0040,4020)	Input Availability Flag	InputAvailabilityFlag	CS	1
(0040,4021)	Input Information Sequence	InputInformationSequence	SQ	1
(0040,4022)	Relevant Information Sequence	RelevantInformationSequence	SQ	1
(0040,4023)	Referenced General Purpose Scheduled Procedure Step Transaction UID	ReferencedGeneralPurposeScheduledProcedureStepTransactionUID	UI	1
(0040,4025)	Scheduled Station Name Code Sequence	ScheduledStationNameCodeSequence	SQ	1
(0040,4026)	Scheduled Station Class Code Sequence	ScheduledStationClassCodeSequence	SQ	1
(0040,4027)	Scheduled Station Geographic Location Code Sequence	ScheduledStationGeographicLocationCodeSequence	SQ	1
(0040,4028)	Performed Station Name Code Sequence	PerformedStationNameCodeSequence	SQ	1
(0040,4029)	Performed Station Class Code Sequence	PerformedStationClassCodeSequence	SQ	1
(0040,4030)	Performed Station Geographic Location Code Sequence	PerformedStationGeographicLocationCodeSequence	SQ	1
(0040,4031)	Requested Subsequent Workitem Code Sequence	RequestedSubsequentWorkitemCodeSequence	SQ	1
(0040,4032)	Non-DICOM Output Code Sequence	NonDICOMOutputCodeSequence	SQ	1
(0040,4033)	Output Information Sequence	OutputInformationSequence	SQ	1
(0040,4034)	Scheduled Human Performers Sequence	ScheduledHumanPerformersSequence	SQ	1
(0040,4035)	Actual Human Performers Sequence	ActualHumanPerformersSequence	SQ	1
(0040,4036)	Human Performer’s Organization	HumanPerformerOrganization	LO	1
(0040,4037)	Human Performer’s Name	HumanPerformerName	PN	1
(0040,4040)	Raw Data Handling	RawDataHandling	CS	1
(0040,4041)	Input Readiness State	InputReadinessState	CS	1
(0040,4050)	Performed Procedure Step Start DateTime	PerformedProcedureStepStartDateTime	DT	1
(0040,4051)	Performed Procedure Step End DateTime	PerformedProcedureStepEndDateTime	DT	1
(0040,4052)	Procedure Step Cancellation DateTime	ProcedureStepCancellationDateTime	DT	1
(0040,8302)	Entrance Dose in mGy	EntranceDoseInmGy	DS	1
(0040,9094)	Referenced Image Real World Value Mapping Sequence	ReferencedImageRealWorldValueMappingSequence	SQ	1
(0040,9096)	Real World Value Mapping Sequence	RealWorldValueMappingSequence	SQ	1
(0040,9098)	Pixel Value Mapping Code Sequence	PixelValueMappingCodeSequence	SQ	1
(0040,9210)	LUT Label	LUTLabel	SH	1
(0040,9211)	Real World Value Last Value Mapped	RealWorldValueLastValueMapped	US or SS	1
(0040,9212)	Real World Value LUT Data	RealWorldValueLUTData	FD	1-n
(0040,9216)	Real World Value First Value Mapped	RealWorldValueFirstValueMapped	US or SS	1
(0040,9224)	Real World Value Intercept	RealWorldValueIntercept	FD	1
(0040,9225)	Real World Value Slope	RealWorldValueSlope	FD	1
(0040,A007)	Findings Flag (Trial)	FindingsFlagTrial	CS	1	RET
(0040,A010)	Relationship Type	RelationshipType	CS	1
(0040,A020)	Findings Sequence (Trial)	FindingsSequenceTrial	SQ	1	RET
(0040,A021)	Findings Group UID (Trial)	FindingsGroupUIDTrial	UI	1	RET
(0040,A022)	Referenced Findings Group UID (Trial)	ReferencedFindingsGroupUIDTrial	UI	1	RET
(0040,A023)	Findings Group Recording Date (Trial)	FindingsGroupRecordingDateTrial	DA	1	RET
(0040,A024)	Findings Group Recording Time (Trial)	FindingsGroupRecordingTimeTrial	TM	1	RET
(0040,A026)	Findings Source Category Code Sequence (Trial)	FindingsSourceCategoryCodeSequenceTrial	SQ	1	RET
(0040,A027)	Verifying Organization	VerifyingOrganization	LO	1
(0040,A028)	Documenting Organization Identifier Code Sequence (Trial)	DocumentingOrganizationIdentifierCodeSequenceTrial	SQ	1	RET
(0040,A030)	Verification Date Time	VerificationDateTime	DT	1
(0040,A032)	Observation Date Time	ObservationDateTime	DT	1
(0040,A040)	Value Type	ValueType	CS	1
(0040,A043)	Concept Name Code Sequence	ConceptNameCodeSequence	SQ	1
(0040,A047)	Measurement Precision Description (Trial)	MeasurementPrecisionDescriptionTrial	LO	1	RET
(0040,A050)	Continuity Of Content	ContinuityOfContent	CS	1
(0040,A057)	Urgency or Priority Alerts (Trial)	UrgencyOrPriorityAlertsTrial	CS	1-n	RET
(0040,A060)	Sequencing Indicator (Trial)	SequencingIndicatorTrial	LO	1	RET
(0040,A066)	Document Identifier Code Sequence (Trial)	DocumentIdentifierCodeSequenceTrial	SQ	1	RET
(0040,A067)	Document Author (Trial)	DocumentAuthorTrial	PN	1	RET
(0040,A068)	Document Author Identifier Code Sequence (Trial)	DocumentAuthorIdentifierCodeSequenceTrial	SQ	1	RET
(0040,A070)	Identifier Code Sequence (Trial)	IdentifierCodeSequenceTrial	SQ	1	RET
(0040,A073)	Verifying Observer Sequence	VerifyingObserverSequence	SQ	1
(0040,A074)	Object Binary Identifier (Trial)	ObjectBinaryIdentifierTrial	OB	1	RET
(0040,A075)	Verifying Observer Name	VerifyingObserverName	PN	1
(0040,A076)	Documenting Observer Identifier Code Sequence (Trial)	DocumentingObserverIdentifierCodeSequenceTrial	SQ	1	RET
(0040,A078)	Author Observer Sequence	AuthorObserverSequence	SQ	1
(0040,A07A)	Participant Sequence	ParticipantSequence	SQ	1
(0040,A07C)	Custodial Organization Sequence	CustodialOrganizationSequence	SQ	1
(0040,A080)	Participation Type	ParticipationType	CS	1
(0040,A082)	Participation DateTime	ParticipationDateTime	DT	1
(0040,A084)	Observer Type	ObserverType	CS	1
(0040,A085)	Procedure Identifier Code Sequence (Trial)	ProcedureIdentifierCodeSequenceTrial	SQ	1	RET
(0040,A088)	Verifying Observer Identification Code Sequence	VerifyingObserverIdentificationCodeSequence	SQ	1
(0040,A089)	Object Directory Binary Identifier (Trial)	ObjectDirectoryBinaryIdentifierTrial	OB	1	RET
(0040,A090)	Equivalent CDA Document Sequence	EquivalentCDADocumentSequence	SQ	1	RET
(0040,A0B0)	Referenced Waveform Channels	ReferencedWaveformChannels	US	2-2n
(0040,A110)	Date of Document or Verbal Transaction (Trial)	DateOfDocumentOrVerbalTransactionTrial	DA	1	RET
(0040,A112)	Time of Document Creation or Verbal Transaction (Trial)	TimeOfDocumentCreationOrVerbalTransactionTrial	TM	1	RET
(0040,A120)	DateTime	DateTime	DT	1
(0040,A121)	Date	Date	DA	1
(0040,A122)	Time	Time	TM	1
(0040,A123)	Person Name	PersonName	PN	1
(0040,A124)	UID	UID	UI	1
(0040,A125)	Report Status ID (Trial)	ReportStatusIDTrial	CS	2	RET
(0040,A130)	Temporal Range Type	TemporalRangeType	CS	1
(0040,A132)	Referenced Sample Positions	ReferencedSamplePositions	UL	1-n
(0040,A136)	Referenced Frame Numbers	ReferencedFrameNumbers	US	1-n
(0040,A138)	Referenced Time Offsets	ReferencedTimeOffsets	DS	1-n
(0040,A13A)	Referenced DateTime	ReferencedDateTime	DT	1-n
(0040,A160)	Text Value	TextValue	UT	1
(0040,A167)	Observation Category Code Sequence (Trial)	ObservationCategoryCodeSequenceTrial	SQ	1	RET
(0040,A168)	Concept Code Sequence	ConceptCodeSequence	SQ	1
(0040,A16A)	Bibliographic Citation (Trial)	BibliographicCitationTrial	ST	1	RET
(0040,A170)	Purpose of Reference Code Sequence	PurposeOfReferenceCodeSequence	SQ	1
(0040,A171)	Observation UID (Trial)	ObservationUIDTrial	UI	1	RET
(0040,A172)	Referenced Observation UID (Trial)	ReferencedObservationUIDTrial	UI	1	RET
(0040,A173)	Referenced Observation Class (Trial)	ReferencedObservationClassTrial	CS	1	RET
(0040,A174)	Referenced Object Observation Class (Trial)	ReferencedObjectObservationClassTrial	CS	1	RET
(0040,A180)	Annotation Group Number	AnnotationGroupNumber	US	1
(0040,A192)	Observation Date (Trial)	ObservationDateTrial	DA	1	RET
(0040,A193)	Observation Time (Trial)	ObservationTimeTrial	TM	1	RET
(0040,A194)	Measurement Automation (Trial)	MeasurementAutomationTrial	CS	1	RET
(0040,A195)	Modifier Code Sequence	ModifierCodeSequence	SQ	1
(0040,A224)	Identification Description (Trial)	IdentificationDescriptionTrial	ST	1	RET
(0040,A290)	Coordinates Set Geometric Type (Trial)	CoordinatesSetGeometricTypeTrial	CS	1	RET
(0040,A296)	Algorithm Code Sequence (Trial)	AlgorithmCodeSequenceTrial	SQ	1	RET
(0040,A297)	Algorithm Description (Trial)	AlgorithmDescriptionTrial	ST	1	RET
(0040,A29A)	Pixel Coordinates Set (Trial)	PixelCoordinatesSetTrial	SL	2-2n	RET
(0040,A300)	Measured Value Sequence	MeasuredValueSequence	SQ	1
(0040,A301)	Numeric Value Qualifier Code Sequence	NumericValueQualifierCodeSequence	SQ	1
(0040,A307)	Current Observer (Trial)	CurrentObserverTrial	PN	1	RET
(0040,A30A)	Numeric Value	NumericValue	DS	1-n
(0040,A313)	Referenced Accession Sequence (Trial)	ReferencedAccessionSequenceTrial	SQ	1	RET
(0040,A33A)	Report Status Comment (Trial)	ReportStatusCommentTrial	ST	1	RET
(0040,A340)	Procedure Context Sequence (Trial)	ProcedureContextSequenceTrial	SQ	1	RET
(0040,A352)	Verbal Source (Trial)	VerbalSourceTrial	PN	1	RET
(0040,A353)	Address (Trial)	AddressTrial	ST	1	RET
(0040,A354)	Telephone Number (Trial)	TelephoneNumberTrial	LO	1	RET
(0040,A358)	Verbal Source Identifier Code Sequence (Trial)	VerbalSourceIdentifierCodeSequenceTrial	SQ	1	RET
(0040,A360)	Predecessor Documents Sequence	PredecessorDocumentsSequence	SQ	1
(0040,A370)	Referenced Request Sequence	ReferencedRequestSequence	SQ	1
(0040,A372)	Performed Procedure Code Sequence	PerformedProcedureCodeSequence	SQ	1
(0040,A375)	Current Requested Procedure Evidence Sequence	CurrentRequestedProcedureEvidenceSequence	SQ	1
(0040,A380)	Report Detail Sequence (Trial)	ReportDetailSequenceTrial	SQ	1	RET
(0040,A385)	Pertinent Other Evidence Sequence	PertinentOtherEvidenceSequence	SQ	1
(0040,A390)	HL7 Structured Document Reference Sequence	HL7StructuredDocumentReferenceSequence	SQ	1
(0040,A402)	Observation Subject UID (Trial)	ObservationSubjectUIDTrial	UI	1	RET
(0040,A403)	Observation Subject Class (Trial)	ObservationSubjectClassTrial	CS	1	RET
(0040,A404)	Observation Subject Type Code Sequence (Trial)	ObservationSubjectTypeCodeSequenceTrial	SQ	1	RET
(0040,A491)	Completion Flag	CompletionFlag	CS	1
(0040,A492)	Completion Flag Description	CompletionFlagDescription	LO	1
(0040,A493)	Verification Flag	VerificationFlag	CS	1
(0040,A494)	Archive Requested	ArchiveRequested	CS	1
(0040,A496)	Preliminary Flag	PreliminaryFlag	CS	1
(0040,A504)	Content Template Sequence	ContentTemplateSequence	SQ	1
(0040,A525)	Identical Documents Sequence	IdenticalDocumentsSequence	SQ	1
(0040,A600)	Observation Subject Context Flag (Trial)	ObservationSubjectContextFlagTrial	CS	1	RET
(0040,A601)	Observer Context Flag (Trial)	ObserverContextFlagTrial	CS	1	RET
(0040,A603)	Procedure Context Flag (Trial)	ProcedureContextFlagTrial	CS	1	RET
(0040,A730)	Content Sequence	ContentSequence	SQ	1
(0040,A731)	Relationship Sequence (Trial)	RelationshipSequenceTrial	SQ	1	RET
(0040,A732)	Relationship Type Code Sequence (Trial)	RelationshipTypeCodeSequenceTrial	SQ	1	RET
(0040,A744)	Language Code Sequence (Trial)	LanguageCodeSequenceTrial	SQ	1	RET
(0040,A992)	Uniform Resource Locator (Trial)	UniformResourceLocatorTrial	ST	1	RET
(0040,B020)	Waveform Annotation Sequence	WaveformAnnotationSequence	SQ	1
(0040,DB00)	Template Identifier	TemplateIdentifier	CS	1
(0040,DB06)	Template Version	TemplateVersion	DT	1	RET
(0040,DB07)	Template Local Version	TemplateLocalVersion	DT	1	RET
(0040,DB0B)	Template Extension Flag	TemplateExtensionFlag	CS	1	RET
(0040,DB0C)	Template Extension Organization UID	TemplateExtensionOrganizationUID	UI	1	RET
(0040,DB0D)	Template Extension Creator UID	TemplateExtensionCreatorUID	UI	1	RET
(0040,DB73)	Referenced Content Item Identifier	ReferencedContentItemIdentifier	UL	1-n
(0040,E001)	HL7 Instance Identifier	HL7InstanceIdentifier	ST	1
(0040,E004)	HL7 Document Effective Time	HL7DocumentEffectiveTime	DT	1
(0040,E006)	HL7 Document Type Code Sequence	HL7DocumentTypeCodeSequence	SQ	1
(0040,E008)	Document Class Code Sequence	DocumentClassCodeSequence	SQ	1
(0040,E010)	Retrieve URI	RetrieveURI	UT	1
(0040,E011)	Retrieve Location UID	RetrieveLocationUID	UI	1
(0040,E020)	Type of Instances	TypeOfInstances	CS	1
(0040,E021)	DICOM Retrieval Sequence	DICOMRetrievalSequence	SQ	1
(0040,E022)	DICOM Media Retrieval Sequence	DICOMMediaRetrievalSequence	SQ	1
(0040,E023)	WADO Retrieval Sequence	WADORetrievalSequence	SQ	1
(0040,E024)	XDS Retrieval Sequence	XDSRetrievalSequence	SQ	1
(0040,E030)	Repository Unique ID	RepositoryUniqueID	UI	1
(0040,E031)	Home Community ID	HomeCommunityID	UI	1
(0042,0010)	Document Title	DocumentTitle	ST	1
(0042,0011)	Encapsulated Document	EncapsulatedDocument	OB	1
(0042,0012)	MIME Type of Encapsulated Document	MIMETypeOfEncapsulatedDocument	LO	1
(0042,0013)	Source Instance Sequence	SourceInstanceSequence	SQ	1
(0042,0014)	List of MIME Types	ListOfMIMETypes	LO	1-n
(0044,0001)	Product Package Identifier	ProductPackageIdentifier	ST	1
(0044,0002)	Substance Administration Approval	SubstanceAdministrationApproval	CS	1
(0044,0003)	Approval Status Further Description	ApprovalStatusFurtherDescription	LT	1
(0044,0004)	Approval Status DateTime	ApprovalStatusDateTime	DT	1
(0044,0007)	Product Type Code Sequence	ProductTypeCodeSequence	SQ	1
(0044,0008)	Product Name	ProductName	LO	1-n
(0044,0009)	Product Description	ProductDescription	LT	1
(0044,000A)	Product Lot Identifier	ProductLotIdentifier	LO	1
(0044,000B)	Product Expiration DateTime	ProductExpirationDateTime	DT	1
(0044,0010)	Substance Administration DateTime	SubstanceAdministrationDateTime	DT	1
(0044,0011)	Substance Administration Notes	SubstanceAdministrationNotes	LO	1
(0044,0012)	Substance Administration Device ID	SubstanceAdministrationDeviceID	LO	1
(0044,0013)	Product Parameter Sequence	ProductParameterSequence	SQ	1
(0044,0019)	Substance Administration Parameter Sequence	SubstanceAdministrationParameterSequence	SQ	1
(0046,0012)	Lens Description	LensDescription	LO	1
(0046,0014)	Right Lens Sequence	RightLensSequence	SQ	1
(0046,0015)	Left Lens Sequence	LeftLensSequence	SQ	1
(0046,0016)	Unspecified Laterality Lens Sequence	UnspecifiedLateralityLensSequence	SQ	1
(0046,0018)	Cylinder Sequence	CylinderSequence	SQ	1
(0046,0028)	Prism Sequence	PrismSequence	SQ	1
(0046,0030)	Horizontal Prism Power	HorizontalPrismPower	FD	1
(0046,0032)	Horizontal Prism Base	HorizontalPrismBase	CS	1
(0046,0034)	Vertical Prism Power	VerticalPrismPower	FD	1
(0046,0036)	Vertical Prism Base	VerticalPrismBase	CS	1
(0046,0038)	Lens Segment Type	LensSegmentType	CS	1
(0046,0040)	Optical Transmittance	OpticalTransmittance	FD	1
(0046,0042)	Channel Width	ChannelWidth	FD	1
(0046,0044)	Pupil Size	PupilSize	FD	1
(0046,0046)	Corneal Size	CornealSize	FD	1
(0046,0050)	Autorefraction Right Eye Sequence	AutorefractionRightEyeSequence	SQ	1
(0046,0052)	Autorefraction Left Eye Sequence	AutorefractionLeftEyeSequence	SQ	1
(0046,0060)	Distance Pupillary Distance	DistancePupillaryDistance	FD	1
(0046,0062)	Near Pupillary Distance	NearPupillaryDistance	FD	1
(0046,0063)	Intermediate Pupillary Distance	IntermediatePupillaryDistance	FD	1
(0046,0064)	Other Pupillary Distance	OtherPupillaryDistance	FD	1
(0046,0070)	Keratometry Right Eye Sequence	KeratometryRightEyeSequence	SQ	1
(0046,0071)	Keratometry Left Eye Sequence	KeratometryLeftEyeSequence	SQ	1
(0046,0074)	Steep Keratometric Axis Sequence	SteepKeratometricAxisSequence	SQ	1
(0046,0075)	Radius of Curvature	RadiusOfCurvature	FD	1
(0046,0076)	Keratometric Power	KeratometricPower	FD	1
(0046,0077)	Keratometric Axis	KeratometricAxis	FD	1
(0046,0080)	Flat Keratometric Axis Sequence	FlatKeratometricAxisSequence	SQ	1
(0046,0092)	Background Color	BackgroundColor	CS	1
(0046,0094)	Optotype	Optotype	CS	1
(0046,0095)	Optotype Presentation	OptotypePresentation	CS	1
(0046,0097)	Subjective Refraction Right Eye Sequence	SubjectiveRefractionRightEyeSequence	SQ	1
(0046,0098)	Subjective Refraction Left Eye Sequence	SubjectiveRefractionLeftEyeSequence	SQ	1
(0046,0100)	Add Near Sequence	AddNearSequence	SQ	1
(0046,0101)	Add Intermediate Sequence	AddIntermediateSequence	SQ	1
(0046,0102)	Add Other Sequence	AddOtherSequence	SQ	1
(0046,0104)	Add Power	AddPower	FD	1
(0046,0106)	Viewing Distance	ViewingDistance	FD	1
(0046,0121)	Visual Acuity Type Code Sequence	VisualAcuityTypeCodeSequence	SQ	1
(0046,0122)	Visual Acuity Right Eye Sequence	VisualAcuityRightEyeSequence	SQ	1
(0046,0123)	Visual Acuity Left Eye Sequence	VisualAcuityLeftEyeSequence	SQ	1
(0046,0124)	Visual Acuity Both Eyes Open Sequence	VisualAcuityBothEyesOpenSequence	SQ	1
(0046,0125)	Viewing Distance Type	ViewingDistanceType	CS	1
(0046,0135)	Visual Acuity Modifiers	VisualAcuityModifiers	SS	2
(0046,0137)	Decimal Visual Acuity	DecimalVisualAcuity	FD	1
(0046,0139)	Optotype Detailed Definition	OptotypeDetailedDefinition	LO	1
(0046,0145)	Referenced Refractive Measurements Sequence	ReferencedRefractiveMeasurementsSequence	SQ	1
(0046,0146)	Sphere Power	SpherePower	FD	1
(0046,0147)	Cylinder Power	CylinderPower	FD	1
(0048,0001)	Imaged Volume Width	ImagedVolumeWidth	FL	1
(0048,0002)	Imaged Volume Height	ImagedVolumeHeight	FL	1
(0048,0003)	Imaged Volume Depth	ImagedVolumeDepth	FL	1
(0048,0006)	Total Pixel Matrix Columns	TotalPixelMatrixColumns	UL	1
(0048,0007)	Total Pixel Matrix Rows	TotalPixelMatrixRows	UL	1
(0048,0008)	Total Pixel Matrix Origin Sequence	TotalPixelMatrixOriginSequence	SQ	1
(0048,0010)	Specimen Label in Image	SpecimenLabelInImage	CS	1
(0048,0011)	Focus Method	FocusMethod	CS	1
(0048,0012)	Extended Depth of Field	ExtendedDepthOfField	CS	1
(0048,0013)	Number of Focal Planes	NumberOfFocalPlanes	US	1
(0048,0014)	Distance Between Focal Planes	DistanceBetweenFocalPlanes	FL	1
(0048,0015)	Recommended Absent Pixel CIELab Value	RecommendedAbsentPixelCIELabValue	US	3
(0048,0100)	Illuminator Type Code Sequence	IlluminatorTypeCodeSequence	SQ	1
(0048,0102)	Image Orientation (Slide)	ImageOrientationSlide	DS	6
(0048,0105)	Optical Path Sequence	OpticalPathSequence	SQ	1
(0048,0106)	Optical Path Identifier	OpticalPathIdentifier	SH	1
(0048,0107)	Optical Path Description	OpticalPathDescription	ST	1
(0048,0108)	Illumination Color Code Sequence	IlluminationColorCodeSequence	SQ	1
(0048,0110)	Specimen Reference Sequence	SpecimenReferenceSequence	SQ	1
(0048,0111)	Condenser Lens Power	CondenserLensPower	DS	1
(0048,0112)	Objective Lens Power	ObjectiveLensPower	DS	1
(0048,0113)	Objective Lens Numerical Aperture	ObjectiveLensNumericalAperture	DS	1
(0048,0120)	Palette Color Lookup Table Sequence	PaletteColorLookupTableSequence	SQ	1
(0048,0200)	Referenced Image Navigation Sequence	ReferencedImageNavigationSequence	SQ	1
(0048,0201)	Top Left Hand Corner of Localizer Area	TopLeftHandCornerOfLocalizerArea	US	2
(0048,0202)	Bottom Right Hand Corner of Localizer Area	BottomRightHandCornerOfLocalizerArea	US	2
(0048,0207)	Optical Path Identification Sequence	OpticalPathIdentificationSequence	SQ	1
(0048,021A)	Plane Position (Slide) Sequence	PlanePositionSlideSequence	SQ	1
(0048,021E)	Row Position In Total Image Pixel Matrix	RowPositionInTotalImagePixelMatrix	SL	1
(0048,021F)	Column Position In Total Image Pixel Matrix	ColumnPositionInTotalImagePixelMatrix	SL	1
(0048,0301)	Pixel Origin Interpretation	PixelOriginInterpretation	CS	1
(0050,0004)	Calibration Image	CalibrationImage	CS	1
(0050,0010)	Device Sequence	DeviceSequence	SQ	1
(0050,0012)	Container Component Type Code Sequence	ContainerComponentTypeCodeSequence	SQ	1
(0050,0013)	Container Component Thickness	ContainerComponentThickness	FD	1
(0050,0014)	Device Length	DeviceLength	DS	1
(0050,0015)	Container Component Width	ContainerComponentWidth	FD	1
(0050,0016)	Device Diameter	DeviceDiameter	DS	1
(0050,0017)	Device Diameter Units	DeviceDiameterUnits	CS	1
(0050,0018)	Device Volume	DeviceVolume	DS	1
(0050,0019)	Inter-Marker Distance	InterMarkerDistance	DS	1
(0050,001A)	Container Component Material	ContainerComponentMaterial	CS	1
(0050,001B)	Container Component ID	ContainerComponentID	LO	1
(0050,001C)	Container Component Length	ContainerComponentLength	FD	1
(0050,001D)	Container Component Diameter	ContainerComponentDiameter	FD	1
(0050,001E)	Container Component Description	ContainerComponentDescription	LO	1
(0050,0020)	Device Description	DeviceDescription	LO	1
(0052,0001)	Contrast/Bolus Ingredient Percent by Volume	ContrastBolusIngredientPercentByVolume	FL	1
(0052,0002)	OCT Focal Distance	OCTFocalDistance	FD	1
(0052,0003)	Beam Spot Size	BeamSpotSize	FD	1
(0052,0004)	Effective Refractive Index	EffectiveRefractiveIndex	FD	1
(0052,0006)	OCT Acquisition Domain	OCTAcquisitionDomain	CS	1
(0052,0007)	OCT Optical Center Wavelength	OCTOpticalCenterWavelength	FD	1
(0052,0008)	Axial Resolution	AxialResolution	FD	1
(0052,0009)	Ranging Depth	RangingDepth	FD	1
(0052,0011)	A-line Rate	ALineRate	FD	1
(0052,0012)	A-lines Per Frame	ALinesPerFrame	US	1
(0052,0013)	Catheter Rotational Rate	CatheterRotationalRate	FD	1
(0052,0014)	A-line Pixel Spacing	ALinePixelSpacing	FD	1
(0052,0016)	Mode of Percutaneous Access Sequence	ModeOfPercutaneousAccessSequence	SQ	1
(0052,0025)	Intravascular OCT Frame Type Sequence	IntravascularOCTFrameTypeSequence	SQ	1
(0052,0026)	OCT Z Offset Applied	OCTZOffsetApplied	CS	1
(0052,0027)	Intravascular Frame Content Sequence	IntravascularFrameContentSequence	SQ	1
(0052,0028)	Intravascular Longitudinal Distance	IntravascularLongitudinalDistance	FD	1
(0052,0029)	Intravascular OCT Frame Content Sequence	IntravascularOCTFrameContentSequence	SQ	1
(0052,0030)	OCT Z Offset Correction	OCTZOffsetCorrection	SS	1
(0052,0031)	Catheter Direction of Rotation	CatheterDirectionOfRotation	CS	1
(0052,0033)	Seam Line Location	SeamLineLocation	FD	1
(0052,0034)	First A-line Location	FirstALineLocation	FD	1
(0052,0036)	Seam Line Index	SeamLineIndex	US	1
(0052,0038)	Number of Padded A-lines	NumberOfPaddedAlines	US	1
(0052,0039)	Interpolation Type	InterpolationType	CS	1
(0052,003A)	Refractive Index Applied	RefractiveIndexApplied	CS	1
(0054,0010)	Energy Window Vector	EnergyWindowVector	US	1-n
(0054,0011)	Number of Energy Windows	NumberOfEnergyWindows	US	1
(0054,0012)	Energy Window Information Sequence	EnergyWindowInformationSequence	SQ	1
(0054,0013)	Energy Window Range Sequence	EnergyWindowRangeSequence	SQ	1
(0054,0014)	Energy Window Lower Limit	EnergyWindowLowerLimit	DS	1
(0054,0015)	Energy Window Upper Limit	EnergyWindowUpperLimit	DS	1
(0054,0016)	Radiopharmaceutical Information Sequence	RadiopharmaceuticalInformationSequence	SQ	1
(0054,0017)	Residual Syringe Counts	ResidualSyringeCounts	IS	1
(0054,0018)	Energy Window Name	EnergyWindowName	SH	1
(0054,0020)	Detector Vector	DetectorVector	US	1-n
(0054,0021)	Number of Detectors	NumberOfDetectors	US	1
(0054,0022)	Detector Information Sequence	DetectorInformationSequence	SQ	1
(0054,0030)	Phase Vector	PhaseVector	US	1-n
(0054,0031)	Number of Phases	NumberOfPhases	US	1
(0054,0032)	Phase Information Sequence	PhaseInformationSequence	SQ	1
(0054,0033)	Number of Frames in Phase	NumberOfFramesInPhase	US	1
(0054,0036)	Phase Delay	PhaseDelay	IS	1
(0054,0038)	Pause Between Frames	PauseBetweenFrames	IS	1
(0054,0039)	Phase Description	PhaseDescription	CS	1
(0054,0050)	Rotation Vector	RotationVector	US	1-n
(0054,0051)	Number of Rotations	NumberOfRotations	US	1
(0054,0052)	Rotation Information Sequence	RotationInformationSequence	SQ	1
(0054,0053)	Number of Frames in Rotation	NumberOfFramesInRotation	US	1
(0054,0060)	R-R Interval Vector	RRIntervalVector	US	1-n
(0054,0061)	Number of R-R Intervals	NumberOfRRIntervals	US	1
(0054,0062)	Gated Information Sequence	GatedInformationSequence	SQ	1
(0054,0063)	Data Information Sequence	DataInformationSequence	SQ	1
(0054,0070)	Time Slot Vector	TimeSlotVector	US	1-n
(0054,0071)	Number of Time Slots	NumberOfTimeSlots	US	1
(0054,0072)	Time Slot Information Sequence	TimeSlotInformationSequence	SQ	1
(0054,0073)	Time Slot Time	TimeSlotTime	DS	1
(0054,0080)	Slice Vector	SliceVector	US	1-n
(0054,0081)	Number of Slices	NumberOfSlices	US	1
(0054,0090)	Angular View Vector	AngularViewVector	US	1-n
(0054,0100)	Time Slice Vector	TimeSliceVector	US	1-n
(0054,0101)	Number of Time Slices	NumberOfTimeSlices	US	1
(0054,0200)	Start Angle	StartAngle	DS	1
(0054,0202)	Type of Detector Motion	TypeOfDetectorMotion	CS	1
(0054,0210)	Trigger Vector	TriggerVector	IS	1-n
(0054,0211)	Number of Triggers in Phase	NumberOfTriggersInPhase	US	1
(0054,0220)	View Code Sequence	ViewCodeSequence	SQ	1
(0054,0222)	View Modifier Code Sequence	ViewModifierCodeSequence	SQ	1
(0054,0300)	Radionuclide Code Sequence	RadionuclideCodeSequence	SQ	1
(0054,0302)	Administration Route Code Sequence	AdministrationRouteCodeSequence	SQ	1
(0054,0304)	Radiopharmaceutical Code Sequence	RadiopharmaceuticalCodeSequence	SQ	1
(0054,0306)	Calibration Data Sequence	CalibrationDataSequence	SQ	1
(0054,0308)	Energy Window Number	EnergyWindowNumber	US	1
(0054,0400)	Image ID	ImageID	SH	1
(0054,0410)	Patient Orientation Code Sequence	PatientOrientationCodeSequence	SQ	1
(0054,0412)	Patient Orientation Modifier Code Sequence	PatientOrientationModifierCodeSequence	SQ	1
(0054,0414)	Patient Gantry Relationship Code Sequence	PatientGantryRelationshipCodeSequence	SQ	1
(0054,0500)	Slice Progression Direction	SliceProgressionDirection	CS	1
(0054,1000)	Series Type	SeriesType	CS	2
(0054,1001)	Units	Units	CS	1
(0054,1002)	Counts Source	CountsSource	CS	1
(0054,1004)	Reprojection Method	ReprojectionMethod	CS	1
(0054,1006)	SUV Type	SUVType	CS	1
(0054,1100)	Randoms Correction Method	RandomsCorrectionMethod	CS	1
(0054,1101)	Attenuation Correction Method	AttenuationCorrectionMethod	LO	1
(0054,1102)	Decay Correction	DecayCorrection	CS	1
(0054,1103)	Reconstruction Method	ReconstructionMethod	LO	1
(0054,1104)	Detector Lines of Response Used	DetectorLinesOfResponseUsed	LO	1
(0054,1105)	Scatter Correction Method	ScatterCorrectionMethod	LO	1
(0054,1200)	Axial Acceptance	AxialAcceptance	DS	1
(0054,1201)	Axial Mash	AxialMash	IS	2
(0054,1202)	Transverse Mash	TransverseMash	IS	1
(0054,1203)	Detector Element Size	DetectorElementSize	DS	2
(0054,1210)	Coincidence Window Width	CoincidenceWindowWidth	DS	1
(0054,1220)	Secondary Counts Type	SecondaryCountsType	CS	1-n
(0054,1300)	Frame Reference Time	FrameReferenceTime	DS	1
(0054,1310)	Primary (Prompts) Counts Accumulated	PrimaryPromptsCountsAccumulated	IS	1
(0054,1311)	Secondary Counts Accumulated	SecondaryCountsAccumulated	IS	1-n
(0054,1320)	Slice Sensitivity Factor	SliceSensitivityFactor	DS	1
(0054,1321)	Decay Factor	DecayFactor	DS	1
(0054,1322)	Dose Calibration Factor	DoseCalibrationFactor	DS	1
(0054,1323)	Scatter Fraction Factor	ScatterFractionFactor	DS	1
(0054,1324)	Dead Time Factor	DeadTimeFactor	DS	1
(0054,1330)	Image Index	ImageIndex	US	1
(0054,1400)	Counts Included	CountsIncluded	CS	1-n	RET
(0054,1401)	Dead Time Correction Flag	DeadTimeCorrectionFlag	CS	1	RET
(0060,3000)	Histogram Sequence	HistogramSequence	SQ	1
(0060,3002)	Histogram Number of Bins	HistogramNumberOfBins	US	1
(0060,3004)	Histogram First Bin Value	HistogramFirstBinValue	US or SS	1
(0060,3006)	Histogram Last Bin Value	HistogramLastBinValue	US or SS	1
(0060,3008)	Histogram Bin Width	HistogramBinWidth	US	1
(0060,3010)	Histogram Explanation	HistogramExplanation	LO	1
(0060,3020)	Histogram Data	HistogramData	UL	1-n
(0062,0001)	Segmentation Type	SegmentationType	CS	1
(0062,0002)	Segment Sequence	SegmentSequence	SQ	1
(0062,0003)	Segmented Property Category Code Sequence	SegmentedPropertyCategoryCodeSequence	SQ	1
(0062,0004)	Segment Number	SegmentNumber	US	1
(0062,0005)	Segment Label	SegmentLabel	LO	1
(0062,0006)	Segment Description	SegmentDescription	ST	1
(0062,0008)	Segment Algorithm Type	SegmentAlgorithmType	CS	1
(0062,0009)	Segment Algorithm Name	SegmentAlgorithmName	LO	1
(0062,000A)	Segment Identification Sequence	SegmentIdentificationSequence	SQ	1
(0062,000B)	Referenced Segment Number	ReferencedSegmentNumber	US	1-n
(0062,000C)	Recommended Display Grayscale Value	RecommendedDisplayGrayscaleValue	US	1
(0062,000D)	Recommended Display CIELab Value	RecommendedDisplayCIELabValue	US	3
(0062,000E)	Maximum Fractional Value	MaximumFractionalValue	US	1
(0062,000F)	Segmented Property Type Code Sequence	SegmentedPropertyTypeCodeSequence	SQ	1
(0062,0010)	Segmentation Fractional Type	SegmentationFractionalType	CS	1
(0064,0002)	Deformable Registration Sequence	DeformableRegistrationSequence	SQ	1
(0064,0003)	Source Frame of Reference UID	SourceFrameOfReferenceUID	UI	1
(0064,0005)	Deformable Registration Grid Sequence	DeformableRegistrationGridSequence	SQ	1
(0064,0007)	Grid Dimensions	GridDimensions	UL	3
(0064,0008)	Grid Resolution	GridResolution	FD	3
(0064,0009)	Vector Grid Data	VectorGridData	OF	1
(0064,000F)	Pre Deformation Matrix Registration Sequence	PreDeformationMatrixRegistrationSequence	SQ	1
(0064,0010)	Post Deformation Matrix Registration Sequence	PostDeformationMatrixRegistrationSequence	SQ	1
(0066,0001)	Number of Surfaces	NumberOfSurfaces	UL	1
(0066,0002)	Surface Sequence	SurfaceSequence	SQ	1
(0066,0003)	Surface Number	SurfaceNumber	UL	1
(0066,0004)	Surface Comments	SurfaceComments	LT	1
(0066,0009)	Surface Processing	SurfaceProcessing	CS	1
(0066,000A)	Surface Processing Ratio	SurfaceProcessingRatio	FL	1
(0066,000B)	Surface Processing Description	SurfaceProcessingDescription	LO	1
(0066,000C)	Recommended Presentation Opacity	RecommendedPresentationOpacity	FL	1
(0066,000D)	Recommended Presentation Type	RecommendedPresentationType	CS	1
(0066,000E)	Finite Volume	FiniteVolume	CS	1
(0066,0010)	Manifold	Manifold	CS	1
(0066,0011)	Surface Points Sequence	SurfacePointsSequence	SQ	1
(0066,0012)	Surface Points Normals Sequence	SurfacePointsNormalsSequence	SQ	1
(0066,0013)	Surface Mesh Primitives Sequence	SurfaceMeshPrimitivesSequence	SQ	1
(0066,0015)	Number of Surface Points	NumberOfSurfacePoints	UL	1
(0066,0016)	Point Coordinates Data	PointCoordinatesData	OF	1
(0066,0017)	Point Position Accuracy	PointPositionAccuracy	FL	3
(0066,0018)	Mean Point Distance	MeanPointDistance	FL	1
(0066,0019)	Maximum Point Distance	MaximumPointDistance	FL	1
(0066,001A)	Points Bounding Box Coordinates	PointsBoundingBoxCoordinates	FL	6
(0066,001B)	Axis of Rotation	AxisOfRotation	FL	3
(0066,001C)	Center of Rotation	CenterOfRotation	FL	3
(0066,001E)	Number of Vectors	NumberOfVectors	UL	1
(0066,001F)	Vector Dimensionality	VectorDimensionality	US	1
(0066,0020)	Vector Accuracy	VectorAccuracy	FL	1-n
(0066,0021)	Vector Coordinate Data	VectorCoordinateData	OF	1
(0066,0023)	Triangle Point Index List	TrianglePointIndexList	OW	1
(0066,0024)	Edge Point Index List	EdgePointIndexList	OW	1
(0066,0025)	Vertex Point Index List	VertexPointIndexList	OW	1
(0066,0026)	Triangle Strip Sequence	TriangleStripSequence	SQ	1
(0066,0027)	Triangle Fan Sequence	TriangleFanSequence	SQ	1
(0066,0028)	Line Sequence	LineSequence	SQ	1
(0066,0029)	Primitive Point Index List	PrimitivePointIndexList	OW	1
(0066,002A)	Surface Count	SurfaceCount	UL	1
(0066,002B)	Referenced Surface Sequence	ReferencedSurfaceSequence	SQ	1
(0066,002C)	Referenced Surface Number	ReferencedSurfaceNumber	UL	1
(0066,002D)	Segment Surface Generation Algorithm Identification Sequence	SegmentSurfaceGenerationAlgorithmIdentificationSequence	SQ	1
(0066,002E)	Segment Surface Source Instance Sequence	SegmentSurfaceSourceInstanceSequence	SQ	1
(0066,002F)	Algorithm Family Code Sequence	AlgorithmFamilyCodeSequence	SQ	1
(0066,0030)	Algorithm Name Code Sequence	AlgorithmNameCodeSequence	SQ	1
(0066,0031)	Algorithm Version	AlgorithmVersion	LO	1
(0066,0032)	Algorithm Parameters	AlgorithmParameters	LT	1
(0066,0034)	Facet Sequence	FacetSequence	SQ	1
(0066,0035)	Surface Processing Algorithm Identification Sequence	SurfaceProcessingAlgorithmIdentificationSequence	SQ	1
(0066,0036)	Algorithm Name	AlgorithmName	LO	1
(0068,6210)	Implant Size	ImplantSize	LO	1
(0068,6221)	Implant Template Version	ImplantTemplateVersion	LO	1
(0068,6222)	Replaced Implant Template Sequence	ReplacedImplantTemplateSequence	SQ	1
(0068,6223)	Implant Type	ImplantType	CS	1
(0068,6224)	Derivation Implant Template Sequence	DerivationImplantTemplateSequence	SQ	1
(0068,6225)	Original Implant Template Sequence	OriginalImplantTemplateSequence	SQ	1
(0068,6226)	Effective DateTime	EffectiveDateTime	DT	1
(0068,6230)	Implant Target Anatomy Sequence	ImplantTargetAnatomySequence	SQ	1
(0068,6260)	Information From Manufacturer Sequence	InformationFromManufacturerSequence	SQ	1
(0068,6265)	Notification From Manufacturer Sequence	NotificationFromManufacturerSequence	SQ	1
(0068,6270)	Information Issue DateTime	InformationIssueDateTime	DT	1
(0068,6280)	Information Summary	InformationSummary	ST	1
(0068,62A0)	Implant Regulatory Disapproval Code Sequence	ImplantRegulatoryDisapprovalCodeSequence	SQ	1
(0068,62A5)	Overall Template Spatial Tolerance	OverallTemplateSpatialTolerance	FD	1
(0068,62C0)	HPGL Document Sequence	HPGLDocumentSequence	SQ	1
(0068,62D0)	HPGL Document ID	HPGLDocumentID	US	1
(0068,62D5)	HPGL Document Label	HPGLDocumentLabel	LO	1
(0068,62E0)	View Orientation Code Sequence	ViewOrientationCodeSequence	SQ	1
(0068,62F0)	View Orientation Modifier	ViewOrientationModifier	FD	9
(0068,62F2)	HPGL Document Scaling	HPGLDocumentScaling	FD	1
(0068,6300)	HPGL Document	HPGLDocument	OB	1
(0068,6310)	HPGL Contour Pen Number	HPGLContourPenNumber	US	1
(0068,6320)	HPGL Pen Sequence	HPGLPenSequence	SQ	1
(0068,6330)	HPGL Pen Number	HPGLPenNumber	US	1
(0068,6340)	HPGL Pen Label	HPGLPenLabel	LO	1
(0068,6345)	HPGL Pen Description	HPGLPenDescription	ST	1
(0068,6346)	Recommended Rotation Point	RecommendedRotationPoint	FD	2
(0068,6347)	Bounding Rectangle	BoundingRectangle	FD	4
(0068,6350)	Implant Template 3D Model Surface Number	ImplantTemplate3DModelSurfaceNumber	US	1-n
(0068,6360)	Surface Model Description Sequence	SurfaceModelDescriptionSequence	SQ	1
(0068,6380)	Surface Model Label	SurfaceModelLabel	LO	1
(0068,6390)	Surface Model Scaling Factor	SurfaceModelScalingFactor	FD	1
(0068,63A0)	Materials Code Sequence	MaterialsCodeSequence	SQ	1
(0068,63A4)	Coating Materials Code Sequence	CoatingMaterialsCodeSequence	SQ	1
(0068,63A8)	Implant Type Code Sequence	ImplantTypeCodeSequence	SQ	1
(0068,63AC)	Fixation Method Code Sequence	FixationMethodCodeSequence	SQ	1
(0068,63B0)	Mating Feature Sets Sequence	MatingFeatureSetsSequence	SQ	1
(0068,63C0)	Mating Feature Set ID	MatingFeatureSetID	US	1
(0068,63D0)	Mating Feature Set Label	MatingFeatureSetLabel	LO	1
(0068,63E0)	Mating Feature Sequence	MatingFeatureSequence	SQ	1
(0068,63F0)	Mating Feature ID	MatingFeatureID	US	1
(0068,6400)	Mating Feature Degree of Freedom Sequence	MatingFeatureDegreeOfFreedomSequence	SQ	1
(0068,6410)	Degree of Freedom ID	DegreeOfFreedomID	US	1
(0068,6420)	Degree of Freedom Type	DegreeOfFreedomType	CS	1
(0068,6430)	2D Mating Feature Coordinates Sequence	TwoDMatingFeatureCoordinatesSequence	SQ	1
(0068,6440)	Referenced HPGL Document ID	ReferencedHPGLDocumentID	US	1
(0068,6450)	2D Mating Point	TwoDMatingPoint	FD	2
(0068,6460)	2D Mating Axes	TwoDMatingAxes	FD	4
(0068,6470)	2D Degree of Freedom Sequence	TwoDDegreeOfFreedomSequence	SQ	1
(0068,6490)	3D Degree of Freedom Axis	ThreeDDegreeOfFreedomAxis	FD	3
(0068,64A0)	Range of Freedom	RangeOfFreedom	FD	2
(0068,64C0)	3D Mating Point	ThreeDMatingPoint	FD	3
(0068,64D0)	3D Mating Axes	ThreeDMatingAxes	FD	9
(0068,64F0)	2D Degree of Freedom Axis	TwoDDegreeOfFreedomAxis	FD	3
(0068,6500)	Planning Landmark Point Sequence	PlanningLandmarkPointSequence	SQ	1
(0068,6510)	Planning Landmark Line Sequence	PlanningLandmarkLineSequence	SQ	1
(0068,6520)	Planning Landmark Plane Sequence	PlanningLandmarkPlaneSequence	SQ	1
(0068,6530)	Planning Landmark ID	PlanningLandmarkID	US	1
(0068,6540)	Planning Landmark Description	PlanningLandmarkDescription	LO	1
(0068,6545)	Planning Landmark Identification Code Sequence	PlanningLandmarkIdentificationCodeSequence	SQ	1
(0068,6550)	2D Point Coordinates Sequence	TwoDPointCoordinatesSequence	SQ	1
(0068,6560)	2D Point Coordinates	TwoDPointCoordinates	FD	2
(0068,6590)	3D Point Coordinates	ThreeDPointCoordinates	FD	3
(0068,65A0)	2D Line Coordinates Sequence	TwoDLineCoordinatesSequence	SQ	1
(0068,65B0)	2D Line Coordinates	TwoDLineCoordinates	FD	4
(0068,65D0)	3D Line Coordinates	ThreeDLineCoordinates	FD	6
(0068,65E0)	2D Plane Coordinates Sequence	TwoDPlaneCoordinatesSequence	SQ	1
(0068,65F0)	2D Plane Intersection	TwoDPlaneIntersection	FD	4
(0068,6610)	3D Plane Origin	ThreeDPlaneOrigin	FD	3
(0068,6620)	3D Plane Normal	ThreeDPlaneNormal	FD	3
(0070,0001)	Graphic Annotation Sequence	GraphicAnnotationSequence	SQ	1
(0070,0002)	Graphic Layer	GraphicLayer	CS	1
(0070,0003)	Bounding Box Annotation Units	BoundingBoxAnnotationUnits	CS	1
(0070,0004)	Anchor Point Annotation Units	AnchorPointAnnotationUnits	CS	1
(0070,0005)	Graphic Annotation Units	GraphicAnnotationUnits	CS	1
(0070,0006)	Unformatted Text Value	UnformattedTextValue	ST	1
(0070,0008)	Text Object Sequence	TextObjectSequence	SQ	1
(0070,0009)	Graphic Object Sequence	GraphicObjectSequence	SQ	1
(0070,0010)	Bounding Box Top Left Hand Corner	BoundingBoxTopLeftHandCorner	FL	2
(0070,0011)	Bounding Box Bottom Right Hand Corner	BoundingBoxBottomRightHandCorner	FL	2
(0070,0012)	Bounding Box Text Horizontal Justification	BoundingBoxTextHorizontalJustification	CS	1
(0070,0014)	Anchor Point	AnchorPoint	FL	2
(0070,0015)	Anchor Point Visibility	AnchorPointVisibility	CS	1
(0070,0020)	Graphic Dimensions	GraphicDimensions	US	1
(0070,0021)	Number of Graphic Points	NumberOfGraphicPoints	US	1
(0070,0022)	Graphic Data	GraphicData	FL	2-n
(0070,0023)	Graphic Type	GraphicType	CS	1
(0070,0024)	Graphic Filled	GraphicFilled	CS	1
(0070,0040)	Image Rotation (Retired)	ImageRotationRetired	IS	1	RET
(0070,0041)	Image Horizontal Flip	ImageHorizontalFlip	CS	1
(0070,0042)	Image Rotation	ImageRotation	US	1
(0070,0050)	Displayed Area Top Left Hand Corner (Trial)	DisplayedAreaTopLeftHandCornerTrial	US	2	RET
(0070,0051)	Displayed Area Bottom Right Hand Corner (Trial)	DisplayedAreaBottomRightHandCornerTrial	US	2	RET
(0070,0052)	Displayed Area Top Left Hand Corner	DisplayedAreaTopLeftHandCorner	SL	2
(0070,0053)	Displayed Area Bottom Right Hand Corner	DisplayedAreaBottomRightHandCorner	SL	2
(0070,005A)	Displayed Area Selection Sequence	DisplayedAreaSelectionSequence	SQ	1
(0070,0060)	Graphic Layer Sequence	GraphicLayerSequence	SQ	1
(0070,0062)	Graphic Layer Order	GraphicLayerOrder	IS	1
(0070,0066)	Graphic Layer Recommended Display Grayscale Value	GraphicLayerRecommendedDisplayGrayscaleValue	US	1
(0070,0067)	Graphic Layer Recommended Display RGB Value	GraphicLayerRecommendedDisplayRGBValue	US	3	RET
(0070,0068)	Graphic Layer Description	GraphicLayerDescription	LO	1
(0070,0080)	Content Label	ContentLabel	CS	1
(0070,0081)	Content Description	ContentDescription	LO	1
(0070,0082)	Presentation Creation Date	PresentationCreationDate	DA	1
(0070,0083)	Presentation Creation Time	PresentationCreationTime	TM	1
(0070,0084)	Content Creator’s Name	ContentCreatorName	PN	1
(0070,0086)	Content Creator’s Identification Code Sequence	ContentCreatorIdentificationCodeSequence	SQ	1
(0070,0087)	Alternate Content Description Sequence	AlternateContentDescriptionSequence	SQ	1
(0070,0100)	Presentation Size Mode	PresentationSizeMode	CS	1
(0070,0101)	Presentation Pixel Spacing	PresentationPixelSpacing	DS	2
(0070,0102)	Presentation Pixel Aspect Ratio	PresentationPixelAspectRatio	IS	2
(0070,0103)	Presentation Pixel Magnification Ratio	PresentationPixelMagnificationRatio	FL	1
(0070,0207)	Graphic Group Label	GraphicGroupLabel	LO	1
(0070,0208)	Graphic Group Description	GraphicGroupDescription	ST	1
(0070,0209)	Compound Graphic Sequence	CompoundGraphicSequence	SQ	1
(0070,0226)	Compound Graphic Instance ID	CompoundGraphicInstanceID	UL	1
(0070,0227)	Font Name	FontName	LO	1
(0070,0228)	Font Name Type	FontNameType	CS	1
(0070,0229)	CSS Font Name	CSSFontName	LO	1
(0070,0230)	Rotation Angle	RotationAngle	FD	1
(0070,0231)	Text Style Sequence	TextStyleSequence	SQ	1
(0070,0232)	Line Style Sequence	LineStyleSequence	SQ	1
(0070,0233)	Fill Style Sequence	FillStyleSequence	SQ	1
(0070,0234)	Graphic Group Sequence	GraphicGroupSequence	SQ	1
(0070,0241)	Text Color CIELab Value	TextColorCIELabValue	US	3
(0070,0242)	Horizontal Alignment	HorizontalAlignment	CS	1
(0070,0243)	Vertical Alignment	VerticalAlignment	CS	1
(0070,0244)	Shadow Style	ShadowStyle	CS	1
(0070,0245)	Shadow Offset X	ShadowOffsetX	FL	1
(0070,0246)	Shadow Offset Y	ShadowOffsetY	FL	1
(0070,0247)	Shadow Color CIELab Value	ShadowColorCIELabValue	US	3
(0070,0248)	Underlined	Underlined	CS	1
(0070,0249)	Bold	Bold	CS	1
(0070,0250)	Italic	Italic	CS	1
(0070,0251)	Pattern On Color CIELab Value	PatternOnColorCIELabValue	US	3
(0070,0252)	Pattern Off Color CIELab Value	PatternOffColorCIELabValue	US	3
(0070,0253)	Line Thickness	LineThickness	FL	1
(0070,0254)	Line Dashing Style	LineDashingStyle	CS	1
(0070,0255)	Line Pattern	LinePattern	UL	1
(0070,0256)	Fill Pattern	FillPattern	OB	1
(0070,0257)	Fill Mode	FillMode	CS	1
(0070,0258)	Shadow Opacity	ShadowOpacity	FL	1
(0070,0261)	Gap Length	GapLength	FL	1
(0070,0262)	Diameter of Visibility	DiameterOfVisibility	FL	1
(0070,0273)	Rotation Point	RotationPoint	FL	2
(0070,0274)	Tick Alignment	TickAlignment	CS	1
(0070,0278)	Show Tick Label	ShowTickLabel	CS	1
(0070,0279)	Tick Label Alignment	TickLabelAlignment	CS	1
(0070,0282)	Compound Graphic Units	CompoundGraphicUnits	CS	1
(0070,0284)	Pattern On Opacity	PatternOnOpacity	FL	1
(0070,0285)	Pattern Off Opacity	PatternOffOpacity	FL	1
(0070,0287)	Major Ticks Sequence	MajorTicksSequence	SQ	1
(0070,0288)	Tick Position	TickPosition	FL	1
(0070,0289)	Tick Label	TickLabel	SH	1
(0070,0294)	Compound Graphic Type	CompoundGraphicType	CS	1
(0070,0295)	Graphic Group ID	GraphicGroupID	UL	1
(0070,0306)	Shape Type	ShapeType	CS	1
(0070,0308)	Registration Sequence	RegistrationSequence	SQ	1
(0070,0309)	Matrix Registration Sequence	MatrixRegistrationSequence	SQ	1
(0070,030A)	Matrix Sequence	MatrixSequence	SQ	1
(0070,030C)	Frame of Reference Transformation Matrix Type	FrameOfReferenceTransformationMatrixType	CS	1
(0070,030D)	Registration Type Code Sequence	RegistrationTypeCodeSequence	SQ	1
(0070,030F)	Fiducial Description	FiducialDescription	ST	1
(0070,0310)	Fiducial Identifier	FiducialIdentifier	SH	1
(0070,0311)	Fiducial Identifier Code Sequence	FiducialIdentifierCodeSequence	SQ	1
(0070,0312)	Contour Uncertainty Radius	ContourUncertaintyRadius	FD	1
(0070,0314)	Used Fiducials Sequence	UsedFiducialsSequence	SQ	1
(0070,0318)	Graphic Coordinates Data Sequence	GraphicCoordinatesDataSequence	SQ	1
(0070,031A)	Fiducial UID	FiducialUID	UI	1
(0070,031C)	Fiducial Set Sequence	FiducialSetSequence	SQ	1
(0070,031E)	Fiducial Sequence	FiducialSequence	SQ	1
(0070,0401)	Graphic Layer Recommended Display CIELab Value	GraphicLayerRecommendedDisplayCIELabValue	US	3
(0070,0402)	Blending Sequence	BlendingSequence	SQ	1
(0070,0403)	Relative Opacity	RelativeOpacity	FL	1
(0070,0404)	Referenced Spatial Registration Sequence	ReferencedSpatialRegistrationSequence	SQ	1
(0070,0405)	Blending Position	BlendingPosition	CS	1
(0072,0002)	Hanging Protocol Name	HangingProtocolName	SH	1
(0072,0004)	Hanging Protocol Description	HangingProtocolDescription	LO	1
(0072,0006)	Hanging Protocol Level	HangingProtocolLevel	CS	1
(0072,0008)	Hanging Protocol Creator	HangingProtocolCreator	LO	1
(0072,000A)	Hanging Protocol Creation DateTime	HangingProtocolCreationDateTime	DT	1
(0072,000C)	Hanging Protocol Definition Sequence	HangingProtocolDefinitionSequence	SQ	1
(0072,000E)	Hanging Protocol User Identification Code Sequence	HangingProtocolUserIdentificationCodeSequence	SQ	1
(0072,0010)	Hanging Protocol User Group Name	HangingProtocolUserGroupName	LO	1
(0072,0012)	Source Hanging Protocol Sequence	SourceHangingProtocolSequence	SQ	1
(0072,0014)	Number of Priors Referenced	NumberOfPriorsReferenced	US	1
(0072,0020)	Image Sets Sequence	ImageSetsSequence	SQ	1
(0072,0022)	Image Set Selector Sequence	ImageSetSelectorSequence	SQ	1
(0072,0024)	Image Set Selector Usage Flag	ImageSetSelectorUsageFlag	CS	1
(0072,0026)	Selector Attribute	SelectorAttribute	AT	1
(0072,0028)	Selector Value Number	SelectorValueNumber	US	1
(0072,0030)	Time Based Image Sets Sequence	TimeBasedImageSetsSequence	SQ	1
(0072,0032)	Image Set Number	ImageSetNumber	US	1
(0072,0034)	Image Set Selector Category	ImageSetSelectorCategory	CS	1
(0072,0038)	Relative Time	RelativeTime	US	2
(0072,003A)	Relative Time Units	RelativeTimeUnits	CS	1
(0072,003C)	Abstract Prior Value	AbstractPriorValue	SS	2
(0072,003E)	Abstract Prior Code Sequence	AbstractPriorCodeSequence	SQ	1
(0072,0040)	Image Set Label	ImageSetLabel	LO	1
(0072,0050)	Selector Attribute VR	SelectorAttributeVR	CS	1
(0072,0052)	Selector Sequence Pointer	SelectorSequencePointer	AT	1-n
(0072,0054)	Selector Sequence Pointer Private Creator	SelectorSequencePointerPrivateCreator	LO	1-n
(0072,0056)	Selector Attribute Private Creator	SelectorAttributePrivateCreator	LO	1
(0072,0060)	Selector AT Value	SelectorATValue	AT	1-n
(0072,0062)	Selector CS Value	SelectorCSValue	CS	1-n
(0072,0064)	Selector IS Value	SelectorISValue	IS	1-n
(0072,0066)	Selector LO Value	SelectorLOValue	LO	1-n
(0072,0068)	Selector LT Value	SelectorLTValue	LT	1
(0072,006A)	Selector PN Value	SelectorPNValue	PN	1-n
(0072,006C)	Selector SH Value	SelectorSHValue	SH	1-n
(0072,006E)	Selector ST Value	SelectorSTValue	ST	1
(0072,0070)	Selector UT Value	SelectorUTValue	UT	1
(0072,0072)	Selector DS Value	SelectorDSValue	DS	1-n
(0072,0074)	Selector FD Value	SelectorFDValue	FD	1-n
(0072,0076)	Selector FL Value	SelectorFLValue	FL	1-n
(0072,0078)	Selector UL Value	SelectorULValue	UL	1-n
(0072,007A)	Selector US Value	SelectorUSValue	US	1-n
(0072,007C)	Selector SL Value	SelectorSLValue	SL	1-n
(0072,007E)	Selector SS Value	SelectorSSValue	SS	1-n
(0072,0080)	Selector Code Sequence Value	SelectorCodeSequenceValue	SQ	1
(0072,0100)	Number of Screens	NumberOfScreens	US	1
(0072,0102)	Nominal Screen Definition Sequence	NominalScreenDefinitionSequence	SQ	1
(0072,0104)	Number of Vertical Pixels	NumberOfVerticalPixels	US	1
(0072,0106)	Number of Horizontal Pixels	NumberOfHorizontalPixels	US	1
(0072,0108)	Display Environment Spatial Position	DisplayEnvironmentSpatialPosition	FD	4
(0072,010A)	Screen Minimum Grayscale Bit Depth	ScreenMinimumGrayscaleBitDepth	US	1
(0072,010C)	Screen Minimum Color Bit Depth	ScreenMinimumColorBitDepth	US	1
(0072,010E)	Application Maximum Repaint Time	ApplicationMaximumRepaintTime	US	1
(0072,0200)	Display Sets Sequence	DisplaySetsSequence	SQ	1
(0072,0202)	Display Set Number	DisplaySetNumber	US	1
(0072,0203)	Display Set Label	DisplaySetLabel	LO	1
(0072,0204)	Display Set Presentation Group	DisplaySetPresentationGroup	US	1
(0072,0206)	Display Set Presentation Group Description	DisplaySetPresentationGroupDescription	LO	1
(0072,0208)	Partial Data Display Handling	PartialDataDisplayHandling	CS	1
(0072,0210)	Synchronized Scrolling Sequence	SynchronizedScrollingSequence	SQ	1
(0072,0212)	Display Set Scrolling Group	DisplaySetScrollingGroup	US	2-n
(0072,0214)	Navigation Indicator Sequence	NavigationIndicatorSequence	SQ	1
(0072,0216)	Navigation Display Set	NavigationDisplaySet	US	1
(0072,0218)	Reference Display Sets	ReferenceDisplaySets	US	1-n
(0072,0300)	Image Boxes Sequence	ImageBoxesSequence	SQ	1
(0072,0302)	Image Box Number	ImageBoxNumber	US	1
(0072,0304)	Image Box Layout Type	ImageBoxLayoutType	CS	1
(0072,0306)	Image Box Tile Horizontal Dimension	ImageBoxTileHorizontalDimension	US	1
(0072,0308)	Image Box Tile Vertical Dimension	ImageBoxTileVerticalDimension	US	1
(0072,0310)	Image Box Scroll Direction	ImageBoxScrollDirection	CS	1
(0072,0312)	Image Box Small Scroll Type	ImageBoxSmallScrollType	CS	1
(0072,0314)	Image Box Small Scroll Amount	ImageBoxSmallScrollAmount	US	1
(0072,0316)	Image Box Large Scroll Type	ImageBoxLargeScrollType	CS	1
(0072,0318)	Image Box Large Scroll Amount	ImageBoxLargeScrollAmount	US	1
(0072,0320)	Image Box Overlap Priority	ImageBoxOverlapPriority	US	1
(0072,0330)	Cine Relative to Real-Time	CineRelativeToRealTime	FD	1
(0072,0400)	Filter Operations Sequence	FilterOperationsSequence	SQ	1
(0072,0402)	Filter-by Category	FilterByCategory	CS	1
(0072,0404)	Filter-by Attribute Presence	FilterByAttributePresence	CS	1
(0072,0406)	Filter-by Operator	FilterByOperator	CS	1
(0072,0420)	Structured Display Background CIELab Value	StructuredDisplayBackgroundCIELabValue	US	3
(0072,0421)	Empty Image Box CIELab Value	EmptyImageBoxCIELabValue	US	3
(0072,0422)	Structured Display Image Box Sequence	StructuredDisplayImageBoxSequence	SQ	1
(0072,0424)	Structured Display Text Box Sequence	StructuredDisplayTextBoxSequence	SQ	1
(0072,0427)	Referenced First Frame Sequence	ReferencedFirstFrameSequence	SQ	1
(0072,0430)	Image Box Synchronization Sequence	ImageBoxSynchronizationSequence	SQ	1
(0072,0432)	Synchronized Image Box List	SynchronizedImageBoxList	US	2-n
(0072,0434)	Type of Synchronization	TypeOfSynchronization	CS	1
(0072,0500)	Blending Operation Type	BlendingOperationType	CS	1
(0072,0510)	Reformatting Operation Type	ReformattingOperationType	CS	1
(0072,0512)	Reformatting Thickness	ReformattingThickness	FD	1
(0072,0514)	Reformatting Interval	ReformattingInterval	FD	1
(0072,0516)	Reformatting Operation Initial View Direction	ReformattingOperationInitialViewDirection	CS	1
(0072,0520)	3D Rendering Type	ThreeDRenderingType	CS	1-n
(0072,0600)	Sorting Operations Sequence	SortingOperationsSequence	SQ	1
(0072,0602)	Sort-by Category	SortByCategory	CS	1
(0072,0604)	Sorting Direction	SortingDirection	CS	1
(0072,0700)	Display Set Patient Orientation	DisplaySetPatientOrientation	CS	2
(0072,0702)	VOI Type	VOIType	CS	1
(0072,0704)	Pseudo-Color Type	PseudoColorType	CS	1
(0072,0705)	Pseudo-Color Palette Instance Reference Sequence	PseudoColorPaletteInstanceReferenceSequence	SQ	1
(0072,0706)	Show Grayscale Inverted	ShowGrayscaleInverted	CS	1
(0072,0710)	Show Image True Size Flag	ShowImageTrueSizeFlag	CS	1
(0072,0712)	Show Graphic Annotation Flag	ShowGraphicAnnotationFlag	CS	1
(0072,0714)	Show Patient Demographics Flag	ShowPatientDemographicsFlag	CS	1
(0072,0716)	Show Acquisition Techniques Flag	ShowAcquisitionTechniquesFlag	CS	1
(0072,0717)	Display Set Horizontal Justification	DisplaySetHorizontalJustification	CS	1
(0072,0718)	Display Set Vertical Justification	DisplaySetVerticalJustification	CS	1
(0074,0120)	Continuation Start Meterset	ContinuationStartMeterset	FD	1
(0074,0121)	Continuation End Meterset	ContinuationEndMeterset	FD	1
(0074,1000)	Procedure Step State	ProcedureStepState	CS	1
(0074,1002)	Procedure Step Progress Information Sequence	ProcedureStepProgressInformationSequence	SQ	1
(0074,1004)	Procedure Step Progress	ProcedureStepProgress	DS	1
(0074,1006)	Procedure Step Progress Description	ProcedureStepProgressDescription	ST	1
(0074,1008)	Procedure Step Communications URI Sequence	ProcedureStepCommunicationsURISequence	SQ	1
(0074,100a)	Contact URI	ContactURI	ST	1
(0074,100c)	Contact Display Name	ContactDisplayName	LO	1
(0074,100e)	Procedure Step Discontinuation Reason Code Sequence	ProcedureStepDiscontinuationReasonCodeSequence	SQ	1
(0074,1020)	Beam Task Sequence	BeamTaskSequence	SQ	1
(0074,1022)	Beam Task Type	BeamTaskType	CS	1
(0074,1024)	Beam Order Index (Trial)	BeamOrderIndexTrial	IS	1	RET
(0074,1026)	Table Top Vertical Adjusted Position	TableTopVerticalAdjustedPosition	FD	1
(0074,1027)	Table Top Longitudinal Adjusted Position	TableTopLongitudinalAdjustedPosition	FD	1
(0074,1028)	Table Top Lateral Adjusted Position	TableTopLateralAdjustedPosition	FD	1
(0074,102A)	Patient Support Adjusted Angle	PatientSupportAdjustedAngle	FD	1
(0074,102B)	Table Top Eccentric Adjusted Angle	TableTopEccentricAdjustedAngle	FD	1
(0074,102C)	Table Top Pitch Adjusted Angle	TableTopPitchAdjustedAngle	FD	1
(0074,102D)	Table Top Roll Adjusted Angle	TableTopRollAdjustedAngle	FD	1
(0074,1030)	Delivery Verification Image Sequence	DeliveryVerificationImageSequence	SQ	1
(0074,1032)	Verification Image Timing	VerificationImageTiming	CS	1
(0074,1034)	Double Exposure Flag	DoubleExposureFlag	CS	1
(0074,1036)	Double Exposure Ordering	DoubleExposureOrdering	CS	1
(0074,1038)	Double Exposure Meterset (Trial)	DoubleExposureMetersetTrial	DS	1	RET
(0074,103A)	Double Exposure Field Delta (Trial)	DoubleExposureFieldDeltaTrial	DS	4	RET
(0074,1040)	Related Reference RT Image Sequence	RelatedReferenceRTImageSequence	SQ	1
(0074,1042)	General Machine Verification Sequence	GeneralMachineVerificationSequence	SQ	1
(0074,1044)	Conventional Machine Verification Sequence	ConventionalMachineVerificationSequence	SQ	1
(0074,1046)	Ion Machine Verification Sequence	IonMachineVerificationSequence	SQ	1
(0074,1048)	Failed Attributes Sequence	FailedAttributesSequence	SQ	1
(0074,104A)	Overridden Attributes Sequence	OverriddenAttributesSequence	SQ	1
(0074,104C)	Conventional Control Point Verification Sequence	ConventionalControlPointVerificationSequence	SQ	1
(0074,104E)	Ion Control Point Verification Sequence	IonControlPointVerificationSequence	SQ	1
(0074,1050)	Attribute Occurrence Sequence	AttributeOccurrenceSequence	SQ	1
(0074,1052)	Attribute Occurrence Pointer	AttributeOccurrencePointer	AT	1
(0074,1054)	Attribute Item Selector	AttributeItemSelector	UL	1
(0074,1056)	Attribute Occurrence Private Creator	AttributeOccurrencePrivateCreator	LO	1
(0074,1057)	Selector Sequence Pointer Items	SelectorSequencePointerItems	IS	1-n
(0074,1200)	Scheduled Procedure Step Priority	ScheduledProcedureStepPriority	CS	1
(0074,1202)	Worklist Label	WorklistLabel	LO	1
(0074,1204)	Procedure Step Label	ProcedureStepLabel	LO	1
(0074,1210)	Scheduled Processing Parameters Sequence	ScheduledProcessingParametersSequence	SQ	1
(0074,1212)	Performed Processing Parameters Sequence	PerformedProcessingParametersSequence	SQ	1
(0074,1216)	Unified Procedure Step Performed Procedure Sequence	UnifiedProcedureStepPerformedProcedureSequence	SQ	1
(0074,1220)	Related Procedure Step Sequence	RelatedProcedureStepSequence	SQ	1	RET
(0074,1222)	Procedure Step Relationship Type	ProcedureStepRelationshipType	LO	1	RET
(0074,1224)	Replaced Procedure Step Sequence	ReplacedProcedureStepSequence	SQ	1
(0074,1230)	Deletion Lock	DeletionLock	LO	1
(0074,1234)	Receiving AE	ReceivingAE	AE	1
(0074,1236)	Requesting AE	RequestingAE	AE	1
(0074,1238)	Reason for Cancellation	ReasonForCancellation	LT	1
(0074,1242)	SCP Status	SCPStatus	CS	1
(0074,1244)	Subscription List Status	SubscriptionListStatus	CS	1
(0074,1246)	Unified Procedure Step List Status	UnifiedProcedureStepListStatus	CS	1
(0074,1324)	Beam Order Index	BeamOrderIndex	UL	1
(0074,1338)	Double Exposure Meterset	DoubleExposureMeterset	FD	1
(0074,133A)	Double Exposure Field Delta	DoubleExposureFieldDelta	FD	4
(0076,0001)	Implant Assembly Template Name	ImplantAssemblyTemplateName	LO	1
(0076,0003)	Implant Assembly Template Issuer	ImplantAssemblyTemplateIssuer	LO	1
(0076,0006)	Implant Assembly Template Version	ImplantAssemblyTemplateVersion	LO	1
(0076,0008)	Replaced Implant Assembly Template Sequence	ReplacedImplantAssemblyTemplateSequence	SQ	1
(0076,000A)	Implant Assembly Template Type	ImplantAssemblyTemplateType	CS	1
(0076,000C)	Original Implant Assembly Template Sequence	OriginalImplantAssemblyTemplateSequence	SQ	1
(0076,000E)	Derivation Implant Assembly Template Sequence	DerivationImplantAssemblyTemplateSequence	SQ	1
(0076,0010)	Implant Assembly Template Target Anatomy Sequence	ImplantAssemblyTemplateTargetAnatomySequence	SQ	1
(0076,0020)	Procedure Type Code Sequence	ProcedureTypeCodeSequence	SQ	1
(0076,0030)	Surgical Technique	SurgicalTechnique	LO	1
(0076,0032)	Component Types Sequence	ComponentTypesSequence	SQ	1
(0076,0034)	Component Type Code Sequence	ComponentTypeCodeSequence	CS	1
(0076,0036)	Exclusive Component Type	ExclusiveComponentType	CS	1
(0076,0038)	Mandatory Component Type	MandatoryComponentType	CS	1
(0076,0040)	Component Sequence	ComponentSequence	SQ	1
(0076,0055)	Component ID	ComponentID	US	1
(0076,0060)	Component Assembly Sequence	ComponentAssemblySequence	SQ	1
(0076,0070)	Component 1 Referenced ID	Component1ReferencedID	US	1
(0076,0080)	Component 1 Referenced Mating Feature Set ID	Component1ReferencedMatingFeatureSetID	US	1
(0076,0090)	Component 1 Referenced Mating Feature ID	Component1ReferencedMatingFeatureID	US	1
(0076,00A0)	Component 2 Referenced ID	Component2ReferencedID	US	1
(0076,00B0)	Component 2 Referenced Mating Feature Set ID	Component2ReferencedMatingFeatureSetID	US	1
(0076,00C0)	Component 2 Referenced Mating Feature ID	Component2ReferencedMatingFeatureID	US	1
(0078,0001)	Implant Template Group Name	ImplantTemplateGroupName	LO	1
(0078,0010)	Implant Template Group Description	ImplantTemplateGroupDescription	ST	1
(0078,0020)	Implant Template Group Issuer	ImplantTemplateGroupIssuer	LO	1
(0078,0024)	Implant Template Group Version	ImplantTemplateGroupVersion	LO	1
(0078,0026)	Replaced Implant Template Group Sequence	ReplacedImplantTemplateGroupSequence	SQ	1
(0078,0028)	Implant Template Group Target Anatomy Sequence	ImplantTemplateGroupTargetAnatomySequence	SQ	1
(0078,002A)	Implant Template Group Members Sequence	ImplantTemplateGroupMembersSequence	SQ	1
(0078,002E)	Implant Template Group Member ID	ImplantTemplateGroupMemberID	US	1
(0078,0050)	3D Implant Template Group Member Matching Point	ThreeDImplantTemplateGroupMemberMatchingPoint	FD	3
(0078,0060)	3D Implant Template Group Member Matching Axes	ThreeDImplantTemplateGroupMemberMatchingAxes	FD	9
(0078,0070)	Implant Template Group Member Matching 2D Coordinates Sequence	ImplantTemplateGroupMemberMatching2DCoordinatesSequence	SQ	1
(0078,0090)	2D Implant Template Group Member Matching Point	TwoDImplantTemplateGroupMemberMatchingPoint	FD	2
(0078,00A0)	2D Implant Template Group Member Matching Axes	TwoDImplantTemplateGroupMemberMatchingAxes	FD	4
(0078,00B0)	Implant Template Group Variation Dimension Sequence	ImplantTemplateGroupVariationDimensionSequence	SQ	1
(0078,00B2)	Implant Template Group Variation Dimension Name	ImplantTemplateGroupVariationDimensionName	LO	1
(0078,00B4)	Implant Template Group Variation Dimension Rank Sequence	ImplantTemplateGroupVariationDimensionRankSequence	SQ	1
(0078,00B6)	Referenced Implant Template Group Member ID	ReferencedImplantTemplateGroupMemberID	US	1
(0078,00B8)	Implant Template Group Variation Dimension Rank	ImplantTemplateGroupVariationDimensionRank	US	1
(0088,0130)	Storage Media File-set ID	StorageMediaFileSetID	SH	1
(0088,0140)	Storage Media File-set UID	StorageMediaFileSetUID	UI	1
(0088,0200)	Icon Image Sequence	IconImageSequence	SQ	1
(0088,0904)	Topic Title	TopicTitle	LO	1	RET
(0088,0906)	Topic Subject	TopicSubject	ST	1	RET
(0088,0910)	Topic Author	TopicAuthor	LO	1	RET
(0088,0912)	Topic Keywords	TopicKeywords	LO	1-32	RET
(0100,0410)	SOP Instance Status	SOPInstanceStatus	CS	1
(0100,0420)	SOP Authorization DateTime	SOPAuthorizationDateTime	DT	1
(0100,0424)	SOP Authorization Comment	SOPAuthorizationComment	LT	1
(0100,0426)	Authorization Equipment Certification Number	AuthorizationEquipmentCertificationNumber	LO	1
(0400,0005)	MAC ID Number	MACIDNumber	US	1
(0400,0010)	MAC Calculation Transfer Syntax UID	MACCalculationTransferSyntaxUID	UI	1
(0400,0015)	MAC Algorithm	MACAlgorithm	CS	1
(0400,0020)	Data Elements Signed	DataElementsSigned	AT	1-n
(0400,0100)	Digital Signature UID	DigitalSignatureUID	UI	1
(0400,0105)	Digital Signature DateTime	DigitalSignatureDateTime	DT	1
(0400,0110)	Certificate Type	CertificateType	CS	1
(0400,0115)	Certificate of Signer	CertificateOfSigner	OB	1
(0400,0120)	Signature	Signature	OB	1
(0400,0305)	Certified Timestamp Type	CertifiedTimestampType	CS	1
(0400,0310)	Certified Timestamp	CertifiedTimestamp	OB	1
(0400,0401)	Digital Signature Purpose Code Sequence	DigitalSignaturePurposeCodeSequence	SQ	1
(0400,0402)	Referenced Digital Signature Sequence	ReferencedDigitalSignatureSequence	SQ	1
(0400,0403)	Referenced SOP Instance MAC Sequence	ReferencedSOPInstanceMACSequence	SQ	1
(0400,0404)	MAC	MAC	OB	1
(0400,0500)	Encrypted Attributes Sequence	EncryptedAttributesSequence	SQ	1
(0400,0510)	Encrypted Content Transfer Syntax UID	EncryptedContentTransferSyntaxUID	UI	1
(0400,0520)	Encrypted Content	EncryptedContent	OB	1
(0400,0550)	Modified Attributes Sequence	ModifiedAttributesSequence	SQ	1
(0400,0561)	Original Attributes Sequence	OriginalAttributesSequence	SQ	1
(0400,0562)	Attribute Modification DateTime	AttributeModificationDateTime	DT	1
(0400,0563)	Modifying System	ModifyingSystem	LO	1
(0400,0564)	Source of Previous Values	SourceOfPreviousValues	LO	1
(0400,0565)	Reason for the Attribute Modification	ReasonForTheAttributeModification	CS	1
(1000,xxx0)	Escape Triplet	EscapeTriplet	US	3	RET
(1000,xxx1)	Run Length Triplet	RunLengthTriplet	US	3	RET
(1000,xxx2)	Huffman Table Size	HuffmanTableSize	US	1	RET
(1000,xxx3)	Huffman Table Triplet	HuffmanTableTriplet	US	3	RET
(1000,xxx4)	Shift Table Size	ShiftTableSize	US	1	RET
(1000,xxx5)	Shift Table Triplet	ShiftTableTriplet	US	3	RET
(1010,xxxx)	Zonal Map	ZonalMap	US	1-n	RET
(2000,0010)	Number of Copies	NumberOfCopies	IS	1
(2000,001E)	Printer Configuration Sequence	PrinterConfigurationSequence	SQ	1
(2000,0020)	Print Priority	PrintPriority	CS	1
(2000,0030)	Medium Type	MediumType	CS	1
(2000,0040)	Film Destination	FilmDestination	CS	1
(2000,0050)	Film Session Label	FilmSessionLabel	LO	1
(2000,0060)	Memory Allocation	MemoryAllocation	IS	1
(2000,0061)	Maximum Memory Allocation	MaximumMemoryAllocation	IS	1
(2000,0062)	Color Image Printing Flag	ColorImagePrintingFlag	CS	1	RET
(2000,0063)	Collation Flag	CollationFlag	CS	1	RET
(2000,0065)	Annotation Flag	AnnotationFlag	CS	1	RET
(2000,0067)	Image Overlay Flag	ImageOverlayFlag	CS	1	RET
(2000,0069)	Presentation LUT Flag	PresentationLUTFlag	CS	1	RET
(2000,006A)	Image Box Presentation LUT Flag	ImageBoxPresentationLUTFlag	CS	1	RET
(2000,00A0)	Memory Bit Depth	MemoryBitDepth	US	1
(2000,00A1)	Printing Bit Depth	PrintingBitDepth	US	1
(2000,00A2)	Media Installed Sequence	MediaInstalledSequence	SQ	1
(2000,00A4)	Other Media Available Sequence	OtherMediaAvailableSequence	SQ	1
(2000,00A8)	Supported Image Display Formats Sequence	SupportedImageDisplayFormatsSequence	SQ	1
(2000,0500)	Referenced Film Box Sequence	ReferencedFilmBoxSequence	SQ	1
(2000,0510)	Referenced Stored Print Sequence	ReferencedStoredPrintSequence	SQ	1	RET
(2010,0010)	Image Display Format	ImageDisplayFormat	ST	1
(2010,0030)	Annotation Display Format ID	AnnotationDisplayFormatID	CS	1
(2010,0040)	Film Orientation	FilmOrientation	CS	1
(2010,0050)	Film Size ID	FilmSizeID	CS	1
(2010,0052)	Printer Resolution ID	PrinterResolutionID	CS	1
(2010,0054)	Default Printer Resolution ID	DefaultPrinterResolutionID	CS	1
(2010,0060)	Magnification Type	MagnificationType	CS	1
(2010,0080)	Smoothing Type	SmoothingType	CS	1
(2010,00A6)	Default Magnification Type	DefaultMagnificationType	CS	1
(2010,00A7)	Other Magnification Types Available	OtherMagnificationTypesAvailable	CS	1-n
(2010,00A8)	Default Smoothing Type	DefaultSmoothingType	CS	1
(2010,00A9)	Other Smoothing Types Available	OtherSmoothingTypesAvailable	CS	1-n
(2010,0100)	Border Density	BorderDensity	CS	1
(2010,0110)	Empty Image Density	EmptyImageDensity	CS	1
(2010,0120)	Min Density	MinDensity	US	1
(2010,0130)	Max Density	MaxDensity	US	1
(2010,0140)	Trim	Trim	CS	1
(2010,0150)	Configuration Information	ConfigurationInformation	ST	1
(2010,0152)	Configuration Information Description	ConfigurationInformationDescription	LT	1
(2010,0154)	Maximum Collated Films	MaximumCollatedFilms	IS	1
(2010,015E)	Illumination	Illumination	US	1
(2010,0160)	Reflected Ambient Light	ReflectedAmbientLight	US	1
(2010,0376)	Printer Pixel Spacing	PrinterPixelSpacing	DS	2
(2010,0500)	Referenced Film Session Sequence	ReferencedFilmSessionSequence	SQ	1
(2010,0510)	Referenced Image Box Sequence	ReferencedImageBoxSequence	SQ	1
(2010,0520)	Referenced Basic Annotation Box Sequence	ReferencedBasicAnnotationBoxSequence	SQ	1
(2020,0010)	Image Box Position	ImageBoxPosition	US	1
(2020,0020)	Polarity	Polarity	CS	1
(2020,0030)	Requested Image Size	RequestedImageSize	DS	1
(2020,0040)	Requested Decimate/Crop Behavior	RequestedDecimateCropBehavior	CS	1
(2020,0050)	Requested Resolution ID	RequestedResolutionID	CS	1
(2020,00A0)	Requested Image Size Flag	RequestedImageSizeFlag	CS	1
(2020,00A2)	Decimate/Crop Result	DecimateCropResult	CS	1
(2020,0110)	Basic Grayscale Image Sequence	BasicGrayscaleImageSequence	SQ	1
(2020,0111)	Basic Color Image Sequence	BasicColorImageSequence	SQ	1
(2020,0130)	Referenced Image Overlay Box Sequence	ReferencedImageOverlayBoxSequence	SQ	1	RET
(2020,0140)	Referenced VOI LUT Box Sequence	ReferencedVOILUTBoxSequence	SQ	1	RET
(2030,0010)	Annotation Position	AnnotationPosition	US	1
(2030,0020)	Text String	TextString	LO	1
(2040,0010)	Referenced Overlay Plane Sequence	ReferencedOverlayPlaneSequence	SQ	1	RET
(2040,0011)	Referenced Overlay Plane Groups	ReferencedOverlayPlaneGroups	US	1-99	RET
(2040,0020)	Overlay Pixel Data Sequence	OverlayPixelDataSequence	SQ	1	RET
(2040,0060)	Overlay Magnification Type	OverlayMagnificationType	CS	1	RET
(2040,0070)	Overlay Smoothing Type	OverlaySmoothingType	CS	1	RET
(2040,0072)	Overlay or Image Magnification	OverlayOrImageMagnification	CS	1	RET
(2040,0074)	Magnify to Number of Columns	MagnifyToNumberOfColumns	US	1	RET
(2040,0080)	Overlay Foreground Density	OverlayForegroundDensity	CS	1	RET
(2040,0082)	Overlay Background Density	OverlayBackgroundDensity	CS	1	RET
(2040,0090)	Overlay Mode	OverlayMode	CS	1	RET
(2040,0100)	Threshold Density	ThresholdDensity	CS	1	RET
(2040,0500)	Referenced Image Box Sequence (Retired)	ReferencedImageBoxSequenceRetired	SQ	1	RET
(2050,0010)	Presentation LUT Sequence	PresentationLUTSequence	SQ	1
(2050,0020)	Presentation LUT Shape	PresentationLUTShape	CS	1
(2050,0500)	Referenced Presentation LUT Sequence	ReferencedPresentationLUTSequence	SQ	1
(2100,0010)	Print Job ID	PrintJobID	SH	1	RET
(2100,0020)	Execution Status	ExecutionStatus	CS	1
(2100,0030)	Execution Status Info	ExecutionStatusInfo	CS	1
(2100,0040)	Creation Date	CreationDate	DA	1
(2100,0050)	Creation Time	CreationTime	TM	1
(2100,0070)	Originator	Originator	AE	1
(2100,0140)	Destination AE	DestinationAE	AE	1	RET
(2100,0160)	Owner ID	OwnerID	SH	1
(2100,0170)	Number of Films	NumberOfFilms	IS	1
(2100,0500)	Referenced Print Job Sequence (Pull Stored Print)	ReferencedPrintJobSequencePullStoredPrint	SQ	1	RET
(2110,0010)	Printer Status	PrinterStatus	CS	1
(2110,0020)	Printer Status Info	PrinterStatusInfo	CS	1
(2110,0030)	Printer Name	PrinterName	LO	1
(2110,0099)	Print Queue ID	PrintQueueID	SH	1	RET
(2120,0010)	Queue Status	QueueStatus	CS	1	RET
(2120,0050)	Print Job Description Sequence	PrintJobDescriptionSequence	SQ	1	RET
(2120,0070)	Referenced Print Job Sequence	ReferencedPrintJobSequence	SQ	1	RET
(2130,0010)	Print Management Capabilities Sequence	PrintManagementCapabilitiesSequence	SQ	1	RET
(2130,0015)	Printer Characteristics Sequence	PrinterCharacteristicsSequence	SQ	1	RET
(2130,0030)	Film Box Content Sequence	FilmBoxContentSequence	SQ	1	RET
(2130,0040)	Image Box Content Sequence	ImageBoxContentSequence	SQ	1	RET
(2130,0050)	Annotation Content Sequence	AnnotationContentSequence	SQ	1	RET
(2130,0060)	Image Overlay Box Content Sequence	ImageOverlayBoxContentSequence	SQ	1	RET
(2130,0080)	Presentation LUT Content Sequence	PresentationLUTContentSequence	SQ	1	RET
(2130,00A0)	Proposed Study Sequence	ProposedStudySequence	SQ	1	RET
(2130,00C0)	Original Image Sequence	OriginalImageSequence	SQ	1	RET
(2200,0001)	Label Using Information Extracted From Instances	LabelUsingInformationExtractedFromInstances	CS	1
(2200,0002)	Label Text	LabelText	UT	1
(2200,0003)	Label Style Selection	LabelStyleSelection	CS	1
(2200,0004)	Media Disposition	MediaDisposition	LT	1
(2200,0005)	Barcode Value	BarcodeValue	LT	1
(2200,0006)	Barcode Symbology	BarcodeSymbology	CS	1
(2200,0007)	Allow Media Splitting	AllowMediaSplitting	CS	1
(2200,0008)	Include Non-DICOM Objects	IncludeNonDICOMObjects	CS	1
(2200,0009)	Include Display Application	IncludeDisplayApplication	CS	1
(2200,000A)	Preserve Composite Instances After Media Creation	PreserveCompositeInstancesAfterMediaCreation	CS	1
(2200,000B)	Total Number of Pieces of Media Created	TotalNumberOfPiecesOfMediaCreated	US	1
(2200,000C)	Requested Media Application Profile	RequestedMediaApplicationProfile	LO	1
(2200,000D)	Referenced Storage Media Sequence	ReferencedStorageMediaSequence	SQ	1
(2200,000E)	Failure Attributes	FailureAttributes	AT	1-n
(2200,000F)	Allow Lossy Compression	AllowLossyCompression	CS	1
(2200,0020)	Request Priority	RequestPriority	CS	1
(3002,0002)	RT Image Label	RTImageLabel	SH	1
(3002,0003)	RT Image Name	RTImageName	LO	1
(3002,0004)	RT Image Description	RTImageDescription	ST	1
(3002,000A)	Reported Values Origin	ReportedValuesOrigin	CS	1
(3002,000C)	RT Image Plane	RTImagePlane	CS	1
(3002,000D)	X-Ray Image Receptor Translation	XRayImageReceptorTranslation	DS	3
(3002,000E)	X-Ray Image Receptor Angle	XRayImageReceptorAngle	DS	1
(3002,0010)	RT Image Orientation	RTImageOrientation	DS	6
(3002,0011)	Image Plane Pixel Spacing	ImagePlanePixelSpacing	DS	2
(3002,0012)	RT Image Position	RTImagePosition	DS	2
(3002,0020)	Radiation Machine Name	RadiationMachineName	SH	1
(3002,0022)	Radiation Machine SAD	RadiationMachineSAD	DS	1
(3002,0024)	Radiation Machine SSD	RadiationMachineSSD	DS	1
(3002,0026)	RT Image SID	RTImageSID	DS	1
(3002,0028)	Source to Reference Object Distance	SourceToReferenceObjectDistance	DS	1
(3002,0029)	Fraction Number	FractionNumber	IS	1
(3002,0030)	Exposure Sequence	ExposureSequence	SQ	1
(3002,0032)	Meterset Exposure	MetersetExposure	DS	1
(3002,0034)	Diaphragm Position	DiaphragmPosition	DS	4
(3002,0040)	Fluence Map Sequence	FluenceMapSequence	SQ	1
(3002,0041)	Fluence Data Source	FluenceDataSource	CS	1
(3002,0042)	Fluence Data Scale	FluenceDataScale	DS	1
(3002,0050)	Primary Fluence Mode Sequence	PrimaryFluenceModeSequence	SQ	1
(3002,0051)	Fluence Mode	FluenceMode	CS	1
(3002,0052)	Fluence Mode ID	FluenceModeID	SH	1
(3004,0001)	DVH Type	DVHType	CS	1
(3004,0002)	Dose Units	DoseUnits	CS	1
(3004,0004)	Dose Type	DoseType	CS	1
(3004,0006)	Dose Comment	DoseComment	LO	1
(3004,0008)	Normalization Point	NormalizationPoint	DS	3
(3004,000A)	Dose Summation Type	DoseSummationType	CS	1
(3004,000C)	Grid Frame Offset Vector	GridFrameOffsetVector	DS	2-n
(3004,000E)	Dose Grid Scaling	DoseGridScaling	DS	1
(3004,0010)	RT Dose ROI Sequence	RTDoseROISequence	SQ	1
(3004,0012)	Dose Value	DoseValue	DS	1
(3004,0014)	Tissue Heterogeneity Correction	TissueHeterogeneityCorrection	CS	1-3
(3004,0040)	DVH Normalization Point	DVHNormalizationPoint	DS	3
(3004,0042)	DVH Normalization Dose Value	DVHNormalizationDoseValue	DS	1
(3004,0050)	DVH Sequence	DVHSequence	SQ	1
(3004,0052)	DVH Dose Scaling	DVHDoseScaling	DS	1
(3004,0054)	DVH Volume Units	DVHVolumeUnits	CS	1
(3004,0056)	DVH Number of Bins	DVHNumberOfBins	IS	1
(3004,0058)	DVH Data	DVHData	DS	2-2n
(3004,0060)	DVH Referenced ROI Sequence	DVHReferencedROISequence	SQ	1
(3004,0062)	DVH ROI Contribution Type	DVHROIContributionType	CS	1
(3004,0070)	DVH Minimum Dose	DVHMinimumDose	DS	1
(3004,0072)	DVH Maximum Dose	DVHMaximumDose	DS	1
(3004,0074)	DVH Mean Dose	DVHMeanDose	DS	1
(3006,0002)	Structure Set Label	StructureSetLabel	SH	1
(3006,0004)	Structure Set Name	StructureSetName	LO	1
(3006,0006)	Structure Set Description	StructureSetDescription	ST	1
(3006,0008)	Structure Set Date	StructureSetDate	DA	1
(3006,0009)	Structure Set Time	StructureSetTime	TM	1
(3006,0010)	Referenced Frame of Reference Sequence	ReferencedFrameOfReferenceSequence	SQ	1
(3006,0012)	RT Referenced Study Sequence	RTReferencedStudySequence	SQ	1
(3006,0014)	RT Referenced Series Sequence	RTReferencedSeriesSequence	SQ	1
(3006,0016)	Contour Image Sequence	ContourImageSequence	SQ	1
(3006,0020)	Structure Set ROI Sequence	StructureSetROISequence	SQ	1
(3006,0022)	ROI Number	ROINumber	IS	1
(3006,0024)	Referenced Frame of Reference UID	ReferencedFrameOfReferenceUID	UI	1
(3006,0026)	ROI Name	ROIName	LO	1
(3006,0028)	ROI Description	ROIDescription	ST	1
(3006,002A)	ROI Display Color	ROIDisplayColor	IS	3
(3006,002C)	ROI Volume	ROIVolume	DS	1
(3006,0030)	RT Related ROI Sequence	RTRelatedROISequence	SQ	1
(3006,0033)	RT ROI Relationship	RTROIRelationship	CS	1
(3006,0036)	ROI Generation Algorithm	ROIGenerationAlgorithm	CS	1
(3006,0038)	ROI Generation Description	ROIGenerationDescription	LO	1
(3006,0039)	ROI Contour Sequence	ROIContourSequence	SQ	1
(3006,0040)	Contour Sequence	ContourSequence	SQ	1
(3006,0042)	Contour Geometric Type	ContourGeometricType	CS	1
(3006,0044)	Contour Slab Thickness	ContourSlabThickness	DS	1
(3006,0045)	Contour Offset Vector	ContourOffsetVector	DS	3
(3006,0046)	Number of Contour Points	NumberOfContourPoints	IS	1
(3006,0048)	Contour Number	ContourNumber	IS	1
(3006,0049)	Attached Contours	AttachedContours	IS	1-n
(3006,0050)	Contour Data	ContourData	DS	3-3n
(3006,0080)	RT ROI Observations Sequence	RTROIObservationsSequence	SQ	1
(3006,0082)	Observation Number	ObservationNumber	IS	1
(3006,0084)	Referenced ROI Number	ReferencedROINumber	IS	1
(3006,0085)	ROI Observation Label	ROIObservationLabel	SH	1
(3006,0086)	RT ROI Identification Code Sequence	RTROIIdentificationCodeSequence	SQ	1
(3006,0088)	ROI Observation Description	ROIObservationDescription	ST	1
(3006,00A0)	Related RT ROI Observations Sequence	RelatedRTROIObservationsSequence	SQ	1
(3006,00A4)	RT ROI Interpreted Type	RTROIInterpretedType	CS	1
(3006,00A6)	ROI Interpreter	ROIInterpreter	PN	1
(3006,00B0)	ROI Physical Properties Sequence	ROIPhysicalPropertiesSequence	SQ	1
(3006,00B2)	ROI Physical Property	ROIPhysicalProperty	CS	1
(3006,00B4)	ROI Physical Property Value	ROIPhysicalPropertyValue	DS	1
(3006,00B6)	ROI Elemental Composition Sequence	ROIElementalCompositionSequence	SQ	1
(3006,00B7)	ROI Elemental Composition Atomic Number	ROIElementalCompositionAtomicNumber	US	1
(3006,00B8)	ROI Elemental Composition Atomic Mass Fraction	ROIElementalCompositionAtomicMassFraction	FL	1
(3006,00C0)	Frame of Reference Relationship Sequence	FrameOfReferenceRelationshipSequence	SQ	1
(3006,00C2)	Related Frame of Reference UID	RelatedFrameOfReferenceUID	UI	1
(3006,00C4)	Frame of Reference Transformation Type	FrameOfReferenceTransformationType	CS	1
(3006,00C6)	Frame of Reference Transformation Matrix	FrameOfReferenceTransformationMatrix	DS	16
(3006,00C8)	Frame of Reference Transformation Comment	FrameOfReferenceTransformationComment	LO	1
(3008,0010)	Measured Dose Reference Sequence	MeasuredDoseReferenceSequence	SQ	1
(3008,0012)	Measured Dose Description	MeasuredDoseDescription	ST	1
(3008,0014)	Measured Dose Type	MeasuredDoseType	CS	1
(3008,0016)	Measured Dose Value	MeasuredDoseValue	DS	1
(3008,0020)	Treatment Session Beam Sequence	TreatmentSessionBeamSequence	SQ	1
(3008,0021)	Treatment Session Ion Beam Sequence	TreatmentSessionIonBeamSequence	SQ	1
(3008,0022)	Current Fraction Number	CurrentFractionNumber	IS	1
(3008,0024)	Treatment Control Point Date	TreatmentControlPointDate	DA	1
(3008,0025)	Treatment Control Point Time	TreatmentControlPointTime	TM	1
(3008,002A)	Treatment Termination Status	TreatmentTerminationStatus	CS	1
(3008,002B)	Treatment Termination Code	TreatmentTerminationCode	SH	1
(3008,002C)	Treatment Verification Status	TreatmentVerificationStatus	CS	1
(3008,0030)	Referenced Treatment Record Sequence	ReferencedTreatmentRecordSequence	SQ	1
(3008,0032)	Specified Primary Meterset	SpecifiedPrimaryMeterset	DS	1
(3008,0033)	Specified Secondary Meterset	SpecifiedSecondaryMeterset	DS	1
(3008,0036)	Delivered Primary Meterset	DeliveredPrimaryMeterset	DS	1
(3008,0037)	Delivered Secondary Meterset	DeliveredSecondaryMeterset	DS	1
(3008,003A)	Specified Treatment Time	SpecifiedTreatmentTime	DS	1
(3008,003B)	Delivered Treatment Time	DeliveredTreatmentTime	DS	1
(3008,0040)	Control Point Delivery Sequence	ControlPointDeliverySequence	SQ	1
(3008,0041)	Ion Control Point Delivery Sequence	IonControlPointDeliverySequence	SQ	1
(3008,0042)	Specified Meterset	SpecifiedMeterset	DS	1
(3008,0044)	Delivered Meterset	DeliveredMeterset	DS	1
(3008,0045)	Meterset Rate Set	MetersetRateSet	FL	1
(3008,0046)	Meterset Rate Delivered	MetersetRateDelivered	FL	1
(3008,0047)	Scan Spot Metersets Delivered	ScanSpotMetersetsDelivered	FL	1-n
(3008,0048)	Dose Rate Delivered	DoseRateDelivered	DS	1
(3008,0050)	Treatment Summary Calculated Dose Reference Sequence	TreatmentSummaryCalculatedDoseReferenceSequence	SQ	1
(3008,0052)	Cumulative Dose to Dose Reference	CumulativeDoseToDoseReference	DS	1
(3008,0054)	First Treatment Date	FirstTreatmentDate	DA	1
(3008,0056)	Most Recent Treatment Date	MostRecentTreatmentDate	DA	1
(3008,005A)	Number of Fractions Delivered	NumberOfFractionsDelivered	IS	1
(3008,0060)	Override Sequence	OverrideSequence	SQ	1
(3008,0061)	Parameter Sequence Pointer	ParameterSequencePointer	AT	1
(3008,0062)	Override Parameter Pointer	OverrideParameterPointer	AT	1
(3008,0063)	Parameter Item Index	ParameterItemIndex	IS	1
(3008,0064)	Measured Dose Reference Number	MeasuredDoseReferenceNumber	IS	1
(3008,0065)	Parameter Pointer	ParameterPointer	AT	1
(3008,0066)	Override Reason	OverrideReason	ST	1
(3008,0068)	Corrected Parameter Sequence	CorrectedParameterSequence	SQ	1
(3008,006A)	Correction Value	CorrectionValue	FL	1
(3008,0070)	Calculated Dose Reference Sequence	CalculatedDoseReferenceSequence	SQ	1
(3008,0072)	Calculated Dose Reference Number	CalculatedDoseReferenceNumber	IS	1
(3008,0074)	Calculated Dose Reference Description	CalculatedDoseReferenceDescription	ST	1
(3008,0076)	Calculated Dose Reference Dose Value	CalculatedDoseReferenceDoseValue	DS	1
(3008,0078)	Start Meterset	StartMeterset	DS	1
(3008,007A)	End Meterset	EndMeterset	DS	1
(3008,0080)	Referenced Measured Dose Reference Sequence	ReferencedMeasuredDoseReferenceSequence	SQ	1
(3008,0082)	Referenced Measured Dose Reference Number	ReferencedMeasuredDoseReferenceNumber	IS	1
(3008,0090)	Referenced Calculated Dose Reference Sequence	ReferencedCalculatedDoseReferenceSequence	SQ	1
(3008,0092)	Referenced Calculated Dose Reference Number	ReferencedCalculatedDoseReferenceNumber	IS	1
(3008,00A0)	Beam Limiting Device Leaf Pairs Sequence	BeamLimitingDeviceLeafPairsSequence	SQ	1
(3008,00B0)	Recorded Wedge Sequence	RecordedWedgeSequence	SQ	1
(3008,00C0)	Recorded Compensator Sequence	RecordedCompensatorSequence	SQ	1
(3008,00D0)	Recorded Block Sequence	RecordedBlockSequence	SQ	1
(3008,00E0)	Treatment Summary Measured Dose Reference Sequence	TreatmentSummaryMeasuredDoseReferenceSequence	SQ	1
(3008,00F0)	Recorded Snout Sequence	RecordedSnoutSequence	SQ	1
(3008,00F2)	Recorded Range Shifter Sequence	RecordedRangeShifterSequence	SQ	1
(3008,00F4)	Recorded Lateral Spreading Device Sequence	RecordedLateralSpreadingDeviceSequence	SQ	1
(3008,00F6)	Recorded Range Modulator Sequence	RecordedRangeModulatorSequence	SQ	1
(3008,0100)	Recorded Source Sequence	RecordedSourceSequence	SQ	1
(3008,0105)	Source Serial Number	SourceSerialNumber	LO	1
(3008,0110)	Treatment Session Application Setup Sequence	TreatmentSessionApplicationSetupSequence	SQ	1
(3008,0116)	Application Setup Check	ApplicationSetupCheck	CS	1
(3008,0120)	Recorded Brachy Accessory Device Sequence	RecordedBrachyAccessoryDeviceSequence	SQ	1
(3008,0122)	Referenced Brachy Accessory Device Number	ReferencedBrachyAccessoryDeviceNumber	IS	1
(3008,0130)	Recorded Channel Sequence	RecordedChannelSequence	SQ	1
(3008,0132)	Specified Channel Total Time	SpecifiedChannelTotalTime	DS	1
(3008,0134)	Delivered Channel Total Time	DeliveredChannelTotalTime	DS	1
(3008,0136)	Specified Number of Pulses	SpecifiedNumberOfPulses	IS	1
(3008,0138)	Delivered Number of Pulses	DeliveredNumberOfPulses	IS	1
(3008,013A)	Specified Pulse Repetition Interval	SpecifiedPulseRepetitionInterval	DS	1
(3008,013C)	Delivered Pulse Repetition Interval	DeliveredPulseRepetitionInterval	DS	1
(3008,0140)	Recorded Source Applicator Sequence	RecordedSourceApplicatorSequence	SQ	1
(3008,0142)	Referenced Source Applicator Number	ReferencedSourceApplicatorNumber	IS	1
(3008,0150)	Recorded Channel Shield Sequence	RecordedChannelShieldSequence	SQ	1
(3008,0152)	Referenced Channel Shield Number	ReferencedChannelShieldNumber	IS	1
(3008,0160)	Brachy Control Point Delivered Sequence	BrachyControlPointDeliveredSequence	SQ	1
(3008,0162)	Safe Position Exit Date	SafePositionExitDate	DA	1
(3008,0164)	Safe Position Exit Time	SafePositionExitTime	TM	1
(3008,0166)	Safe Position Return Date	SafePositionReturnDate	DA	1
(3008,0168)	Safe Position Return Time	SafePositionReturnTime	TM	1
(3008,0200)	Current Treatment Status	CurrentTreatmentStatus	CS	1
(3008,0202)	Treatment Status Comment	TreatmentStatusComment	ST	1
(3008,0220)	Fraction Group Summary Sequence	FractionGroupSummarySequence	SQ	1
(3008,0223)	Referenced Fraction Number	ReferencedFractionNumber	IS	1
(3008,0224)	Fraction Group Type	FractionGroupType	CS	1
(3008,0230)	Beam Stopper Position	BeamStopperPosition	CS	1
(3008,0240)	Fraction Status Summary Sequence	FractionStatusSummarySequence	SQ	1
(3008,0250)	Treatment Date	TreatmentDate	DA	1
(3008,0251)	Treatment Time	TreatmentTime	TM	1
(300A,0002)	RT Plan Label	RTPlanLabel	SH	1
(300A,0003)	RT Plan Name	RTPlanName	LO	1
(300A,0004)	RT Plan Description	RTPlanDescription	ST	1
(300A,0006)	RT Plan Date	RTPlanDate	DA	1
(300A,0007)	RT Plan Time	RTPlanTime	TM	1
(300A,0009)	Treatment Protocols	TreatmentProtocols	LO	1-n
(300A,000A)	Plan Intent	PlanIntent	CS	1
(300A,000B)	Treatment Sites	TreatmentSites	LO	1-n
(300A,000C)	RT Plan Geometry	RTPlanGeometry	CS	1
(300A,000E)	Prescription Description	PrescriptionDescription	ST	1
(300A,0010)	Dose Reference Sequence	DoseReferenceSequence	SQ	1
(300A,0012)	Dose Reference Number	DoseReferenceNumber	IS	1
(300A,0013)	Dose Reference UID	DoseReferenceUID	UI	1
(300A,0014)	Dose Reference Structure Type	DoseReferenceStructureType	CS	1
(300A,0015)	Nominal Beam Energy Unit	NominalBeamEnergyUnit	CS	1
(300A,0016)	Dose Reference Description	DoseReferenceDescription	LO	1
(300A,0018)	Dose Reference Point Coordinates	DoseReferencePointCoordinates	DS	3
(300A,001A)	Nominal Prior Dose	NominalPriorDose	DS	1
(300A,0020)	Dose Reference Type	DoseReferenceType	CS	1
(300A,0021)	Constraint Weight	ConstraintWeight	DS	1
(300A,0022)	Delivery Warning Dose	DeliveryWarningDose	DS	1
(300A,0023)	Delivery Maximum Dose	DeliveryMaximumDose	DS	1
(300A,0025)	Target Minimum Dose	TargetMinimumDose	DS	1
(300A,0026)	Target Prescription Dose	TargetPrescriptionDose	DS	1
(300A,0027)	Target Maximum Dose	TargetMaximumDose	DS	1
(300A,0028)	Target Underdose Volume Fraction	TargetUnderdoseVolumeFraction	DS	1
(300A,002A)	Organ at Risk Full-volume Dose	OrganAtRiskFullVolumeDose	DS	1
(300A,002B)	Organ at Risk Limit Dose	OrganAtRiskLimitDose	DS	1
(300A,002C)	Organ at Risk Maximum Dose	OrganAtRiskMaximumDose	DS	1
(300A,002D)	Organ at Risk Overdose Volume Fraction	OrganAtRiskOverdoseVolumeFraction	DS	1
(300A,0040)	Tolerance Table Sequence	ToleranceTableSequence	SQ	1
(300A,0042)	Tolerance Table Number	ToleranceTableNumber	IS	1
(300A,0043)	Tolerance Table Label	ToleranceTableLabel	SH	1
(300A,0044)	Gantry Angle Tolerance	GantryAngleTolerance	DS	1
(300A,0046)	Beam Limiting Device Angle Tolerance	BeamLimitingDeviceAngleTolerance	DS	1
(300A,0048)	Beam Limiting Device Tolerance Sequence	BeamLimitingDeviceToleranceSequence	SQ	1
(300A,004A)	Beam Limiting Device Position Tolerance	BeamLimitingDevicePositionTolerance	DS	1
(300A,004B)	Snout Position Tolerance	SnoutPositionTolerance	FL	1
(300A,004C)	Patient Support Angle Tolerance	PatientSupportAngleTolerance	DS	1
(300A,004E)	Table Top Eccentric Angle Tolerance	TableTopEccentricAngleTolerance	DS	1
(300A,004F)	Table Top Pitch Angle Tolerance	TableTopPitchAngleTolerance	FL	1
(300A,0050)	Table Top Roll Angle Tolerance	TableTopRollAngleTolerance	FL	1
(300A,0051)	Table Top Vertical Position Tolerance	TableTopVerticalPositionTolerance	DS	1
(300A,0052)	Table Top Longitudinal Position Tolerance	TableTopLongitudinalPositionTolerance	DS	1
(300A,0053)	Table Top Lateral Position Tolerance	TableTopLateralPositionTolerance	DS	1
(300A,0055)	RT Plan Relationship	RTPlanRelationship	CS	1
(300A,0070)	Fraction Group Sequence	FractionGroupSequence	SQ	1
(300A,0071)	Fraction Group Number	FractionGroupNumber	IS	1
(300A,0072)	Fraction Group Description	FractionGroupDescription	LO	1
(300A,0078)	Number of Fractions Planned	NumberOfFractionsPlanned	IS	1
(300A,0079)	Number of Fraction Pattern Digits Per Day	NumberOfFractionPatternDigitsPerDay	IS	1
(300A,007A)	Repeat Fraction Cycle Length	RepeatFractionCycleLength	IS	1
(300A,007B)	Fraction Pattern	FractionPattern	LT	1
(300A,0080)	Number of Beams	NumberOfBeams	IS	1
(300A,0082)	Beam Dose Specification Point	BeamDoseSpecificationPoint	DS	3
(300A,0084)	Beam Dose	BeamDose	DS	1
(300A,0086)	Beam Meterset	BeamMeterset	DS	1
(300A,0088)	Beam Dose Point Depth	BeamDosePointDepth	FL	1
(300A,0089)	Beam Dose Point Equivalent Depth	BeamDosePointEquivalentDepth	FL	1
(300A,008A)	Beam Dose Point SSD	BeamDosePointSSD	FL	1
(300A,00A0)	Number of Brachy Application Setups	NumberOfBrachyApplicationSetups	IS	1
(300A,00A2)	Brachy Application Setup Dose Specification Point	BrachyApplicationSetupDoseSpecificationPoint	DS	3
(300A,00A4)	Brachy Application Setup Dose	BrachyApplicationSetupDose	DS	1
(300A,00B0)	Beam Sequence	BeamSequence	SQ	1
(300A,00B2)	Treatment Machine Name	TreatmentMachineName	SH	1
(300A,00B3)	Primary Dosimeter Unit	PrimaryDosimeterUnit	CS	1
(300A,00B4)	Source-Axis Distance	SourceAxisDistance	DS	1
(300A,00B6)	Beam Limiting Device Sequence	BeamLimitingDeviceSequence	SQ	1
(300A,00B8)	RT Beam Limiting Device Type	RTBeamLimitingDeviceType	CS	1
(300A,00BA)	Source to Beam Limiting Device Distance	SourceToBeamLimitingDeviceDistance	DS	1
(300A,00BB)	Isocenter to Beam Limiting Device Distance	IsocenterToBeamLimitingDeviceDistance	FL	1
(300A,00BC)	Number of Leaf/Jaw Pairs	NumberOfLeafJawPairs	IS	1
(300A,00BE)	Leaf Position Boundaries	LeafPositionBoundaries	DS	3-n
(300A,00C0)	Beam Number	BeamNumber	IS	1
(300A,00C2)	Beam Name	BeamName	LO	1
(300A,00C3)	Beam Description	BeamDescription	ST	1
(300A,00C4)	Beam Type	BeamType	CS	1
(300A,00C6)	Radiation Type	RadiationType	CS	1
(300A,00C7)	High-Dose Technique Type	HighDoseTechniqueType	CS	1
(300A,00C8)	Reference Image Number	ReferenceImageNumber	IS	1
(300A,00CA)	Planned Verification Image Sequence	PlannedVerificationImageSequence	SQ	1
(300A,00CC)	Imaging Device-Specific Acquisition Parameters	ImagingDeviceSpecificAcquisitionParameters	LO	1-n
(300A,00CE)	Treatment Delivery Type	TreatmentDeliveryType	CS	1
(300A,00D0)	Number of Wedges	NumberOfWedges	IS	1
(300A,00D1)	Wedge Sequence	WedgeSequence	SQ	1
(300A,00D2)	Wedge Number	WedgeNumber	IS	1
(300A,00D3)	Wedge Type	WedgeType	CS	1
(300A,00D4)	Wedge ID	WedgeID	SH	1
(300A,00D5)	Wedge Angle	WedgeAngle	IS	1
(300A,00D6)	Wedge Factor	WedgeFactor	DS	1
(300A,00D7)	Total Wedge Tray Water-Equivalent Thickness	TotalWedgeTrayWaterEquivalentThickness	FL	1
(300A,00D8)	Wedge Orientation	WedgeOrientation	DS	1
(300A,00D9)	Isocenter to Wedge Tray Distance	IsocenterToWedgeTrayDistance	FL	1
(300A,00DA)	Source to Wedge Tray Distance	SourceToWedgeTrayDistance	DS	1
(300A,00DB)	Wedge Thin Edge Position	WedgeThinEdgePosition	FL	1
(300A,00DC)	Bolus ID	BolusID	SH	1
(300A,00DD)	Bolus Description	BolusDescription	ST	1
(300A,00E0)	Number of Compensators	NumberOfCompensators	IS	1
(300A,00E1)	Material ID	MaterialID	SH	1
(300A,00E2)	Total Compensator Tray Factor	TotalCompensatorTrayFactor	DS	1
(300A,00E3)	Compensator Sequence	CompensatorSequence	SQ	1
(300A,00E4)	Compensator Number	CompensatorNumber	IS	1
(300A,00E5)	Compensator ID	CompensatorID	SH	1
(300A,00E6)	Source to Compensator Tray Distance	SourceToCompensatorTrayDistance	DS	1
(300A,00E7)	Compensator Rows	CompensatorRows	IS	1
(300A,00E8)	Compensator Columns	CompensatorColumns	IS	1
(300A,00E9)	Compensator Pixel Spacing	CompensatorPixelSpacing	DS	2
(300A,00EA)	Compensator Position	CompensatorPosition	DS	2
(300A,00EB)	Compensator Transmission Data	CompensatorTransmissionData	DS	1-n
(300A,00EC)	Compensator Thickness Data	CompensatorThicknessData	DS	1-n
(300A,00ED)	Number of Boli	NumberOfBoli	IS	1
(300A,00EE)	Compensator Type	CompensatorType	CS	1
(300A,00F0)	Number of Blocks	NumberOfBlocks	IS	1
(300A,00F2)	Total Block Tray Factor	TotalBlockTrayFactor	DS	1
(300A,00F3)	Total Block Tray Water-Equivalent Thickness	TotalBlockTrayWaterEquivalentThickness	FL	1
(300A,00F4)	Block Sequence	BlockSequence	SQ	1
(300A,00F5)	Block Tray ID	BlockTrayID	SH	1
(300A,00F6)	Source to Block Tray Distance	SourceToBlockTrayDistance	DS	1
(300A,00F7)	Isocenter to Block Tray Distance	IsocenterToBlockTrayDistance	FL	1
(300A,00F8)	Block Type	BlockType	CS	1
(300A,00F9)	Accessory Code	AccessoryCode	LO	1
(300A,00FA)	Block Divergence	BlockDivergence	CS	1
(300A,00FB)	Block Mounting Position	BlockMountingPosition	CS	1
(300A,00FC)	Block Number	BlockNumber	IS	1
(300A,00FE)	Block Name	BlockName	LO	1
(300A,0100)	Block Thickness	BlockThickness	DS	1
(300A,0102)	Block Transmission	BlockTransmission	DS	1
(300A,0104)	Block Number of Points	BlockNumberOfPoints	IS	1
(300A,0106)	Block Data	BlockData	DS	2-2n
(300A,0107)	Applicator Sequence	ApplicatorSequence	SQ	1
(300A,0108)	Applicator ID	ApplicatorID	SH	1
(300A,0109)	Applicator Type	ApplicatorType	CS	1
(300A,010A)	Applicator Description	ApplicatorDescription	LO	1
(300A,010C)	Cumulative Dose Reference Coefficient	CumulativeDoseReferenceCoefficient	DS	1
(300A,010E)	Final Cumulative Meterset Weight	FinalCumulativeMetersetWeight	DS	1
(300A,0110)	Number of Control Points	NumberOfControlPoints	IS	1
(300A,0111)	Control Point Sequence	ControlPointSequence	SQ	1
(300A,0112)	Control Point Index	ControlPointIndex	IS	1
(300A,0114)	Nominal Beam Energy	NominalBeamEnergy	DS	1
(300A,0115)	Dose Rate Set	DoseRateSet	DS	1
(300A,0116)	Wedge Position Sequence	WedgePositionSequence	SQ	1
(300A,0118)	Wedge Position	WedgePosition	CS	1
(300A,011A)	Beam Limiting Device Position Sequence	BeamLimitingDevicePositionSequence	SQ	1
(300A,011C)	Leaf/Jaw Positions	LeafJawPositions	DS	2-2n
(300A,011E)	Gantry Angle	GantryAngle	DS	1
(300A,011F)	Gantry Rotation Direction	GantryRotationDirection	CS	1
(300A,0120)	Beam Limiting Device Angle	BeamLimitingDeviceAngle	DS	1
(300A,0121)	Beam Limiting Device Rotation Direction	BeamLimitingDeviceRotationDirection	CS	1
(300A,0122)	Patient Support Angle	PatientSupportAngle	DS	1
(300A,0123)	Patient Support Rotation Direction	PatientSupportRotationDirection	CS	1
(300A,0124)	Table Top Eccentric Axis Distance	TableTopEccentricAxisDistance	DS	1
(300A,0125)	Table Top Eccentric Angle	TableTopEccentricAngle	DS	1
(300A,0126)	Table Top Eccentric Rotation Direction	TableTopEccentricRotationDirection	CS	1
(300A,0128)	Table Top Vertical Position	TableTopVerticalPosition	DS	1
(300A,0129)	Table Top Longitudinal Position	TableTopLongitudinalPosition	DS	1
(300A,012A)	Table Top Lateral Position	TableTopLateralPosition	DS	1
(300A,012C)	Isocenter Position	IsocenterPosition	DS	3
(300A,012E)	Surface Entry Point	SurfaceEntryPoint	DS	3
(300A,0130)	Source to Surface Distance	SourceToSurfaceDistance	DS	1
(300A,0134)	Cumulative Meterset Weight	CumulativeMetersetWeight	DS	1
(300A,0140)	Table Top Pitch Angle	TableTopPitchAngle	FL	1
(300A,0142)	Table Top Pitch Rotation Direction	TableTopPitchRotationDirection	CS	1
(300A,0144)	Table Top Roll Angle	TableTopRollAngle	FL	1
(300A,0146)	Table Top Roll Rotation Direction	TableTopRollRotationDirection	CS	1
(300A,0148)	Head Fixation Angle	HeadFixationAngle	FL	1
(300A,014A)	Gantry Pitch Angle	GantryPitchAngle	FL	1
(300A,014C)	Gantry Pitch Rotation Direction	GantryPitchRotationDirection	CS	1
(300A,014E)	Gantry Pitch Angle Tolerance	GantryPitchAngleTolerance	FL	1
(300A,0180)	Patient Setup Sequence	PatientSetupSequence	SQ	1
(300A,0182)	Patient Setup Number	PatientSetupNumber	IS	1
(300A,0183)	Patient Setup Label	PatientSetupLabel	LO	1
(300A,0184)	Patient Additional Position	PatientAdditionalPosition	LO	1
(300A,0190)	Fixation Device Sequence	FixationDeviceSequence	SQ	1
(300A,0192)	Fixation Device Type	FixationDeviceType	CS	1
(300A,0194)	Fixation Device Label	FixationDeviceLabel	SH	1
(300A,0196)	Fixation Device Description	FixationDeviceDescription	ST	1
(300A,0198)	Fixation Device Position	FixationDevicePosition	SH	1
(300A,0199)	Fixation Device Pitch Angle	FixationDevicePitchAngle	FL	1
(300A,019A)	Fixation Device Roll Angle	FixationDeviceRollAngle	FL	1
(300A,01A0)	Shielding Device Sequence	ShieldingDeviceSequence	SQ	1
(300A,01A2)	Shielding Device Type	ShieldingDeviceType	CS	1
(300A,01A4)	Shielding Device Label	ShieldingDeviceLabel	SH	1
(300A,01A6)	Shielding Device Description	ShieldingDeviceDescription	ST	1
(300A,01A8)	Shielding Device Position	ShieldingDevicePosition	SH	1
(300A,01B0)	Setup Technique	SetupTechnique	CS	1
(300A,01B2)	Setup Technique Description	SetupTechniqueDescription	ST	1
(300A,01B4)	Setup Device Sequence	SetupDeviceSequence	SQ	1
(300A,01B6)	Setup Device Type	SetupDeviceType	CS	1
(300A,01B8)	Setup Device Label	SetupDeviceLabel	SH	1
(300A,01BA)	Setup Device Description	SetupDeviceDescription	ST	1
(300A,01BC)	Setup Device Parameter	SetupDeviceParameter	DS	1
(300A,01D0)	Setup Reference Description	SetupReferenceDescription	ST	1
(300A,01D2)	Table Top Vertical Setup Displacement	TableTopVerticalSetupDisplacement	DS	1
(300A,01D4)	Table Top Longitudinal Setup Displacement	TableTopLongitudinalSetupDisplacement	DS	1
(300A,01D6)	Table Top Lateral Setup Displacement	TableTopLateralSetupDisplacement	DS	1
(300A,0200)	Brachy Treatment Technique	BrachyTreatmentTechnique	CS	1
(300A,0202)	Brachy Treatment Type	BrachyTreatmentType	CS	1
(300A,0206)	Treatment Machine Sequence	TreatmentMachineSequence	SQ	1
(300A,0210)	Source Sequence	SourceSequence	SQ	1
(300A,0212)	Source Number	SourceNumber	IS	1
(300A,0214)	Source Type	SourceType	CS	1
(300A,0216)	Source Manufacturer	SourceManufacturer	LO	1
(300A,0218)	Active Source Diameter	ActiveSourceDiameter	DS	1
(300A,021A)	Active Source Length	ActiveSourceLength	DS	1
(300A,0222)	Source Encapsulation Nominal Thickness	SourceEncapsulationNominalThickness	DS	1
(300A,0224)	Source Encapsulation Nominal Transmission	SourceEncapsulationNominalTransmission	DS	1
(300A,0226)	Source Isotope Name	SourceIsotopeName	LO	1
(300A,0228)	Source Isotope Half Life	SourceIsotopeHalfLife	DS	1
(300A,0229)	Source Strength Units	SourceStrengthUnits	CS	1
(300A,022A)	Reference Air Kerma Rate	ReferenceAirKermaRate	DS	1
(300A,022B)	Source Strength	SourceStrength	DS	1
(300A,022C)	Source Strength Reference Date	SourceStrengthReferenceDate	DA	1
(300A,022E)	Source Strength Reference Time	SourceStrengthReferenceTime	TM	1
(300A,0230)	Application Setup Sequence	ApplicationSetupSequence	SQ	1
(300A,0232)	Application Setup Type	ApplicationSetupType	CS	1
(300A,0234)	Application Setup Number	ApplicationSetupNumber	IS	1
(300A,0236)	Application Setup Name	ApplicationSetupName	LO	1
(300A,0238)	Application Setup Manufacturer	ApplicationSetupManufacturer	LO	1
(300A,0240)	Template Number	TemplateNumber	IS	1
(300A,0242)	Template Type	TemplateType	SH	1
(300A,0244)	Template Name	TemplateName	LO	1
(300A,0250)	Total Reference Air Kerma	TotalReferenceAirKerma	DS	1
(300A,0260)	Brachy Accessory Device Sequence	BrachyAccessoryDeviceSequence	SQ	1
(300A,0262)	Brachy Accessory Device Number	BrachyAccessoryDeviceNumber	IS	1
(300A,0263)	Brachy Accessory Device ID	BrachyAccessoryDeviceID	SH	1
(300A,0264)	Brachy Accessory Device Type	BrachyAccessoryDeviceType	CS	1
(300A,0266)	Brachy Accessory Device Name	BrachyAccessoryDeviceName	LO	1
(300A,026A)	Brachy Accessory Device Nominal Thickness	BrachyAccessoryDeviceNominalThickness	DS	1
(300A,026C)	Brachy Accessory Device Nominal Transmission	BrachyAccessoryDeviceNominalTransmission	DS	1
(300A,0280)	Channel Sequence	ChannelSequence	SQ	1
(300A,0282)	Channel Number	ChannelNumber	IS	1
(300A,0284)	Channel Length	ChannelLength	DS	1
(300A,0286)	Channel Total Time	ChannelTotalTime	DS	1
(300A,0288)	Source Movement Type	SourceMovementType	CS	1
(300A,028A)	Number of Pulses	NumberOfPulses	IS	1
(300A,028C)	Pulse Repetition Interval	PulseRepetitionInterval	DS	1
(300A,0290)	Source Applicator Number	SourceApplicatorNumber	IS	1
(300A,0291)	Source Applicator ID	SourceApplicatorID	SH	1
(300A,0292)	Source Applicator Type	SourceApplicatorType	CS	1
(300A,0294)	Source Applicator Name	SourceApplicatorName	LO	1
(300A,0296)	Source Applicator Length	SourceApplicatorLength	DS	1
(300A,0298)	Source Applicator Manufacturer	SourceApplicatorManufacturer	LO	1
(300A,029C)	Source Applicator Wall Nominal Thickness	SourceApplicatorWallNominalThickness	DS	1
(300A,029E)	Source Applicator Wall Nominal Transmission	SourceApplicatorWallNominalTransmission	DS	1
(300A,02A0)	Source Applicator Step Size	SourceApplicatorStepSize	DS	1
(300A,02A2)	Transfer Tube Number	TransferTubeNumber	IS	1
(300A,02A4)	Transfer Tube Length	TransferTubeLength	DS	1
(300A,02B0)	Channel Shield Sequence	ChannelShieldSequence	SQ	1
(300A,02B2)	Channel Shield Number	ChannelShieldNumber	IS	1
(300A,02B3)	Channel Shield ID	ChannelShieldID	SH	1
(300A,02B4)	Channel Shield Name	ChannelShieldName	LO	1
(300A,02B8)	Channel Shield Nominal Thickness	ChannelShieldNominalThickness	DS	1
(300A,02BA)	Channel Shield Nominal Transmission	ChannelShieldNominalTransmission	DS	1
(300A,02C8)	Final Cumulative Time Weight	FinalCumulativeTimeWeight	DS	1
(300A,02D0)	Brachy Control Point Sequence	BrachyControlPointSequence	SQ	1
(300A,02D2)	Control Point Relative Position	ControlPointRelativePosition	DS	1
(300A,02D4)	Control Point 3D Position	ControlPoint3DPosition	DS	3
(300A,02D6)	Cumulative Time Weight	CumulativeTimeWeight	DS	1
(300A,02E0)	Compensator Divergence	CompensatorDivergence	CS	1
(300A,02E1)	Compensator Mounting Position	CompensatorMountingPosition	CS	1
(300A,02E2)	Source to Compensator Distance	SourceToCompensatorDistance	DS	1-n
(300A,02E3)	Total Compensator Tray Water-Equivalent Thickness	TotalCompensatorTrayWaterEquivalentThickness	FL	1
(300A,02E4)	Isocenter to Compensator Tray Distance	IsocenterToCompensatorTrayDistance	FL	1
(300A,02E5)	Compensator Column Offset	CompensatorColumnOffset	FL	1
(300A,02E6)	Isocenter to Compensator Distances	IsocenterToCompensatorDistances	FL	1-n
(300A,02E7)	Compensator Relative Stopping Power Ratio	CompensatorRelativeStoppingPowerRatio	FL	1
(300A,02E8)	Compensator Milling Tool Diameter	CompensatorMillingToolDiameter	FL	1
(300A,02EA)	Ion Range Compensator Sequence	IonRangeCompensatorSequence	SQ	1
(300A,02EB)	Compensator Description	CompensatorDescription	LT	1
(300A,0302)	Radiation Mass Number	RadiationMassNumber	IS	1
(300A,0304)	Radiation Atomic Number	RadiationAtomicNumber	IS	1
(300A,0306)	Radiation Charge State	RadiationChargeState	SS	1
(300A,0308)	Scan Mode	ScanMode	CS	1
(300A,030A)	Virtual Source-Axis Distances	VirtualSourceAxisDistances	FL	2
(300A,030C)	Snout Sequence	SnoutSequence	SQ	1
(300A,030D)	Snout Position	SnoutPosition	FL	1
(300A,030F)	Snout ID	SnoutID	SH	1
(300A,0312)	Number of Range Shifters	NumberOfRangeShifters	IS	1
(300A,0314)	Range Shifter Sequence	RangeShifterSequence	SQ	1
(300A,0316)	Range Shifter Number	RangeShifterNumber	IS	1
(300A,0318)	Range Shifter ID	RangeShifterID	SH	1
(300A,0320)	Range Shifter Type	RangeShifterType	CS	1
(300A,0322)	Range Shifter Description	RangeShifterDescription	LO	1
(300A,0330)	Number of Lateral Spreading Devices	NumberOfLateralSpreadingDevices	IS	1
(300A,0332)	Lateral Spreading Device Sequence	LateralSpreadingDeviceSequence	SQ	1
(300A,0334)	Lateral Spreading Device Number	LateralSpreadingDeviceNumber	IS	1
(300A,0336)	Lateral Spreading Device ID	LateralSpreadingDeviceID	SH	1
(300A,0338)	Lateral Spreading Device Type	LateralSpreadingDeviceType	CS	1
(300A,033A)	Lateral Spreading Device Description	LateralSpreadingDeviceDescription	LO	1
(300A,033C)	Lateral Spreading Device Water Equivalent Thickness	LateralSpreadingDeviceWaterEquivalentThickness	FL	1
(300A,0340)	Number of Range Modulators	NumberOfRangeModulators	IS	1
(300A,0342)	Range Modulator Sequence	RangeModulatorSequence	SQ	1
(300A,0344)	Range Modulator Number	RangeModulatorNumber	IS	1
(300A,0346)	Range Modulator ID	RangeModulatorID	SH	1
(300A,0348)	Range Modulator Type	RangeModulatorType	CS	1
(300A,034A)	Range Modulator Description	RangeModulatorDescription	LO	1
(300A,034C)	Beam Current Modulation ID	BeamCurrentModulationID	SH	1
(300A,0350)	Patient Support Type	PatientSupportType	CS	1
(300A,0352)	Patient Support ID	PatientSupportID	SH	1
(300A,0354)	Patient Support Accessory Code	PatientSupportAccessoryCode	LO	1
(300A,0356)	Fixation Light Azimuthal Angle	FixationLightAzimuthalAngle	FL	1
(300A,0358)	Fixation Light Polar Angle	FixationLightPolarAngle	FL	1
(300A,035A)	Meterset Rate	MetersetRate	FL	1
(300A,0360)	Range Shifter Settings Sequence	RangeShifterSettingsSequence	SQ	1
(300A,0362)	Range Shifter Setting	RangeShifterSetting	LO	1
(300A,0364)	Isocenter to Range Shifter Distance	IsocenterToRangeShifterDistance	FL	1
(300A,0366)	Range Shifter Water Equivalent Thickness	RangeShifterWaterEquivalentThickness	FL	1
(300A,0370)	Lateral Spreading Device Settings Sequence	LateralSpreadingDeviceSettingsSequence	SQ	1
(300A,0372)	Lateral Spreading Device Setting	LateralSpreadingDeviceSetting	LO	1
(300A,0374)	Isocenter to Lateral Spreading Device Distance	IsocenterToLateralSpreadingDeviceDistance	FL	1
(300A,0380)	Range Modulator Settings Sequence	RangeModulatorSettingsSequence	SQ	1
(300A,0382)	Range Modulator Gating Start Value	RangeModulatorGatingStartValue	FL	1
(300A,0384)	Range Modulator Gating Stop Value	RangeModulatorGatingStopValue	FL	1
(300A,0386)	Range Modulator Gating Start Water Equivalent Thickness	RangeModulatorGatingStartWaterEquivalentThickness	FL	1
(300A,0388)	Range Modulator Gating Stop Water Equivalent Thickness	RangeModulatorGatingStopWaterEquivalentThickness	FL	1
(300A,038A)	Isocenter to Range Modulator Distance	IsocenterToRangeModulatorDistance	FL	1
(300A,0390)	Scan Spot Tune ID	ScanSpotTuneID	SH	1
(300A,0392)	Number of Scan Spot Positions	NumberOfScanSpotPositions	IS	1
(300A,0394)	Scan Spot Position Map	ScanSpotPositionMap	FL	1-n
(300A,0396)	Scan Spot Meterset Weights	ScanSpotMetersetWeights	FL	1-n
(300A,0398)	Scanning Spot Size	ScanningSpotSize	FL	2
(300A,039A)	Number of Paintings	NumberOfPaintings	IS	1
(300A,03A0)	Ion Tolerance Table Sequence	IonToleranceTableSequence	SQ	1
(300A,03A2)	Ion Beam Sequence	IonBeamSequence	SQ	1
(300A,03A4)	Ion Beam Limiting Device Sequence	IonBeamLimitingDeviceSequence	SQ	1
(300A,03A6)	Ion Block Sequence	IonBlockSequence	SQ	1
(300A,03A8)	Ion Control Point Sequence	IonControlPointSequence	SQ	1
(300A,03AA)	Ion Wedge Sequence	IonWedgeSequence	SQ	1
(300A,03AC)	Ion Wedge Position Sequence	IonWedgePositionSequence	SQ	1
(300A,0401)	Referenced Setup Image Sequence	ReferencedSetupImageSequence	SQ	1
(300A,0402)	Setup Image Comment	SetupImageComment	ST	1
(300A,0410)	Motion Synchronization Sequence	MotionSynchronizationSequence	SQ	1
(300A,0412)	Control Point Orientation	ControlPointOrientation	FL	3
(300A,0420)	General Accessory Sequence	GeneralAccessorySequence	SQ	1
(300A,0421)	General Accessory ID	GeneralAccessoryID	SH	1
(300A,0422)	General Accessory Description	GeneralAccessoryDescription	ST	1
(300A,0423)	General Accessory Type	GeneralAccessoryType	CS	1
(300A,0424)	General Accessory Number	GeneralAccessoryNumber	IS	1
(300A,0431)	Applicator Geometry Sequence	ApplicatorGeometrySequence	SQ	1
(300A,0432)	Applicator Aperture Shape	ApplicatorApertureShape	CS	1
(300A,0433)	Applicator Opening	ApplicatorOpening	FL	1
(300A,0434)	Applicator Opening X	ApplicatorOpeningX	FL	1
(300A,0435)	Applicator Opening Y	ApplicatorOpeningY	FL	1
(300A,0436)	Source to Applicator Mounting Position Distance	SourceToApplicatorMountingPositionDistance	FL	1
(300C,0002)	Referenced RT Plan Sequence	ReferencedRTPlanSequence	SQ	1
(300C,0004)	Referenced Beam Sequence	ReferencedBeamSequence	SQ	1
(300C,0006)	Referenced Beam Number	ReferencedBeamNumber	IS	1
(300C,0007)	Referenced Reference Image Number	ReferencedReferenceImageNumber	IS	1
(300C,0008)	Start Cumulative Meterset Weight	StartCumulativeMetersetWeight	DS	1
(300C,0009)	End Cumulative Meterset Weight	EndCumulativeMetersetWeight	DS	1
(300C,000A)	Referenced Brachy Application Setup Sequence	ReferencedBrachyApplicationSetupSequence	SQ	1
(300C,000C)	Referenced Brachy Application Setup Number	ReferencedBrachyApplicationSetupNumber	IS	1
(300C,000E)	Referenced Source Number	ReferencedSourceNumber	IS	1
(300C,0020)	Referenced Fraction Group Sequence	ReferencedFractionGroupSequence	SQ	1
(300C,0022)	Referenced Fraction Group Number	ReferencedFractionGroupNumber	IS	1
(300C,0040)	Referenced Verification Image Sequence	ReferencedVerificationImageSequence	SQ	1
(300C,0042)	Referenced Reference Image Sequence	ReferencedReferenceImageSequence	SQ	1
(300C,0050)	Referenced Dose Reference Sequence	ReferencedDoseReferenceSequence	SQ	1
(300C,0051)	Referenced Dose Reference Number	ReferencedDoseReferenceNumber	IS	1
(300C,0055)	Brachy Referenced Dose Reference Sequence	BrachyReferencedDoseReferenceSequence	SQ	1
(300C,0060)	Referenced Structure Set Sequence	ReferencedStructureSetSequence	SQ	1
(300C,006A)	Referenced Patient Setup Number	ReferencedPatientSetupNumber	IS	1
(300C,0080)	Referenced Dose Sequence	ReferencedDoseSequence	SQ	1
(300C,00A0)	Referenced Tolerance Table Number	ReferencedToleranceTableNumber	IS	1
(300C,00B0)	Referenced Bolus Sequence	ReferencedBolusSequence	SQ	1
(300C,00C0)	Referenced Wedge Number	ReferencedWedgeNumber	IS	1
(300C,00D0)	Referenced Compensator Number	ReferencedCompensatorNumber	IS	1
(300C,00E0)	Referenced Block Number	ReferencedBlockNumber	IS	1
(300C,00F0)	Referenced Control Point Index	ReferencedControlPointIndex	IS	1
(300C,00F2)	Referenced Control Point Sequence	ReferencedControlPointSequence	SQ	1
(300C,00F4)	Referenced Start Control Point Index	ReferencedStartControlPointIndex	IS	1
(300C,00F6)	Referenced Stop Control Point Index	ReferencedStopControlPointIndex	IS	1
(300C,0100)	Referenced Range Shifter Number	ReferencedRangeShifterNumber	IS	1
(300C,0102)	Referenced Lateral Spreading Device Number	ReferencedLateralSpreadingDeviceNumber	IS	1
(300C,0104)	Referenced Range Modulator Number	ReferencedRangeModulatorNumber	IS	1
(300E,0002)	Approval Status	ApprovalStatus	CS	1
(300E,0004)	Review Date	ReviewDate	DA	1
(300E,0005)	Review Time	ReviewTime	TM	1
(300E,0008)	Reviewer Name	ReviewerName	PN	1
(4000,0010)	Arbitrary	Arbitrary	LT	1	RET
(4000,4000)	Text Comments	TextComments	LT	1	RET
(4008,0040)	Results ID	ResultsID	SH	1	RET
(4008,0042)	Results ID Issuer	ResultsIDIssuer	LO	1	RET
(4008,0050)	Referenced Interpretation Sequence	ReferencedInterpretationSequence	SQ	1	RET
(4008,00FF)	Report Production Status (Trial)	ReportProductionStatusTrial	CS	1	RET
(4008,0100)	Interpretation Recorded Date	InterpretationRecordedDate	DA	1	RET
(4008,0101)	Interpretation Recorded Time	InterpretationRecordedTime	TM	1	RET
(4008,0102)	Interpretation Recorder	InterpretationRecorder	PN	1	RET
(4008,0103)	Reference to Recorded Sound	ReferenceToRecordedSound	LO	1	RET
(4008,0108)	Interpretation Transcription Date	InterpretationTranscriptionDate	DA	1	RET
(4008,0109)	Interpretation Transcription Time	InterpretationTranscriptionTime	TM	1	RET
(4008,010A)	Interpretation Transcriber	InterpretationTranscriber	PN	1	RET
(4008,010B)	Interpretation Text	InterpretationText	ST	1	RET
(4008,010C)	Interpretation Author	InterpretationAuthor	PN	1	RET
(4008,0111)	Interpretation Approver Sequence	InterpretationApproverSequence	SQ	1	RET
(4008,0112)	Interpretation Approval Date	InterpretationApprovalDate	DA	1	RET
(4008,0113)	Interpretation Approval Time	InterpretationApprovalTime	TM	1	RET
(4008,0114)	Physician Approving Interpretation	PhysicianApprovingInterpretation	PN	1	RET
(4008,0115)	Interpretation Diagnosis Description	InterpretationDiagnosisDescription	LT	1	RET
(4008,0117)	Interpretation Diagnosis Code Sequence	InterpretationDiagnosisCodeSequence	SQ	1	RET
(4008,0118)	Results Distribution List Sequence	ResultsDistributionListSequence	SQ	1	RET
(4008,0119)	Distribution Name	DistributionName	PN	1	RET
(4008,011A)	Distribution Address	DistributionAddress	LO	1	RET
(4008,0200)	Interpretation ID	InterpretationID	SH	1	RET
(4008,0202)	Interpretation ID Issuer	InterpretationIDIssuer	LO	1	RET
(4008,0210)	Interpretation Type ID	InterpretationTypeID	CS	1	RET
(4008,0212)	Interpretation Status ID	InterpretationStatusID	CS	1	RET
(4008,0300)	Impressions	Impressions	ST	1	RET
(4008,4000)	Results Comments	ResultsComments	ST	1	RET
(4010,0001)	Low Energy Detectors	LowEnergyDetectors	CS	1
(4010,0002)	High Energy Detectors	HighEnergyDetectors	CS	1
(4010,0004)	Detector Geometry Sequence	DetectorGeometrySequence	SQ	1
(4010,1001)	Threat ROI Voxel Sequence	ThreatROIVoxelSequence	SQ	1
(4010,1004)	Threat ROI Base	ThreatROIBase	FL	3
(4010,1005)	Threat ROI Extents	ThreatROIExtents	FL	3
(4010,1006)	Threat ROI Bitmap	ThreatROIBitmap	OB	1
(4010,1007)	Route Segment ID	RouteSegmentID	SH	1
(4010,1008)	Gantry Type	GantryType	CS	1
(4010,1009)	OOI Owner Type	OOIOwnerType	CS	1
(4010,100A)	Route Segment Sequence	RouteSegmentSequence	SQ	1
(4010,1010)	Potential Threat Object ID	PotentialThreatObjectID	US	1
(4010,1011)	Threat Sequence	ThreatSequence	SQ	1
(4010,1012)	Threat Category	ThreatCategory	CS	1
(4010,1013)	Threat Category Description	ThreatCategoryDescription	LT	1
(4010,1014)	ATD Ability Assessment	ATDAbilityAssessment	CS	1
(4010,1015)	ATD Assessment Flag	ATDAssessmentFlag	CS	1
(4010,1016)	ATD Assessment Probability	ATDAssessmentProbability	FL	1
(4010,1017)	Mass	Mass	FL	1
(4010,1018)	Density	Density	FL	1
(4010,1019)	Z Effective	ZEffective	FL	1
(4010,101A)	Boarding Pass ID	BoardingPassID	SH	1
(4010,101B)	Center of Mass	CenterOfMass	FL	3
(4010,101C)	Center of PTO	CenterOfPTO	FL	3
(4010,101D)	Bounding Polygon	BoundingPolygon	FL	6-n
(4010,101E)	Route Segment Start Location ID	RouteSegmentStartLocationID	SH	1
(4010,101F)	Route Segment End Location ID	RouteSegmentEndLocationID	SH	1
(4010,1020)	Route Segment Location ID Type	RouteSegmentLocationIDType	CS	1
(4010,1021)	Abort Reason	AbortReason	CS	1-n
(4010,1023)	Volume of PTO	VolumeOfPTO	FL	1
(4010,1024)	Abort Flag	AbortFlag	CS	1
(4010,1025)	Route Segment Start Time	RouteSegmentStartTime	DT	1
(4010,1026)	Route Segment End Time	RouteSegmentEndTime	DT	1
(4010,1027)	TDR Type	TDRType	CS	1
(4010,1028)	International Route Segment	InternationalRouteSegment	CS	1
(4010,1029)	Threat Detection Algorithm and Version	ThreatDetectionAlgorithmandVersion	LO	1-n
(4010,102A)	Assigned Location	AssignedLocation	SH	1
(4010,102B)	Alarm Decision Time	AlarmDecisionTime	DT	1
(4010,1031)	Alarm Decision	AlarmDecision	CS	1
(4010,1033)	Number of Total Objects	NumberOfTotalObjects	US	1
(4010,1034)	Number of Alarm Objects	NumberOfAlarmObjects	US	1
(4010,1037)	PTO Representation Sequence	PTORepresentationSequence	SQ	1
(4010,1038)	ATD Assessment Sequence	ATDAssessmentSequence	SQ	1
(4010,1039)	TIP Type	TIPType	CS	1
(4010,103A)	DICOS Version	DICOSVersion	CS	1
(4010,1041)	OOI Owner Creation Time	OOIOwnerCreationTime	DT	1
(4010,1042)	OOI Type	OOIType	CS	1
(4010,1043)	OOI Size	OOISize	FL	3
(4010,1044)	Acquisition Status	AcquisitionStatus	CS	1
(4010,1045)	Basis Materials Code Sequence	BasisMaterialsCodeSequence	SQ	1
(4010,1046)	Phantom Type	PhantomType	CS	1
(4010,1047)	OOI Owner Sequence	OOIOwnerSequence	SQ	1
(4010,1048)	Scan Type	ScanType	CS	1
(4010,1051)	Itinerary ID	ItineraryID	LO	1
(4010,1052)	Itinerary ID Type	ItineraryIDType	SH	1
(4010,1053)	Itinerary ID Assigning Authority	ItineraryIDAssigningAuthority	LO	1
(4010,1054)	Route ID	RouteID	SH	1
(4010,1055)	Route ID Assigning Authority	RouteIDAssigningAuthority	SH	1
(4010,1056)	Inbound Arrival Type	InboundArrivalType	CS	1
(4010,1058)	Carrier ID	CarrierID	SH	1
(4010,1059)	Carrier ID Assigning Authority	CarrierIDAssigningAuthority	CS	1
(4010,1060)	Source Orientation	SourceOrientation	FL	3
(4010,1061)	Source Position	SourcePosition	FL	3
(4010,1062)	Belt Height	BeltHeight	FL	1
(4010,1064)	Algorithm Routing Code Sequence	AlgorithmRoutingCodeSequence	SQ	1
(4010,1067)	Transport Classification	TransportClassification	CS	1
(4010,1068)	OOI Type Descriptor	OOITypeDescriptor	LT	1
(4010,1069)	Total Processing Time	TotalProcessingTime	FL	1
(4010,106C)	Detector Calibration Data	DetectorCalibrationData	OB	1
(4FFE,0001)	MAC Parameters Sequence	MACParametersSequence	SQ	1
(50xx,0005)	Curve Dimensions	CurveDimensions	US	1	RET
(50xx,0010)	Number of Points	NumberOfPoints	US	1	RET
(50xx,0020)	Type of Data	TypeOfData	CS	1	RET
(50xx,0022)	Curve Description	CurveDescription	LO	1	RET
(50xx,0030)	Axis Units	AxisUnits	SH	1-n	RET
(50xx,0040)	Axis Labels	AxisLabels	SH	1-n	RET
(50xx,0103)	Data Value Representation	DataValueRepresentation	US	1	RET
(50xx,0104)	Minimum Coordinate Value	MinimumCoordinateValue	US	1-n	RET
(50xx,0105)	Maximum Coordinate Value	MaximumCoordinateValue	US	1-n	RET
(50xx,0106)	Curve Range	CurveRange	SH	1-n	RET
(50xx,0110)	Curve Data Descriptor	CurveDataDescriptor	US	1-n	RET
(50xx,0112)	Coordinate Start Value	CoordinateStartValue	US	1-n	RET
(50xx,0114)	Coordinate Step Value	CoordinateStepValue	US	1-n	RET
(50xx,1001)	Curve Activation Layer	CurveActivationLayer	CS	1	RET
(50xx,2000)	Audio Type	AudioType	US	1	RET
(50xx,2002)	Audio Sample Format	AudioSampleFormat	US	1	RET
(50xx,2004)	Number of Channels	NumberOfChannels	US	1	RET
(50xx,2006)	Number of Samples	NumberOfSamples	UL	1	RET
(50xx,2008)	Sample Rate	SampleRate	UL	1	RET
(50xx,200A)	Total Time	TotalTime	UL	1	RET
(50xx,200C)	Audio Sample Data	AudioSampleData	OW or OB	1	RET
(50xx,200E)	Audio Comments	AudioComments	LT	1	RET
(50xx,2500)	Curve Label	CurveLabel	LO	1	RET
(50xx,2600)	Curve Referenced Overlay Sequence	CurveReferencedOverlaySequence	SQ	1	RET
(50xx,2610)	Curve Referenced Overlay Group	CurveReferencedOverlayGroup	US	1	RET
(50xx,3000)	Curve Data	CurveData	OW or OB	1	RET
(5200,9229)	Shared Functional Groups Sequence	SharedFunctionalGroupsSequence	SQ	1
(5200,9230)	Per-frame Functional Groups Sequence	PerFrameFunctionalGroupsSequence	SQ	1
(5400,0100)	Waveform Sequence	WaveformSequence	SQ	1
(5400,0110)	Channel Minimum Value	ChannelMinimumValue	OB or OW	1
(5400,0112)	Channel Maximum Value	ChannelMaximumValue	OB or OW	1
(5400,1004)	Waveform Bits Allocated	WaveformBitsAllocated	US	1
(5400,1006)	Waveform Sample Interpretation	WaveformSampleInterpretation	CS	1
(5400,100A)	Waveform Padding Value	WaveformPaddingValue	OB or OW	1
(5400,1010)	Waveform Data	WaveformData	OB or OW	1
(5600,0010)	First Order Phase Correction Angle	FirstOrderPhaseCorrectionAngle	OF	1
(5600,0020)	Spectroscopy Data	SpectroscopyData	OF	1
(60xx,0010)	Overlay Rows	OverlayRows	US	1
(60xx,0011)	Overlay Columns	OverlayColumns	US	1
(60xx,0012)	Overlay Planes	OverlayPlanes	US	1	RET
(60xx,0015)	Number of Frames in Overlay	NumberOfFramesInOverlay	IS	1
(60xx,0022)	Overlay Description	OverlayDescription	LO	1
(60xx,0040)	Overlay Type	OverlayType	CS	1
(60xx,0045)	Overlay Subtype	OverlaySubtype	LO	1
(60xx,0050)	Overlay Origin	OverlayOrigin	SS	2
(60xx,0051)	Image Frame Origin	ImageFrameOrigin	US	1
(60xx,0052)	Overlay Plane Origin	OverlayPlaneOrigin	US	1	RET
(60xx,0060)	Overlay Compression Code	OverlayCompressionCode	CS	1	RET
(60xx,0061)	Overlay Compression Originator	OverlayCompressionOriginator	SH	1	RET
(60xx,0062)	Overlay Compression Label	OverlayCompressionLabel	SH	1	RET
(60xx,0063)	Overlay Compression Description	OverlayCompressionDescription	CS	1	RET
(60xx,0066)	Overlay Compression Step Pointers	OverlayCompressionStepPointers	AT	1-n	RET
(60xx,0068)	Overlay Repeat Interval	OverlayRepeatInterval	US	1	RET
(60xx,0069)	Overlay Bits Grouped	OverlayBitsGrouped	US	1	RET
(60xx,0100)	Overlay Bits Allocated	OverlayBitsAllocated	US	1
(60xx,0102)	Overlay Bit Position	OverlayBitPosition	US	1
(60xx,0110)	Overlay Format	OverlayFormat	CS	1	RET
(60xx,0200)	Overlay Location	OverlayLocation	US	1	RET
(60xx,0800)	Overlay Code Label	OverlayCodeLabel	CS	1-n	RET
(60xx,0802)	Overlay Number of Tables	OverlayNumberOfTables	US	1	RET
(60xx,0803)	Overlay Code Table Location	OverlayCodeTableLocation	AT	1-n	RET
(60xx,0804)	Overlay Bits For Code Word	OverlayBitsForCodeWord	US	1	RET
(60xx,1001)	Overlay Activation Layer	OverlayActivationLayer	CS	1
(60xx,1100)	Overlay Descriptor - Gray	OverlayDescriptorGray	US	1	RET
(60xx,1101)	Overlay Descriptor - Red	OverlayDescriptorRed	US	1	RET
(60xx,1102)	Overlay Descriptor - Green	OverlayDescriptorGreen	US	1	RET
(60xx,1103)	Overlay Descriptor - Blue	OverlayDescriptorBlue	US	1	RET
(60xx,1200)	Overlays - Gray	OverlaysGray	US	1-n	RET
(60xx,1201)	Overlays - Red	OverlaysRed	US	1-n	RET
(60xx,1202)	Overlays - Green	OverlaysGreen	US	1-n	RET
(60xx,1203)	Overlays - Blue	OverlaysBlue	US	1-n	RET
(60xx,1301)	ROI Area	ROIArea	IS	1
(60xx,1302)	ROI Mean	ROIMean	DS	1
(60xx,1303)	ROI Standard Deviation	ROIStandardDeviation	DS	1
(60xx,1500)	Overlay Label	OverlayLabel	LO	1
(60xx,3000)	Overlay Data	OverlayData	OB or OW	1
(60xx,4000)	Overlay Comments	OverlayComments	LT	1	RET
(7FE0,0010)	Pixel Data	PixelData	OW or OB	1
(7FE0,0020)	Coefficients SDVN	CoefficientsSDVN	OW	1	RET
(7FE0,0030)	Coefficients SDHN	CoefficientsSDHN	OW	1	RET
(7FE0,0040)	Coefficients SDDN	CoefficientsSDDN	OW	1	RET
(7Fxx,0010)	Variable Pixel Data	VariablePixelData	OW or OB	1	RET
(7Fxx,0011)	Variable Next Data Group	VariableNextDataGroup	US	1	RET
(7Fxx,0020)	Variable Coefficients SDVN	VariableCoefficientsSDVN	OW	1	RET
(7Fxx,0030)	Variable Coefficients SDHN	VariableCoefficientsSDHN	OW	1	RET
(7Fxx,0040)	Variable Coefficients SDDN	VariableCoefficientsSDDN	OW	1	RET
(FFFA,FFFA)	Digital Signatures Sequence	DigitalSignaturesSequence	SQ	1
(FFFC,FFFC)	Data Set Trailing Padding	DataSetTrailingPadding	OB	1
(FFFE,E000)	Item	Item	see note	1
(FFFE,E00D)	Item Delimitation Item	ItemDelimitationItem	see note	1	`;
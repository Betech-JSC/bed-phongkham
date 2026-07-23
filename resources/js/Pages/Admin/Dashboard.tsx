import React, { useState, useRef, useEffect } from "react";
import { Link, useForm, router } from "@inertiajs/react";
import { 
  LayoutDashboard, 
  PhoneCall, 
  Calendar as CalendarIcon, 
  BookOpen, 
  Users, 
  Sparkles, 
  MessageSquare, 
  SlidersHorizontal, 
  UserCheck, 
  CalendarDays, 
  HelpCircle, 
  CheckCircle2, 
  Info, 
  FileText, 
  Settings, 
  FolderOpen, 
  Wrench,
  LogOut,
  Plus,
  Copy,
  Lock,
  Search,
  Layers,
  Tags,
  Check,
  Download,
  UserPlus,
  Trash2,
  Filter,
  ChevronRight,
  ChevronDown,
  ChevronLeft,
  Eye,
  X,
  Edit,
  Star,
  Phone,
  MessageCircle,
  Clock,
  User,
  FileEdit,
  Save,
  CalendarCheck,
  Printer,
  CalendarRange,
  Zap,
  Activity,
  Send,
  AlertCircle,
  ArrowLeft,
  Upload,
  Image as ImageIcon,
  Code,
  Link2,
  Unlink,
  List,
  ListOrdered,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Undo,
  Redo
} from "lucide-react";

interface Appointment {
  id: number;
  patient_name: string;
  phone: string;
  gender?: string;
  address?: string;
  notes?: string;
  doctor_notes?: string;
  service_slug?: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  created_at: string;
}

interface Article {
  id: number;
  slug: string;
  title: string;
  article_category_id?: number;
  category: string;
  excerpt: string;
  content?: string;
  author: string;
  date: string;
  read_time?: string;
  image?: string;
  is_published?: boolean;
}

interface Author {
  id: number;
  name: string;
  title?: string;
  bio?: string;
}

interface Service {
  id: number;
  service_pillar_id?: number;
  slug?: string;
  title: string;
  pillar_title: string;
  tagline?: string;
  price: string;
  estimated_time?: string;
  description?: string;
  detailed_description?: string;
  includes?: string[];
  candidates?: string[];
  image?: string;
  is_featured: boolean;
  meta_title?: string;
  meta_description?: string;
}

interface Review {
  id: number;
  patient_name: string;
  service_name?: string;
  rating: number;
  comment: string;
  is_approved?: boolean;
}

interface Banner {
  id: number;
  title: string;
  subtitle?: string;
  eyebrow?: string;
  subheading?: string;
  image_url: string;
  desktop_image?: string;
  mobile_image?: string;
  link?: string;
  primary_button_text?: string;
  primary_button_link?: string;
  secondary_button_text?: string;
  secondary_button_link?: string;
  order: number;
  is_active: boolean;
}

interface Doctor {
  id: number;
  name: string;
  specialty: string;
  experience: string;
  avatar?: string;
  bio?: string;
  detailed_bio?: string;
  is_featured?: boolean;
  meta_title?: string;
  meta_description?: string;
}

interface DoctorSchedule {
  id: number;
  doctor?: { name: string; avatar?: string };
  doctor_id?: number;
  day_of_week: string;
  start_time?: string;
  end_time?: string;
  branch?: string;
  shift: string;
  room: string;
}

interface Faq {
  id: number;
  question: string;
  answer: string;
  category?: string;
  order?: number;
  is_active?: boolean;
}

interface TreatmentResult {
  id: number;
  patient_title: string;
  before_image?: string;
  after_image?: string;
  diagnosis: string;
  outcome: string;
  detailed_case?: string;
  is_featured?: boolean;
  meta_title?: string;
  meta_description?: string;
}

interface Policy {
  id: number;
  title: string;
  slug: string;
  content?: string;
}

interface MediaFile {
  id: number;
  filename: string;
  url: string;
  file_type: string;
  file_size?: string;
}

interface Stats {
  total_appointments: number;
  pending_consultations: number;
  total_articles: number;
  total_doctors: number;
  total_reviews: number;
  total_faqs: number;
}

interface ArticleCategory {
  id: number;
  name: string;
  slug: string;
  order?: number;
  articles?: Article[];
}

interface ServicePillar {
  id: number;
  title: string;
  tagline?: string;
  description?: string;
  icon_name?: string;
  order?: number;
  services?: Service[];
}

interface Props {
  appointments: Appointment[];
  consultations: Appointment[];
  articles: Article[];
  authors: Author[];
  services: Service[];
  pillars: ServicePillar[];
  articleCategories: ArticleCategory[];
  reviews: Review[];
  banners: Banner[];
  doctors: Doctor[];
  schedules: DoctorSchedule[];
  faqs: Faq[];
  treatmentResults: TreatmentResult[];
  policies: Policy[];
  settings: Record<string, string>;
  mediaFiles: MediaFile[];
  stats: Stats;
  auth: { user: { name: string; email: string } };
}

export default function AdminDashboard(props: Props) {
  const { 
    appointments, consultations, articles, authors, services, pillars, articleCategories, reviews, 
    banners, doctors, schedules, faqs, treatmentResults, policies, 
    settings, mediaFiles, stats, auth 
  } = props;

  const [activeTab, setActiveTab] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('admin_active_tab');
      if (saved) return saved;
    }
    return 'overview';
  });

  const changeTab = (tabId: string) => {
    setActiveTab(tabId);
    if (typeof window !== 'undefined') {
      localStorage.setItem('admin_active_tab', tabId);
    }
  };

  const [showWalkinModal, setShowWalkinModal] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState<Appointment | null>(null);

  // Helper date formatter
  const formatDate = (dateStr: string) => {
    try {
      const d = new Date(dateStr);
      if (isNaN(d.getTime())) return dateStr;
      const hours = String(d.getHours()).padStart(2, '0');
      const mins = String(d.getMinutes()).padStart(2, '0');
      const day = String(d.getDate()).padStart(2, '0');
      const month = String(d.getMonth() + 1).padStart(2, '0');
      const year = d.getFullYear();
      return `${hours}:${mins} ${day}/${month}/${year}`;
    } catch {
      return dateStr;
    }
  };

  // Toast Notification State
  const [notificationMsg, setNotificationMsg] = useState<string | null>(null);
  const triggerNotification = (msg: string) => {
    setNotificationMsg(msg);
    setTimeout(() => setNotificationMsg(null), 4000);
  };

  // CRM Patient Notes Form
  const [patientNotesText, setPatientNotesText] = useState('');

  // Service Management States & Batch Actions
  const [serviceStatusTab, setServiceStatusTab] = useState<'all' | 'featured' | 'standard'>('all');
  const [selectedServiceIds, setSelectedServiceIds] = useState<number[]>([]);
  const [showServiceModal, setShowServiceModal] = useState(false);
  const [isEditingServicePage, setIsEditingServicePage] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [serviceSearch, setServiceSearch] = useState('');
  const [selectedPillarFilter, setSelectedPillarFilter] = useState('all');
  const [showServicePreviewModal, setShowServicePreviewModal] = useState<Service | null>(null);
  const [customServiceSlug, setCustomServiceSlug] = useState('');
  const [isManualServiceSlug, setIsManualServiceSlug] = useState(false);
  const [newIncludeInput, setNewIncludeInput] = useState('');
  const [newCandidateInput, setNewCandidateInput] = useState('');
  const serviceEditorRef = useRef<HTMLDivElement>(null);

  // Article Use Cases States & Batch Actions
  const [articleStatusTab, setArticleStatusTab] = useState<'all' | 'published' | 'draft'>('all');
  const [selectedArticleIds, setSelectedArticleIds] = useState<number[]>([]);
  const [showArticlePreviewModal, setShowArticlePreviewModal] = useState(false);
  const [customSlug, setCustomSlug] = useState('');
  const [isManualSlug, setIsManualSlug] = useState(false);

  // Helper Word Count & Reading Time Calculation
  const getArticleWordCount = (html: string = '') => {
    const cleanText = html.replace(/<[^>]*>?/gm, '').trim();
    if (!cleanText) return 0;
    return cleanText.split(/\s+/).length;
  };

  const calcReadingTimeMinutes = (wordCount: number) => {
    return Math.max(1, Math.ceil(wordCount / 200));
  };

  // Policy Management States
  const [activePolicyTab, setActivePolicyTab] = useState<'terms' | 'privacy' | 'payment' | 'refund' | 'disclaimer'>('terms');
  const [policyContent, setPolicyContent] = useState<string>('');
  const policyEditorRef = useRef<HTMLDivElement>(null);

  const [selectedMediaIds, setSelectedMediaIds] = useState<number[]>([]);
  const [currentFolderPath, setCurrentFolderPath] = useState<string>('root');
  const [folders, setFolders] = useState<string[]>(['thuong-hieu', 'bac-si', 'banner', 'khac']);
  const [collapsedFolders, setCollapsedFolders] = useState<string[]>([]);
  const [isRootCollapsed, setIsRootCollapsed] = useState<boolean>(false);

  const handleFormatPolicy = (command: string, value: string = '') => {
    if (policyEditorRef.current) {
      policyEditorRef.current.focus();
      if (command === 'createLink') {
        const url = prompt('Nhập đường dẫn URL:');
        if (url) document.execCommand('createLink', false, url);
      } else if (command === 'insertImage') {
        handleOpenMediaPicker('policy_editor');
      } else if (command === 'formatBlock') {
        document.execCommand('formatBlock', false, value);
      } else {
        document.execCommand(command, false, value);
      }
      setPolicyContent(policyEditorRef.current.innerHTML);
    }
  };

  const handleBatchArticleAction = (action: 'publish' | 'hide' | 'delete') => {
    if (selectedArticleIds.length === 0) return;
    const actionLabel = action === 'publish' ? 'Hiển thị' : action === 'hide' ? 'Tạm ẩn' : 'Xóa';
    if (confirm(`Bạn có chắc chắn muốn ${actionLabel} ${selectedArticleIds.length} bài viết đã chọn?`)) {
      router.post('/admin/articles/batch-action', {
        action,
        ids: selectedArticleIds,
      }, {
        onSuccess: () => {
          setSelectedArticleIds([]);
          triggerNotification(`Đã ${actionLabel.toLowerCase()} các bài viết đã chọn thành công!`);
        }
      });
    }
  };

  const toggleSelectArticle = (id: number) => {
    setSelectedArticleIds(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  // Article Management States & Forms
  const [articleSearch, setArticleSearch] = useState('');
  const [articleCategoryFilter, setArticleCategoryFilter] = useState('all');
  const [isEditingArticlePage, setIsEditingArticlePage] = useState(false);
  const [editingArticle, setEditingArticle] = useState<Article | null>(null);

  const articleForm = useForm({
    title: '',
    author_link: '-- Không liên kết / Tự nhập --',
    author: 'BSCKII Đoàn Khôi',
    article_category_id: 0,
    category: 'Tăng huyết áp',
    excerpt: '',
    content: '',
    read_time: '5 phút đọc',
    image: '/assets/screening_service.png',
    date: '21/07/2026',
    is_published: true,
    is_featured: true,
    related_article_id: '',
    meta_title: '',
    meta_description: '',
  });

  // Author Detailed Management States & Forms
  const [isEditingAuthorPage, setIsEditingAuthorPage] = useState(false);
  const [editingAuthor, setEditingAuthor] = useState<any | null>(null);
  const [showAuthorSeoAccordion, setShowAuthorSeoAccordion] = useState(false);
  const [authorSearchQuery, setAuthorSearchQuery] = useState('');
  const authorEditorRef = useRef<HTMLDivElement>(null);

  const authorForm = useForm({
    name: '',
    title: '',
    avatar: '/assets/doctor_khoi.png',
    bio: '',
    details: '',
    meta_title: '',
    meta_description: '',
  });

  const handleOpenCreateAuthor = () => {
    setEditingAuthor(null);
    authorForm.setData({
      name: '',
      title: '',
      avatar: '/assets/doctor_khoi.png',
      bio: '',
      details: '',
      meta_title: '',
      meta_description: '',
    });
    setIsEditingAuthorPage(true);
    setTimeout(() => {
      if (authorEditorRef.current) authorEditorRef.current.innerHTML = '';
    }, 100);
  };

  const handleOpenEditAuthor = (author: any) => {
    setEditingAuthor(author);
    authorForm.setData({
      name: author.name || '',
      title: author.title || '',
      avatar: author.avatar || '/assets/doctor_khoi.png',
      bio: author.bio || '',
      details: author.details || '',
      meta_title: author.meta_title || '',
      meta_description: author.meta_description || '',
    });
    setIsEditingAuthorPage(true);
    setTimeout(() => {
      if (authorEditorRef.current) authorEditorRef.current.innerHTML = author.details || '';
    }, 100);
  };

  const handleSaveAuthor = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingAuthor) {
      authorForm.put(`/admin/authors/${editingAuthor.id}`, {
        onSuccess: () => {
          setIsEditingAuthorPage(false);
          setEditingAuthor(null);
          setNotificationMsg('Đã cập nhật thông tin tác giả thành công!');
        }
      });
    } else {
      authorForm.post('/admin/authors', {
        onSuccess: () => {
          setIsEditingAuthorPage(false);
          setEditingAuthor(null);
          setNotificationMsg('Đã thêm tác giả mới thành công!');
        }
      });
    }
  };

  // Mini Word WYSIWYG Editor State & Ref
  const [editorMode, setEditorMode] = useState<'wysiwyg' | 'html'>('wysiwyg');
  const editorRef = useRef<HTMLDivElement>(null);

  const [serviceEditorMode, setServiceEditorMode] = useState<'wysiwyg' | 'html'>('wysiwyg');

  const syncEditorContentToForm = () => {
    if (editorRef.current) {
      articleForm.setData('content', editorRef.current.innerHTML);
    }
  };

  const syncServiceEditorContentToForm = () => {
    if (serviceEditorRef.current) {
      serviceForm.setData('detailed_description', serviceEditorRef.current.innerHTML);
    }
  };

  const execServiceEditorCmd = (command: string, value: string = '') => {
    if (serviceEditorRef.current) {
      serviceEditorRef.current.focus();
    }
    document.execCommand(command, false, value);
    syncServiceEditorContentToForm();
    checkActiveFormats();
  };

  // Media Picker & Drag-and-Drop Upload System
  const [showMediaPickerModal, setShowMediaPickerModal] = useState(false);
  const [mediaPickerTarget, setMediaPickerTarget] = useState<string | null>(null);
  const [mediaSearchQuery, setMediaSearchQuery] = useState('');
  const [isUploadingMedia, setIsUploadingMedia] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Saved cursor selection ref & active format states for rich text editor
  const savedSelectionRef = useRef<Range | null>(null);

  const [activeFormats, setActiveFormats] = useState({
    bold: false,
    italic: false,
    underline: false,
    strikeThrough: false,
    unorderedList: false,
    orderedList: false,
    alignLeft: false,
    alignCenter: false,
    alignRight: false,
    h2: false,
    h3: false,
    p: false,
  });

  const checkActiveFormats = () => {
    try {
      const isBold = document.queryCommandState('bold');
      const isItalic = document.queryCommandState('italic');
      const isUnderline = document.queryCommandState('underline');
      const isStrike = document.queryCommandState('strikeThrough');
      const isUL = document.queryCommandState('insertUnorderedList');
      const isOL = document.queryCommandState('insertOrderedList');
      const isLeft = document.queryCommandState('justifyLeft');
      const isCenter = document.queryCommandState('justifyCenter');
      const isRight = document.queryCommandState('justifyRight');

      let formatBlock = '';
      try {
        formatBlock = (document.queryCommandValue('formatBlock') || '').toLowerCase();
      } catch (e) {}

      setActiveFormats({
        bold: isBold,
        italic: isItalic,
        underline: isUnderline,
        strikeThrough: isStrike,
        unorderedList: isUL,
        orderedList: isOL,
        alignLeft: isLeft,
        alignCenter: isCenter,
        alignRight: isRight,
        h2: formatBlock.includes('h4') || formatBlock.includes('h2'),
        h3: formatBlock.includes('h5') || formatBlock.includes('h3'),
        p: formatBlock.includes('p'),
      });
    } catch (e) {}
  };

  const saveEditorSelection = () => {
    const sel = window.getSelection();
    if (sel && sel.rangeCount > 0) {
      savedSelectionRef.current = sel.getRangeAt(0).cloneRange();
    }
    checkActiveFormats();
  };

  const execEditorCmd = (command: string, value: string = '') => {
    if (editorRef.current) {
      editorRef.current.focus();
    }
    document.execCommand(command, false, value);
    syncEditorContentToForm();
    checkActiveFormats();
  };

  const handleOpenMediaPicker = (target: string) => {
    if (target === 'article_editor') {
      saveEditorSelection();
    }
    setMediaPickerTarget(target);
    setShowMediaPickerModal(true);
  };

  const normalizeMediaUrl = (rawUrl: string) => {
    if (!rawUrl) return '';
    if (rawUrl.startsWith('http') || rawUrl.startsWith('/')) return rawUrl;
    return `/${rawUrl}`;
  };

  const handleSelectMediaItem = (url: string) => {
    const cleanUrl = normalizeMediaUrl(url);
    if (mediaPickerTarget === 'article_featured') {
      articleForm.setData('image', cleanUrl);
    } else if (mediaPickerTarget === 'author_avatar') {
      authorForm.setData('avatar', cleanUrl);
    } else if (mediaPickerTarget === 'author_editor') {
      if (authorEditorRef.current) {
        authorEditorRef.current.focus();
        const imgHtml = `<p style="margin: 16px 0; text-align: center;"><img src="${cleanUrl}" alt="Hình ảnh Tác giả" style="max-width: 100%; height: auto; border-radius: 16px; display: inline-block;" /></p><p><br></p>`;
        document.execCommand('insertHTML', false, imgHtml);
        authorForm.setData('details', authorEditorRef.current.innerHTML);
      }
    } else if (mediaPickerTarget === 'article_editor') {
      if (editorRef.current) {
        editorRef.current.focus();
        const sel = window.getSelection();
        if (savedSelectionRef.current && sel) {
          sel.removeAllRanges();
          sel.addRange(savedSelectionRef.current);
        }
        const imgHtml = `<p style="margin: 16px 0; text-align: center;"><img src="${cleanUrl}" alt="Hình ảnh Y Khoa" style="max-width: 100%; height: auto; border-radius: 16px; display: inline-block; box-shadow: 0 4px 12px rgba(0,0,0,0.08);" /></p><p><br></p>`;
        document.execCommand('insertHTML', false, imgHtml);
        articleForm.setData('content', editorRef.current.innerHTML);
      }
    } else if (mediaPickerTarget === 'service') {
      serviceForm.setData('description', (serviceForm.data.description || '') + `\n<img src="${cleanUrl}" style="max-width:100%; border-radius:12px;" />`);
    } else if (mediaPickerTarget === 'service_featured') {
      serviceForm.setData('image', cleanUrl);
    } else if (mediaPickerTarget === 'service_editor') {
      if (serviceEditorRef.current) {
        serviceEditorRef.current.focus();
        const sel = window.getSelection();
        if (savedSelectionRef.current && sel) {
          sel.removeAllRanges();
          sel.addRange(savedSelectionRef.current);
        }
        const imgHtml = `<p style="margin: 16px 0; text-align: center;"><img src="${cleanUrl}" alt="Hình ảnh Gói Dịch Vụ" style="max-width: 100%; height: auto; border-radius: 16px; display: inline-block; box-shadow: 0 4px 12px rgba(0,0,0,0.08);" /></p><p><br></p>`;
        document.execCommand('insertHTML', false, imgHtml);
        serviceForm.setData('detailed_description', serviceEditorRef.current.innerHTML);
      }
    } else if (mediaPickerTarget === 'banner' || mediaPickerTarget === 'banner_desktop') {
      bannerForm.setData('desktop_image', cleanUrl);
    } else if (mediaPickerTarget === 'banner_mobile') {
      bannerForm.setData('mobile_image', cleanUrl);
    } else if (mediaPickerTarget === 'doctor' || mediaPickerTarget === 'doctor_avatar') {
      doctorForm.setData('avatar', cleanUrl);
    } else if (mediaPickerTarget === 'doctor_editor') {
      if (doctorEditorRef.current) {
        doctorEditorRef.current.focus();
        const sel = window.getSelection();
        if (savedSelectionRef.current && sel) {
          sel.removeAllRanges();
          sel.addRange(savedSelectionRef.current);
        }
        const imgHtml = `<p style="margin: 16px 0; text-align: center;"><img src="${cleanUrl}" alt="Hình ảnh Bác Sĩ" style="max-width: 100%; height: auto; border-radius: 16px; display: inline-block; box-shadow: 0 4px 12px rgba(0,0,0,0.08);" /></p><p><br></p>`;
        document.execCommand('insertHTML', false, imgHtml);
        doctorForm.setData('detailed_bio', doctorEditorRef.current.innerHTML);
      }
    } else if (mediaPickerTarget === 'result_before') {
      resultForm.setData('before_image', cleanUrl);
    } else if (mediaPickerTarget === 'result_after') {
      resultForm.setData('after_image', cleanUrl);
    } else if (mediaPickerTarget === 'result_editor') {
      if (resultEditorRef.current) {
        resultEditorRef.current.focus();
        const sel = window.getSelection();
        if (savedSelectionRef.current && sel) {
          sel.removeAllRanges();
          sel.addRange(savedSelectionRef.current);
        }
        const imgHtml = `<p style="margin: 16px 0; text-align: center;"><img src="${cleanUrl}" alt="Hình ảnh Kết quả Điều trị" style="max-width: 100%; height: auto; border-radius: 16px; display: inline-block; box-shadow: 0 4px 12px rgba(0,0,0,0.08);" /></p><p><br></p>`;
        document.execCommand('insertHTML', false, imgHtml);
        resultForm.setData('detailed_case', resultEditorRef.current.innerHTML);
      }
    } else if (mediaPickerTarget === 'result') {
      resultForm.setData('before_image', cleanUrl);
    } else if (mediaPickerTarget && (mediaPickerTarget === 'about_main_image' || mediaPickerTarget === 'about_story_img1' || mediaPickerTarget === 'about_story_img2' || mediaPickerTarget === 'about_story_img3' || mediaPickerTarget.startsWith('logo_'))) {
      const targetKey = mediaPickerTarget;
      setSettingsData(prev => ({ ...prev, [targetKey]: cleanUrl }));
    } else if (mediaPickerTarget === 'policy_editor') {
      if (policyEditorRef.current) {
        policyEditorRef.current.focus();
        const imgHtml = `<p style="margin: 16px 0; text-align: center;"><img src="${cleanUrl}" alt="Hình ảnh chính sách" style="max-width: 100%; height: auto; border-radius: 12px; display: inline-block; box-shadow: 0 4px 12px rgba(0,0,0,0.08);" /></p><p><br></p>`;
        document.execCommand('insertHTML', false, imgHtml);
        setPolicyContent(policyEditorRef.current.innerHTML);
      }
    }
    setShowMediaPickerModal(false);
    triggerNotification('Đã chọn hình ảnh thành công!');
  };

  // --- DOCTOR STATES & HANDLERS ---
  const [editingDoctor, setEditingDoctor] = useState<Doctor | null>(null);
  const [isEditingDoctorPage, setIsEditingDoctorPage] = useState(false);
  const [doctorStatusTab, setDoctorStatusTab] = useState<'all' | 'featured' | 'standard'>('all');
  const [selectedDoctorIds, setSelectedDoctorIds] = useState<number[]>([]);
  const [showDoctorPreviewModal, setShowDoctorPreviewModal] = useState<Doctor | null>(null);
  const [doctorEditorMode, setServiceDoctorEditorMode] = useState<'wysiwyg' | 'html'>('wysiwyg');
  const doctorEditorRef = useRef<HTMLDivElement>(null);

  const doctorForm = useForm({
    name: '',
    specialty: 'Khoa Tim Mạch',
    experience: '15+ năm kinh nghiệm',
    avatar: '/assets/doctor_khoi.png',
    bio: '',
    detailed_bio: '',
    is_featured: true,
    meta_title: '',
    meta_description: '',
  });

  const syncDoctorEditorContentToForm = () => {
    if (doctorEditorRef.current) {
      doctorForm.setData('detailed_bio', doctorEditorRef.current.innerHTML);
    }
  };

  const execDoctorEditorCmd = (command: string, value: string = '') => {
    if (doctorEditorRef.current) {
      doctorEditorRef.current.focus();
    }
    document.execCommand(command, false, value);
    syncDoctorEditorContentToForm();
    checkActiveFormats();
  };

  useEffect(() => {
    if (isEditingDoctorPage && doctorEditorMode === 'wysiwyg' && doctorEditorRef.current) {
      if (doctorEditorRef.current.innerHTML !== doctorForm.data.detailed_bio) {
        doctorEditorRef.current.innerHTML = doctorForm.data.detailed_bio || '';
      }
    }
  }, [isEditingDoctorPage, doctorEditorMode, editingDoctor]);

  const handleOpenCreateDoctor = () => {
    setEditingDoctor(null);
    doctorForm.setData({
      name: '',
      specialty: 'Khoa Tim Mạch',
      experience: '15+ năm kinh nghiệm',
      avatar: '/assets/doctor_khoi.png',
      bio: '',
      detailed_bio: '',
      is_featured: true,
      meta_title: '',
      meta_description: '',
    });
    setIsEditingDoctorPage(true);
  };

  const handleOpenEditDoctor = (doc: Doctor) => {
    setEditingDoctor(doc);
    doctorForm.setData({
      name: doc.name,
      specialty: doc.specialty,
      experience: doc.experience,
      avatar: doc.avatar || '/assets/doctor_khoi.png',
      bio: doc.bio || '',
      detailed_bio: doc.detailed_bio || '',
      is_featured: doc.is_featured !== false,
      meta_title: doc.meta_title || '',
      meta_description: doc.meta_description || '',
    });
    setIsEditingDoctorPage(true);
  };

  const handleSaveDoctor = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingDoctor) {
      doctorForm.put(`/admin/doctors/${editingDoctor.id}`, {
        onSuccess: () => {
          setIsEditingDoctorPage(false);
          setEditingDoctor(null);
          triggerNotification(`Đã cập nhật hồ sơ bác sĩ "${doctorForm.data.name}"!`);
        }
      });
    } else {
      doctorForm.post('/admin/doctors', {
        onSuccess: () => {
          setIsEditingDoctorPage(false);
          doctorForm.reset();
          triggerNotification(`Đã thêm bác sĩ mới "${doctorForm.data.name}"!`);
        }
      });
    }
  };

  const handleDeleteDoctor = (id: number, name: string) => {
    if (confirm(`Bạn có chắc chắn muốn xóa bác sĩ "${name}" khỏi đội ngũ không?`)) {
      router.delete(`/admin/doctors/${id}`, {
        onSuccess: () => triggerNotification(`Đã xóa bác sĩ "${name}" thành công!`)
      });
    }
  };

  const handleBatchDoctorAction = (action: 'feature' | 'unfeature' | 'delete') => {
    if (selectedDoctorIds.length === 0) return;
    const label = action === 'feature' ? 'Bật nổi bật' : action === 'unfeature' ? 'Tắt nổi bật' : 'Xóa';
    if (confirm(`Bạn có chắc chắn muốn ${label} ${selectedDoctorIds.length} bác sĩ đã chọn?`)) {
      router.post('/admin/doctors/batch-action', { action, ids: selectedDoctorIds }, {
        onSuccess: () => {
          setSelectedDoctorIds([]);
          triggerNotification(`Đã thực hiện ${label} hàng loạt bác sĩ!`);
        }
      });
    }
  };

  // --- TREATMENT RESULT STATES & HANDLERS ---
  const [editingResult, setEditingResult] = useState<TreatmentResult | null>(null);
  const [isEditingResultPage, setIsEditingResultPage] = useState(false);
  const [resultStatusTab, setResultStatusTab] = useState<'all' | 'featured' | 'standard'>('all');
  const [selectedResultIds, setSelectedResultIds] = useState<number[]>([]);
  const [showResultPreviewModal, setShowResultPreviewModal] = useState<TreatmentResult | null>(null);
  const [resultEditorMode, setResultEditorMode] = useState<'wysiwyg' | 'html'>('wysiwyg');
  const resultEditorRef = useRef<HTMLDivElement>(null);

  const resultForm = useForm({
    patient_title: '',
    before_image: '/assets/screening_service.png',
    after_image: '/assets/telehealth_service.png',
    diagnosis: '',
    outcome: '',
    detailed_case: '',
    is_featured: true,
    meta_title: '',
    meta_description: '',
  });

  const syncResultEditorContentToForm = () => {
    if (resultEditorRef.current) {
      resultForm.setData('detailed_case', resultEditorRef.current.innerHTML);
    }
  };

  const execResultEditorCmd = (command: string, value: string = '') => {
    if (resultEditorRef.current) {
      resultEditorRef.current.focus();
    }
    document.execCommand(command, false, value);
    syncResultEditorContentToForm();
    checkActiveFormats();
  };

  useEffect(() => {
    if (isEditingResultPage && resultEditorMode === 'wysiwyg' && resultEditorRef.current) {
      if (resultEditorRef.current.innerHTML !== resultForm.data.detailed_case) {
        resultEditorRef.current.innerHTML = resultForm.data.detailed_case || '';
      }
    }
  }, [isEditingResultPage, resultEditorMode, editingResult]);

  const handleOpenCreateResult = () => {
    setEditingResult(null);
    resultForm.setData({
      patient_title: '',
      before_image: '/assets/screening_service.png',
      after_image: '/assets/telehealth_service.png',
      diagnosis: '',
      outcome: '',
      detailed_case: '',
      is_featured: true,
      meta_title: '',
      meta_description: '',
    });
    setIsEditingResultPage(true);
  };

  const handleOpenEditResult = (resItem: TreatmentResult) => {
    setEditingResult(resItem);
    resultForm.setData({
      patient_title: resItem.patient_title,
      before_image: resItem.before_image || '/assets/screening_service.png',
      after_image: resItem.after_image || '/assets/telehealth_service.png',
      diagnosis: resItem.diagnosis,
      outcome: resItem.outcome,
      detailed_case: resItem.detailed_case || '',
      is_featured: resItem.is_featured !== false,
      meta_title: resItem.meta_title || '',
      meta_description: resItem.meta_description || '',
    });
    setIsEditingResultPage(true);
  };

  const handleSaveResult = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingResult) {
      resultForm.put(`/admin/treatment-results/${editingResult.id}`, {
        onSuccess: () => {
          setIsEditingResultPage(false);
          setEditingResult(null);
          triggerNotification(`Đã cập nhật ca điều trị "${resultForm.data.patient_title}"!`);
        }
      });
    } else {
      resultForm.post('/admin/treatment-results', {
        onSuccess: () => {
          setIsEditingResultPage(false);
          resultForm.reset();
          triggerNotification(`Đã thêm ca điều trị mới "${resultForm.data.patient_title}"!`);
        }
      });
    }
  };

  const handleDeleteResult = (id: number, title: string) => {
    if (confirm(`Bạn có chắc chắn muốn xóa ca điều trị "${title}" không?`)) {
      router.delete(`/admin/treatment-results/${id}`, {
        onSuccess: () => triggerNotification(`Đã xóa ca điều trị "${title}"!`)
      });
    }
  };

  const handleBatchResultAction = (action: 'feature' | 'unfeature' | 'delete') => {
    if (selectedResultIds.length === 0) return;
    const label = action === 'feature' ? 'Bật nổi bật' : action === 'unfeature' ? 'Tắt nổi bật' : 'Xóa';
    if (confirm(`Bạn có chắc chắn muốn ${label} ${selectedResultIds.length} kết quả đã chọn?`)) {
      router.post('/admin/treatment-results/batch-action', { action, ids: selectedResultIds }, {
        onSuccess: () => {
          setSelectedResultIds([]);
          triggerNotification(`Đã thực hiện ${label} hàng loạt kết quả điều trị!`);
        }
      });
    }
  };

  // --- REVIEW STATES & HANDLERS ---
  const [editingReview, setEditingReview] = useState<Review | null>(null);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [reviewStatusTab, setReviewStatusTab] = useState<'all' | 'approved' | 'rejected'>('all');
  const [reviewSearchQuery, setReviewSearchQuery] = useState('');
  const [reviewRatingFilter, setReviewRatingFilter] = useState<number | 'all'>('all');
  const [selectedReviewIds, setSelectedReviewIds] = useState<number[]>([]);

  const reviewForm = useForm({
    patient_name: '',
    service_name: 'Khám tim mạch tổng quát',
    rating: 5,
    comment: '',
    is_approved: true,
  });

  const handleOpenCreateReview = () => {
    setEditingReview(null);
    reviewForm.setData({
      patient_name: '',
      service_name: 'Khám tim mạch tổng quát',
      rating: 5,
      comment: '',
      is_approved: true,
    });
    setShowReviewModal(true);
  };

  const handleOpenEditReview = (rev: Review) => {
    setEditingReview(rev);
    reviewForm.setData({
      patient_name: rev.patient_name,
      service_name: rev.service_name || 'Khám tim mạch tổng quát',
      rating: rev.rating || 5,
      comment: rev.comment,
      is_approved: rev.is_approved !== false,
    });
    setShowReviewModal(true);
  };

  const handleSaveReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingReview) {
      reviewForm.put(`/admin/reviews/${editingReview.id}`, {
        onSuccess: () => {
          setShowReviewModal(false);
          setEditingReview(null);
          triggerNotification(`Đã cập nhật đánh giá của bệnh nhân "${reviewForm.data.patient_name}"!`);
        }
      });
    } else {
      reviewForm.post('/admin/reviews', {
        onSuccess: () => {
          setShowReviewModal(false);
          reviewForm.reset();
          triggerNotification(`Đã thêm đánh giá mới cho bệnh nhân "${reviewForm.data.patient_name}"!`);
        }
      });
    }
  };

  const handleToggleReviewApproval = (rev: Review) => {
    const newStatus = !rev.is_approved;
    router.patch(`/admin/reviews/${rev.id}/toggle-approval`, { is_approved: newStatus }, {
      onSuccess: () => {
        const label = newStatus ? 'Phê duyệt' : 'Từ chối / Tạm ẩn';
        triggerNotification(`Đã ${label} đánh giá của "${rev.patient_name}" thành công!`);
      }
    });
  };

  const handleDeleteReview = (id: number, patientName: string) => {
    if (confirm(`Bạn có chắc chắn muốn xóa đánh giá của bệnh nhân "${patientName}" không?`)) {
      router.delete(`/admin/reviews/${id}`, {
        onSuccess: () => triggerNotification(`Đã xóa đánh giá của "${patientName}" thành công!`)
      });
    }
  };

  const handleBatchReviewAction = (action: 'approve' | 'reject' | 'delete') => {
    if (selectedReviewIds.length === 0) return;
    const label = action === 'approve' ? 'Phê duyệt' : action === 'reject' ? 'Từ chối / Tạm ẩn' : 'Xóa';
    if (confirm(`Bạn có chắc chắn muốn ${label} ${selectedReviewIds.length} đánh giá đã chọn?`)) {
      router.post('/admin/reviews/batch-action', { action, ids: selectedReviewIds }, {
        onSuccess: () => {
          setSelectedReviewIds([]);
          triggerNotification(`Đã thực hiện ${label} hàng loạt đánh giá!`);
        }
      });
    }
  };

  // --- BANNER STATES & HANDLERS ---
  const [editingBanner, setEditingBanner] = useState<Banner | null>(null);
  const [showBannerModal, setShowBannerModal] = useState(false);
  const [bannerStatusTab, setBannerStatusTab] = useState<'all' | 'active' | 'inactive'>('all');
  const [bannerSearchQuery, setBannerSearchQuery] = useState('');
  const [selectedBannerIds, setSelectedBannerIds] = useState<number[]>([]);
  const [activeBannerMediaTarget, setActiveBannerMediaTarget] = useState<'desktop' | 'mobile'>('desktop');

  const bannerForm = useForm({
    title: '',
    subtitle: '',
    eyebrow: '',
    subheading: '',
    desktop_image: '/assets/heart_care.png',
    mobile_image: '',
    primary_button_text: 'Đặt Lịch Khám Ngay',
    primary_button_link: '/lien-he',
    secondary_button_text: 'Tìm Hiểu Dịch Vụ',
    secondary_button_link: '/dich-vu',
    order: 0,
    is_active: true,
  });

  const handleOpenCreateBanner = () => {
    setEditingBanner(null);
    bannerForm.setData({
      title: '',
      subtitle: '',
      eyebrow: '',
      subheading: '',
      desktop_image: '/assets/heart_care.png',
      mobile_image: '',
      primary_button_text: 'Đặt Lịch Khám Ngay',
      primary_button_link: '/lien-he',
      secondary_button_text: 'Tìm Hiểu Dịch Vụ',
      secondary_button_link: '/dich-vu',
      order: banners.length,
      is_active: true,
    });
    setShowBannerModal(true);
  };

  const handleOpenEditBanner = (b: Banner) => {
    setEditingBanner(b);
    bannerForm.setData({
      title: b.title,
      subtitle: b.subtitle || '',
      eyebrow: b.eyebrow || '',
      subheading: b.subheading || '',
      desktop_image: b.desktop_image || b.image_url || '/assets/heart_care.png',
      mobile_image: b.mobile_image || '',
      primary_button_text: b.primary_button_text || 'Đặt Lịch Khám Ngay',
      primary_button_link: b.primary_button_link || b.link || '/lien-he',
      secondary_button_text: b.secondary_button_text || '',
      secondary_button_link: b.secondary_button_link || '',
      order: b.order || 0,
      is_active: b.is_active !== false,
    });
    setShowBannerModal(true);
  };

  const handleSaveBanner = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingBanner) {
      bannerForm.put(`/admin/banners/${editingBanner.id}`, {
        onSuccess: () => {
          setShowBannerModal(false);
          setEditingBanner(null);
          triggerNotification(`Đã cập nhật slide banner "${bannerForm.data.title}"!`);
        }
      });
    } else {
      bannerForm.post('/admin/banners', {
        onSuccess: () => {
          setShowBannerModal(false);
          bannerForm.reset();
          triggerNotification(`Đã thêm slide banner mới "${bannerForm.data.title}"!`);
        }
      });
    }
  };

  const handleToggleBannerStatus = (b: Banner) => {
    const newStatus = !b.is_active;
    router.patch(`/admin/banners/${b.id}/status`, { is_active: newStatus }, {
      onSuccess: () => {
        const label = newStatus ? 'Kích hoạt' : 'Tạm ẩn';
        triggerNotification(`Đã ${label} banner "${b.title}"!`);
      }
    });
  };

  const handleDeleteBanner = (id: number, title: string) => {
    if (confirm(`Bạn có chắc chắn muốn xóa slide banner "${title}" không?`)) {
      router.delete(`/admin/banners/${id}`, {
        onSuccess: () => triggerNotification(`Đã xóa slide banner "${title}"!`)
      });
    }
  };

  const handleBatchBannerAction = (action: 'activate' | 'deactivate' | 'delete') => {
    if (selectedBannerIds.length === 0) return;
    const label = action === 'activate' ? 'Kích hoạt' : action === 'deactivate' ? 'Tạm ẩn' : 'Xóa';
    if (confirm(`Bạn có chắc chắn muốn ${label} ${selectedBannerIds.length} banner đã chọn?`)) {
      router.post('/admin/banners/batch-action', { action, ids: selectedBannerIds }, {
        onSuccess: () => {
          setSelectedBannerIds([]);
          triggerNotification(`Đã thực hiện ${label} hàng loạt banner!`);
        }
      });
    }
  };

  // --- SCHEDULE STATES & HANDLERS ---
  const scheduleForm = useForm({
    doctor_id: doctors.length > 0 ? doctors[0].id : '',
    day_of_week: 'Thứ Hai (Thứ 2)',
    start_time: '08:00',
    end_time: '17:00',
    branch: 'Hà Nội (Hồ Tây)',
  });

  const handleSaveSchedule = (e: React.FormEvent) => {
    e.preventDefault();
    if (!scheduleForm.data.doctor_id) {
      alert('Vui lòng chọn bác sĩ!');
      return;
    }
    scheduleForm.post('/admin/schedules', {
      onSuccess: () => {
        triggerNotification('Đã thêm ca trực bác sĩ mới thành công!');
      }
    });
  };

  const handleDeleteSchedule = (id: number) => {
    if (confirm('Bạn có chắc chắn muốn xóa ca trực này không?')) {
      router.delete(`/admin/schedules/${id}`, {
        onSuccess: () => triggerNotification('Đã xóa ca trực thành công!')
      });
    }
  };

  // --- FAQ STATES & HANDLERS ---
  const [editingFaq, setEditingFaq] = useState<Faq | null>(null);
  const [showFaqModal, setShowFaqModal] = useState(false);
  const [faqSearchQuery, setFaqSearchQuery] = useState('');
  const [selectedFaqIds, setSelectedFaqIds] = useState<number[]>([]);

  const faqForm = useForm({
    question: '',
    answer: '',
    order: 0,
    is_active: true,
  });

  const handleOpenCreateFaq = () => {
    setEditingFaq(null);
    faqForm.setData({
      question: '',
      answer: '',
      order: faqs.length,
      is_active: true,
    });
    setShowFaqModal(true);
  };

  const handleOpenEditFaq = (faq: Faq) => {
    setEditingFaq(faq);
    faqForm.setData({
      question: faq.question,
      answer: faq.answer,
      order: faq.order || 0,
      is_active: faq.is_active !== false,
    });
    setShowFaqModal(true);
  };

  const handleSaveFaq = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingFaq) {
      faqForm.put(`/admin/faqs/${editingFaq.id}`, {
        onSuccess: () => {
          setShowFaqModal(false);
          setEditingFaq(null);
          triggerNotification('Đã cập nhật câu hỏi FAQ thành công!');
        }
      });
    } else {
      faqForm.post('/admin/faqs', {
        onSuccess: () => {
          setShowFaqModal(false);
          faqForm.reset();
          triggerNotification('Đã thêm câu hỏi FAQ mới!');
        }
      });
    }
  };

  const handleToggleFaqStatus = (faq: Faq) => {
    router.patch(`/admin/faqs/${faq.id}/status`, {}, {
      onSuccess: () => triggerNotification('Đã thay đổi trạng thái hiển thị FAQ!')
    });
  };

  const handleDeleteFaq = (id: number) => {
    if (confirm('Bạn có chắc chắn muốn xóa câu hỏi FAQ này không?')) {
      router.delete(`/admin/faqs/${id}`, {
        onSuccess: () => triggerNotification('Đã xóa câu hỏi FAQ thành công!')
      });
    }
  };

  const handleBatchFaqAction = (action: 'show' | 'hide' | 'delete') => {
    if (selectedFaqIds.length === 0) return;
    const label = action === 'show' ? 'Bật hiển thị' : action === 'hide' ? 'Tạm ẩn' : 'Xóa';
    if (confirm(`Bạn có chắc chắn muốn ${label} ${selectedFaqIds.length} câu hỏi FAQ đã chọn?`)) {
      router.post('/admin/faqs/batch-action', { action, ids: selectedFaqIds }, {
        onSuccess: () => {
          setSelectedFaqIds([]);
          triggerNotification(`Đã thực hiện ${label} hàng loạt câu hỏi FAQ!`);
        }
      });
    }
  };

  // --- ABOUT CMS SETTINGS HANDLERS ---
  const [settingsData, setSettingsData] = useState<Record<string, string>>({
    site_name: settings.site_name || 'MEDIPLUS HP MEDICAL CENTRE',
    about_eyebrow: settings.about_eyebrow || 'Về Chúng Tôi',
    about_title: settings.about_title || 'MEDIPLUS HP MEDICAL CENTRE',
    about_main_image: settings.about_main_image || '/assets/about_banner.jpg',
    about_desc1: settings.about_desc1 || 'Tọa lạc tại vị trí đắc địa ở Hải Phòng, MediPlus HP Medical Centre tự hào là một trong những trung tâm y khoa kỹ thuật cao hàng đầu cung cấp trọn gói các dịch vụ chăm sóc sức khỏe tim mạch, nội khoa và khám chuyên sâu...',
    about_desc2: settings.about_desc2 || 'Với triết lý làm đẹp & khám chữa bệnh chuẩn y khoa, tôn vinh nét riêng của từng cá nhân, đội ngũ Bác sĩ, chuyên gia đầu ngành tại MediPlus HP cam kết đồng hành cùng quý khách hàng trên hành trình khám phá và hoàn thiện bản sắc đẹp hoàn hảo nhất...',
    about_doctor_count_type: settings.about_doctor_count_type || 'auto',
    about_customer_count_type: settings.about_customer_count_type || 'auto',
    about_customer_base: settings.about_customer_base || '10000',
    about_customer_crm: settings.about_customer_crm || '+1',

    about_founder_title: settings.about_founder_title || 'Triết Lý Làm Đẹp Chuẩn Y Khoa & Vẻ Đẹp Độc Bản',
    about_founder_desc1: settings.about_founder_desc1 || 'Tại MediPlus HP Medical Centre, chúng tôi tin rằng mỗi người đều sở hữu một vẻ đẹp và sức khỏe độc bản riêng biệt. Sự tự tin của bạn là món quà quý giá nhất, và sứ mệnh của chúng tôi là giúp bạn giữ gìn nét riêng đó...',
    about_founder_desc2: settings.about_founder_desc2 || 'Được thành lập bởi đội ngũ bác sĩ chuyên khoa I, II, MediPlus HP đã không ngừng nâng cấp hệ thống phòng khám, chuyển giao độc quyền các công nghệ y khoa tiên tiến...',
    about_founder_quote: settings.about_founder_quote || 'Chúng tôi không thay đổi diện mạo của bạn, chúng tôi tôn vinh và khôi phục những nét đẹp độc bản',
    about_founder_author: settings.about_founder_author || 'BSCKII Đoàn Khôi',
    about_story_img1: settings.about_story_img1 || '/assets/screening_service.png',
    about_story_img2: settings.about_story_img2 || '/assets/telehealth_service.png',
    about_story_img3: settings.about_story_img3 || '/assets/heart_care.png',

    clinic_name: settings.clinic_name || 'Phòng Khám Chuyên Khoa Nội - BSCKII Đoàn Khôi',
    hotline_1: settings.hotline_1 || '038 432 6785',
    hotline_1_clean: settings.hotline_1_clean || '0384326785',
    hotline_2: settings.hotline_2 || '0328 699 799',
    hotline_2_clean: settings.hotline_2_clean || '0328699799',
    email: settings.email || 'doankhoiclinic@gmail.com',
    address: settings.address || '348 Nguyễn Lương Bằng, Lê Thanh Nghị, Hải Phòng',
    working_hours: settings.working_hours || 'Sáng: 07:30 – 11:30 | Chiều: 13:30 – 18:30 (Thứ 2 - Chủ Nhật)',
    logo_dark: settings.logo_dark || '',
    logo_light: settings.logo_light || '',
    logo_favicon: settings.logo_favicon || '',
    logo_favicon_light: settings.logo_favicon_light || '',
    zalo_link: settings.zalo_link || 'https://zalo.me/0384326785',
    social_facebook: settings.social_facebook || 'https://facebook.com/theq.vn',
    social_youtube: settings.social_youtube || 'https://youtube.com',
  });

  useEffect(() => {
    const key = `policy_${activePolicyTab}`;
    const defaultContents: Record<string, string> = {
      terms: `<h3>1. Chấp thuận điều khoản</h3><p>Bằng việc truy cập, duyệt website hoặc sử dụng bất kỳ dịch vụ trực tuyến nào do KT Beauty Medical Centre cung cấp, người dùng đồng ý tuân thủ toàn bộ các điều khoản, điều kiện và thông báo được quy định tại đây. Nếu bạn không đồng ý với các điều khoản này, vui lòng ngừng sử dụng website.</p><h3>2. Sở hữu trí tuệ</h3><p>Toàn bộ nội dung trên website bao gồm nhưng không giới hạn ở: văn bản, hình ảnh, video, đồ họa, logo, thiết kế và giao diện thuộc quyền sở hữu hợp pháp của KT Beauty Medical Centre (CÔNG TY TNHH KHÁNH MINH GROUP).</p><p>Mọi hành vi sao chép, trích dẫn, phân phối hoặc sử dụng thương mại các tài nguyên trên website khi chưa có sự đồng ý bằng văn bản của chúng tôi đều là vi phạm pháp luật.</p><h3>3. Giới hạn trách nhiệm và bản chất thông tin</h3><p>Các kiến thức, bài viết hướng dẫn chăm sóc da hoặc thông tin dịch vụ trên website mang tính chất tham khảo, không thể thay thế cho việc thăm khám, chẩn đoán, tư vấn và phác đồ điều trị chuyên môn trực tiếp từ bác sĩ.</p>`,
      privacy: `<h3>1. Thu thập thông tin cá nhân</h3><p>KT Beauty Medical Centre cam kết bảo mật tuyệt đối thông tin cá nhân của khách hàng bao gồm họ tên, số điện thoại, email và lịch sử dịch vụ.</p><h3>2. Bảo vệ dữ liệu</h3><p>Chúng tôi áp dụng các biện pháp an ninh chuẩn quốc tế để ngăn chặn truy cập trái phép hoặc rò rỉ dữ liệu.</p>`,
      payment: `<h3>1. Phương thức thanh toán</h3><p>Hỗ trợ thanh toán linh hoạt bằng Tiền mặt, Chuyển khoản ngân hàng, Quẹt thẻ Visa/Mastercard và Hỗ trợ trả góp 0% lãi suất.</p><h3>2. Hóa đơn và chứng từ</h3><p>Khách hàng được cung cấp hóa đơn chi tiết ngay sau khi hoàn tất dịch vụ.</p>`,
      refund: `<h3>1. Chính sách hoàn tiền</h3><p>Cam kết hoàn tiền hoặc đổi dịch vụ tương đương nếu có bất kỳ sự cố kỹ thuật nào từ phía trung tâm.</p><h3>2. Quy trình xử lý</h3><p>Yêu cầu hoàn tiền được tiếp nhận và giải quyết trong vòng 3 ngày làm việc.</p>`,
      disclaimer: `<h3>1. Miễn trừ trách nhiệm</h3><p>KT Beauty Medical Centre không chịu trách nhiệm đối với các tổn thất do khách hàng không tuân thủ chỉ định chăm sóc hậu phẫu của bác sĩ.</p>`
    };
    const content = settingsData[key] || defaultContents[activePolicyTab] || '';
    setPolicyContent(content);
  }, [activePolicyTab, settingsData]);

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    router.post('/admin/settings', { settings: settingsData }, {
      onSuccess: () => triggerNotification('Đã lưu và cập nhật nội dung trang Giới thiệu!')
    });
  };

  const handleUploadFiles = (files: FileList | File[]) => {
    if (!files || files.length === 0) return;
    setIsUploadingMedia(true);
    const formData = new FormData();
    Array.from(files).forEach((file) => {
      formData.append('files[]', file);
    });

    router.post('/admin/media/upload', formData, {
      preserveScroll: true,
      onFinish: () => {
        setIsUploadingMedia(false);
        triggerNotification('Đã tải lên tệp từ máy tính thành công!');
      },
    });
  };

  const handleDropMediaFiles = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleUploadFiles(e.dataTransfer.files);
    }
  };

  const handleDeleteMediaFile = (id: number) => {
    if (confirm('Bạn có chắc chắn muốn xóa tệp này khỏi hệ thống?')) {
      router.delete(`/admin/media/${id}`, {
        preserveScroll: true,
        onSuccess: () => triggerNotification('Đã xóa tệp thành công!'),
      });
    }
  };

  useEffect(() => {
    if (isEditingArticlePage && editorMode === 'wysiwyg' && editorRef.current) {
      if (editorRef.current.innerHTML !== articleForm.data.content) {
        editorRef.current.innerHTML = articleForm.data.content || '';
      }
    }
  }, [isEditingArticlePage, editorMode, editingArticle]);

  useEffect(() => {
    if (isEditingServicePage && serviceEditorMode === 'wysiwyg' && serviceEditorRef.current) {
      if (serviceEditorRef.current.innerHTML !== serviceForm.data.detailed_description) {
        serviceEditorRef.current.innerHTML = serviceForm.data.detailed_description || '';
      }
    }
  }, [isEditingServicePage, serviceEditorMode, editingService]);

  const handleOpenCreateArticle = () => {
    setEditingArticle(null);
    articleForm.setData({
      title: '',
      author_link: '-- Không liên kết / Tự nhập --',
      author: 'BSCKII Đoàn Khôi',
      article_category_id: articleCategories[0]?.id || 0,
      category: 'Tăng huyết áp',
      excerpt: '',
      content: '',
      read_time: '5 phút đọc',
      image: '/assets/screening_service.png',
      date: '21/07/2026',
      is_published: true,
      is_featured: true,
      related_article_id: '',
      meta_title: '',
      meta_description: '',
    });
    setIsEditingArticlePage(true);
  };

  const handleOpenEditArticle = (art: Article) => {
    setEditingArticle(art);
    articleForm.setData({
      title: art.title,
      author_link: art.author,
      author: art.author,
      article_category_id: art.article_category_id || 0,
      category: art.category,
      excerpt: art.excerpt || '',
      content: art.content || '',
      read_time: art.read_time || '5 phút đọc',
      image: art.image || '/assets/screening_service.png',
      date: art.date || '21/07/2026',
      is_published: art.is_published !== undefined ? art.is_published : true,
      is_featured: true,
      related_article_id: '',
      meta_title: '',
      meta_description: '',
    });
    setIsEditingArticlePage(true);
  };

  const handleSaveArticle = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingArticle) {
      articleForm.put(`/admin/articles/${editingArticle.id}`, {
        onSuccess: () => {
          setIsEditingArticlePage(false);
          setEditingArticle(null);
          triggerNotification(`Đã cập nhật chi tiết bài viết "${articleForm.data.title}"!`);
        }
      });
    } else {
      articleForm.post('/admin/articles', {
        onSuccess: () => {
          setIsEditingArticlePage(false);
          articleForm.reset();
          triggerNotification(`Đã xuất bản bài viết mới "${articleForm.data.title}"!`);
        }
      });
    }
  };

  const handleDeleteArticle = (id: number, title: string) => {
    if (confirm(`Bạn có chắc chắn muốn xóa bài viết "${title}" khỏi hệ thống cẩm nang y khoa không?`)) {
      router.delete(`/admin/articles/${id}`, {
        onSuccess: () => {
          triggerNotification(`Đã xóa bài viết "${title}" thành công!`);
        }
      });
    }
  };

  // CRM Search & Filter & Pagination States
  const [crmSearch, setCrmSearch] = useState('');
  const [crmStatusFilter, setCrmStatusFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  // Calendar Scheduler States & Use Cases
  const [calMonth, setCalMonth] = useState(7); // July
  const [calYear, setCalYear] = useState(2026);
  const [selectedDay, setSelectedDay] = useState<number>(21); // Default selected 21/07/2026
  
  // Use Case 1: Filter Schedule by Doctor & Shift
  const [selectedDoctorFilter, setSelectedDoctorFilter] = useState('all');
  const [selectedShiftFilter, setSelectedShiftFilter] = useState('all');

  // Use Case 2: Reschedule Appointment Modal
  const [reschedulingAppointment, setReschedulingAppointment] = useState<Appointment | null>(null);
  const [newRescheduleDate, setNewRescheduleDate] = useState('2026-07-25');
  const [newRescheduleTime, setNewRescheduleTime] = useState('09:00');

  // Use Case 5: Print Ticket Modal
  const [printingAppointment, setPrintingAppointment] = useState<Appointment | null>(null);

  // Edit Patient Info Modal State
  const [editingPatientInfo, setEditingPatientInfo] = useState<Appointment | null>(null);
  const patientEditForm = useForm({
    patient_name: '',
    phone: '',
    email: '',
    facility: 'MediPlus HP Medical Centre - Hải Phòng',
    service_slug: '',
    doctor_name: 'BSCKII Đoàn Khôi',
    notes: '',
    doctor_notes: '',
    status: 'confirmed',
  });

  const handleSavePatientInfoEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPatientInfo) return;
    router.patch(`/admin/appointments/${editingPatientInfo.id}/status`, {
      patient_name: patientEditForm.data.patient_name,
      phone: patientEditForm.data.phone,
      email: patientEditForm.data.email,
      facility: patientEditForm.data.facility,
      service_slug: patientEditForm.data.service_slug,
      doctor_name: patientEditForm.data.doctor_name,
      notes: patientEditForm.data.notes,
      doctor_notes: patientEditForm.data.doctor_notes,
      status: patientEditForm.data.status,
    }, {
      preserveState: true,
      preserveScroll: true,
      onSuccess: () => {
        setEditingPatientInfo(null);
        triggerNotification(`Đã cập nhật thông tin cho bệnh nhân ${patientEditForm.data.patient_name}!`);
      }
    });
  };

  // Forms matching reference screenshot
  const walkinForm = useForm({
    patient_name: '',
    phone: '',
    email: '',
    facility: 'MediPlus HP Medical Centre - Hải Phòng',
    service_slug: 'Gói Khám Tim Mạch Tổng Quát',
    doctor_name: 'BSCKII Đoàn Khôi',
    appointment_date: '2026-07-21',
    time_slot: '09:00 - 10:00',
    notes: '',
    status: 'confirmed',
  });

  const updateAppointmentStatus = (id: number, status: string, notes?: string) => {
    router.patch(`/admin/appointments/${id}/status`, { 
      status,
      doctor_notes: notes !== undefined ? notes : (selectedPatient ? selectedPatient.doctor_notes : undefined)
    }, {
      preserveState: true,
      preserveScroll: true,
    });
  };

  const handleSavePatientNotes = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPatient) return;
    router.patch(`/admin/appointments/${selectedPatient.id}/status`, {
      status: selectedPatient.status,
      doctor_notes: patientNotesText,
    }, {
      onSuccess: () => {
        setSelectedPatient(prev => prev ? { ...prev, doctor_notes: patientNotesText } : null);
        triggerNotification('Đã lưu ghi chú CRM thành công!');
      }
    });
  };

  const handleDeleteAppointment = (id: number, name: string) => {
    if (confirm(`Bạn có chắc chắn muốn xóa thông tin khách hàng "${name}" khỏi CRM không?`)) {
      router.delete(`/admin/appointments/${id}`);
    }
  };

  const handleCreateWalkin = (e: React.FormEvent) => {
    e.preventDefault();
    walkinForm.post('/admin/appointments', {
      onSuccess: () => {
        setShowWalkinModal(false);
        walkinForm.reset();
        triggerNotification('Đã tạo thành công đơn khám trực tiếp tại quầy!');
      }
    });
  };

  // Reschedule Action Handler (Use Case 2)
  const handleConfirmReschedule = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reschedulingAppointment) return;
    updateAppointmentStatus(reschedulingAppointment.id, 'confirmed', `Đã dời lịch sang ${newRescheduleTime} ngày ${newRescheduleDate}`);
    setReschedulingAppointment(null);
    triggerNotification(`Đã đổi lịch cho bệnh nhân ${reschedulingAppointment.patient_name} sang ${newRescheduleDate} (${newRescheduleTime}) và tự động gửi tin nhắn Zalo OA thông báo!`);
  };

  const serviceForm = useForm({
    title: '',
    slug: '',
    service_pillar_id: 0,
    price: '500.000 VNĐ - 1.200.000 VNĐ',
    estimated_time: '60 - 90 phút',
    tagline: '',
    description: '',
    detailed_description: '',
    includes: [] as string[],
    candidates: [] as string[],
    image: '/assets/screening_service.png',
    is_featured: true,
    meta_title: '',
    meta_description: '',
  });

  const handleBatchServiceAction = (action: 'feature' | 'unfeature' | 'delete') => {
    if (selectedServiceIds.length === 0) return;
    const actionLabel = action === 'feature' ? 'Bật nổi bật' : action === 'unfeature' ? 'Tắt nổi bật' : 'Xóa';
    if (confirm(`Bạn có chắc chắn muốn ${actionLabel} ${selectedServiceIds.length} dịch vụ đã chọn?`)) {
      router.post('/admin/services/batch-action', {
        action,
        ids: selectedServiceIds,
      }, {
        onSuccess: () => {
          setSelectedServiceIds([]);
          triggerNotification(`Đã ${actionLabel.toLowerCase()} các dịch vụ đã chọn thành công!`);
        }
      });
    }
  };

  const toggleSelectService = (id: number) => {
    setSelectedServiceIds(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const handleAddInclude = () => {
    if (!newIncludeInput.trim()) return;
    serviceForm.setData('includes', [...(serviceForm.data.includes || []), newIncludeInput.trim()]);
    setNewIncludeInput('');
  };

  const handleRemoveInclude = (idx: number) => {
    serviceForm.setData('includes', (serviceForm.data.includes || []).filter((_, i) => i !== idx));
  };

  const handleAddCandidate = () => {
    if (!newCandidateInput.trim()) return;
    serviceForm.setData('candidates', [...(serviceForm.data.candidates || []), newCandidateInput.trim()]);
    setNewCandidateInput('');
  };

  const handleRemoveCandidate = (idx: number) => {
    serviceForm.setData('candidates', (serviceForm.data.candidates || []).filter((_, i) => i !== idx));
  };

  const handleOpenCreateService = () => {
    setEditingService(null);
    serviceForm.setData({
      title: '',
      slug: '',
      service_pillar_id: pillars[0]?.id || 0,
      price: '500.000 VNĐ - 1.200.000 VNĐ',
      estimated_time: '60 - 90 phút',
      tagline: '',
      description: '',
      detailed_description: '',
      includes: ['Khám chuyên khoa Tim mạch', 'Đo ECG 12 đầu cần', 'Siêu âm tim Doppler màu', 'Xét nghiệm mỡ máu'],
      candidates: ['Người từ 35 tuổi trở lên', 'Người có nguy cơ mắc bệnh tim mạch', 'Người chưa khám tim mạch bao giờ'],
      image: '/assets/screening_service.png',
      is_featured: true,
      meta_title: '',
      meta_description: '',
    });
    setCustomServiceSlug('');
    setIsManualServiceSlug(false);
    setIsEditingServicePage(true);
  };

  const handleOpenEditService = (service: Service) => {
    setEditingService(service);
    serviceForm.setData({
      title: service.title,
      slug: service.slug || '',
      service_pillar_id: service.service_pillar_id || 0,
      price: service.price,
      estimated_time: service.estimated_time || '60 phút',
      tagline: service.tagline || '',
      description: service.description || '',
      detailed_description: service.detailed_description || '',
      includes: service.includes || [],
      candidates: service.candidates || [],
      image: service.image || '/assets/screening_service.png',
      is_featured: service.is_featured,
      meta_title: service.meta_title || '',
      meta_description: service.meta_description || '',
    });
    setCustomServiceSlug(service.slug || '');
    setIsManualServiceSlug(false);
    setIsEditingServicePage(true);
  };

  const handleSaveService = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingService) {
      serviceForm.put(`/admin/services/${editingService.id}`, {
        onSuccess: () => {
          setIsEditingServicePage(false);
          setEditingService(null);
          triggerNotification(`Đã cập nhật chi tiết dịch vụ "${serviceForm.data.title}"!`);
        }
      });
    } else {
      serviceForm.post('/admin/services', {
        onSuccess: () => {
          setIsEditingServicePage(false);
          serviceForm.reset();
          triggerNotification(`Đã tạo thành công gói dịch vụ mới "${serviceForm.data.title}"!`);
        }
      });
    }
  };

  const handleDeleteService = (id: number, title: string) => {
    if (confirm(`Bạn có chắc chắn muốn xóa gói dịch vụ "${title}" khỏi hệ thống không?`)) {
      router.delete(`/admin/services/${id}`, {
        onSuccess: () => {
          triggerNotification(`Đã xóa dịch vụ "${title}" thành công!`);
        }
      });
    }
  };

  // --- SERVICE PILLARS (CATEGORIES) CRUD ---
  const [editingPillar, setEditingPillar] = useState<ServicePillar | null>(null);
  const [showPillarModal, setShowPillarModal] = useState(false);
  const [pillarSearch, setPillarSearch] = useState('');

  const pillarForm = useForm({
    title: '',
    tagline: '',
    description: '',
    icon_name: 'Search',
    order: 0,
  });

  const handleOpenCreatePillar = () => {
    setEditingPillar(null);
    pillarForm.setData({
      title: '',
      tagline: '',
      description: '',
      icon_name: 'Search',
      order: pillars.length,
    });
    setShowPillarModal(true);
  };

  const handleOpenEditPillar = (pillar: ServicePillar) => {
    setEditingPillar(pillar);
    pillarForm.setData({
      title: pillar.title,
      tagline: pillar.tagline || '',
      description: pillar.description || '',
      icon_name: pillar.icon_name || 'Search',
      order: pillar.order || 0,
    });
    setShowPillarModal(true);
  };

  const handleSavePillar = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingPillar) {
      pillarForm.put(`/admin/pillars/${editingPillar.id}`, {
        onSuccess: () => {
          setShowPillarModal(false);
          setEditingPillar(null);
          triggerNotification(`Đã cập nhật danh mục "${pillarForm.data.title}" thành công!`);
        }
      });
    } else {
      pillarForm.post('/admin/pillars', {
        onSuccess: () => {
          setShowPillarModal(false);
          pillarForm.reset();
          triggerNotification(`Đã tạo danh mục mới "${pillarForm.data.title}" thành công!`);
        }
      });
    }
  };

  const handleDeletePillar = (pillar: ServicePillar) => {
    if (confirm(`CẢNH BÁO: Xóa danh mục "${pillar.title}" sẽ xóa TOÀN BỘ các gói dịch vụ trực thuộc danh mục này! Bạn có chắc chắn muốn xóa không?`)) {
      router.delete(`/admin/pillars/${pillar.id}`, {
        onSuccess: () => {
          triggerNotification(`Đã xóa danh mục "${pillar.title}" và tất cả dịch vụ đi kèm!`);
        }
      });
    }
  };

  // --- ARTICLE CATEGORIES CRUD ---
  const [editingArticleCategory, setEditingArticleCategory] = useState<ArticleCategory | null>(null);
  const [showArticleCategoryModal, setShowArticleCategoryModal] = useState(false);
  const [articleCategorySearch, setArticleCategorySearch] = useState('');

  const articleCategoryForm = useForm({
    name: '',
    order: 0,
  });

  const handleOpenCreateArticleCategory = () => {
    setEditingArticleCategory(null);
    articleCategoryForm.setData({
      name: '',
      order: articleCategories.length,
    });
    setShowArticleCategoryModal(true);
  };

  const handleOpenEditArticleCategory = (cat: ArticleCategory) => {
    setEditingArticleCategory(cat);
    articleCategoryForm.setData({
      name: cat.name,
      order: cat.order || 0,
    });
    setShowArticleCategoryModal(true);
  };

  const handleSaveArticleCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingArticleCategory) {
      articleCategoryForm.put(`/admin/article-categories/${editingArticleCategory.id}`, {
        onSuccess: () => {
          setShowArticleCategoryModal(false);
          setEditingArticleCategory(null);
          triggerNotification(`Đã cập nhật danh mục "${articleCategoryForm.data.name}" thành công!`);
        }
      });
    } else {
      articleCategoryForm.post('/admin/article-categories', {
        onSuccess: () => {
          setShowArticleCategoryModal(false);
          articleCategoryForm.reset();
          triggerNotification(`Đã tạo danh mục mới "${articleCategoryForm.data.name}" thành công!`);
        }
      });
    }
  };

  const handleDeleteArticleCategory = (cat: ArticleCategory) => {
    if (confirm(`CẢNH BÁO: Xóa danh mục "${cat.name}" sẽ xóa TOÀN BỘ các bài viết trực thuộc danh mục này! Bạn có chắc chắn muốn xóa không?`)) {
      router.delete(`/admin/article-categories/${cat.id}`, {
        onSuccess: () => {
          triggerNotification(`Đã xóa danh mục "${cat.name}" và tất cả bài viết đi kèm!`);
        }
      });
    }
  };

  const handleExportCSV = () => {
    const csvContent = "data:text/csv;charset=utf-8," 
      + "STT,ID,Benh Nhan,So Dien Thoai,Trang Thai,Ghi Chu Tu Van,Ngay Dang Ky\n"
      + appointments.map((e, index) => `${index + 1},${e.id},${e.patient_name},${e.phone},${e.status},"${e.doctor_notes || ''}",${e.created_at}`).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "danh_sach_khach_hang_crm.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Month Navigation
  const handlePrevMonth = () => {
    if (calMonth === 1) {
      setCalMonth(12);
      setCalYear(calYear - 1);
    } else {
      setCalMonth(calMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (calMonth === 12) {
      setCalMonth(1);
      setCalYear(calYear + 1);
    } else {
      setCalMonth(calMonth + 1);
    }
  };

  // Calendar Grid Calculation for Month 7/2026
  const daysInMonth = new Date(calYear, calMonth, 0).getDate();
  const firstDayOfWeek = new Date(calYear, calMonth - 1, 1).getDay();
  const paddingDaysBefore = firstDayOfWeek === 0 ? 6 : firstDayOfWeek - 1;

  // Selected Date string formatted
  const formattedSelectedDate = `${String(selectedDay).padStart(2, '0')}/${String(calMonth).padStart(2, '0')}/${calYear}`;
  
  // Day Appointments with Doctor/Shift Filters (Use Case 1)
  const dayAppointments = appointments.filter(app => {
    try {
      const d = new Date(app.created_at);
      const isSameDay = d.getDate() === selectedDay && (d.getMonth() + 1) === calMonth && d.getFullYear() === calYear;
      if (!isSameDay) return false;

      // Doctor filter
      if (selectedDoctorFilter !== 'all' && selectedDoctorFilter === '1' && !app.patient_name.includes('Hải')) return false;

      return true;
    } catch {
      return false;
    }
  });

  // Capacity calculation (Use Case 3)
  const dailyCapacityLimit = 20; // 20 slots per day max
  const selectedDayCount = getDayCount(selectedDay);
  const capacityPercent = Math.min(100, Math.round((selectedDayCount / dailyCapacityLimit) * 100));

  // Count appointments for each day
  function getDayCount(dayNum: number) {
    return appointments.filter(app => {
      try {
        const d = new Date(app.created_at);
        return d.getDate() === dayNum && (d.getMonth() + 1) === calMonth && d.getFullYear() === calYear;
      } catch {
        return false;
      }
    }).length;
  }

  // CRM Count badges
  const crmCounts = {
    all: appointments.length,
    pending: appointments.filter(a => a.status === 'pending').length,
    confirmed: appointments.filter(a => a.status === 'confirmed').length,
    completed: appointments.filter(a => a.status === 'completed').length,
    cancelled: appointments.filter(a => a.status === 'cancelled').length,
  };

  // Filtered CRM Leads
  const filteredAppointments = appointments.filter(a => {
    const matchesSearch = 
      a.patient_name.toLowerCase().includes(crmSearch.toLowerCase()) ||
      a.phone.includes(crmSearch) ||
      (a.notes && a.notes.toLowerCase().includes(crmSearch.toLowerCase())) ||
      (a.doctor_notes && a.doctor_notes.toLowerCase().includes(crmSearch.toLowerCase()));
    
    if (crmStatusFilter === 'all') return matchesSearch;
    return matchesSearch && a.status === crmStatusFilter;
  });

  // Service Count Badges
  const serviceCounts = {
    all: services.length,
    featured: services.filter(s => s.is_featured).length,
    standard: services.filter(s => !s.is_featured).length,
  };

  // Filtered Services
  const filteredServices = services.filter(s => {
    const matchesSearch = s.title.toLowerCase().includes(serviceSearch.toLowerCase()) ||
                          s.pillar_title.toLowerCase().includes(serviceSearch.toLowerCase()) ||
                          (s.description && s.description.toLowerCase().includes(serviceSearch.toLowerCase()));
    
    let matchesStatus = true;
    if (serviceStatusTab === 'featured') matchesStatus = !!s.is_featured;
    if (serviceStatusTab === 'standard') matchesStatus = !s.is_featured;

    let matchesPillar = true;
    if (selectedPillarFilter !== 'all') matchesPillar = s.pillar_title === selectedPillarFilter;

    return matchesSearch && matchesStatus && matchesPillar;
  });

  // Unique Pillars list
  const uniquePillars = Array.from(new Set(services.map(s => s.pillar_title)));

  // Filtered Article Categories
  const filteredArticleCategories = articleCategories.filter(cat => {
    return cat.name.toLowerCase().includes(articleCategorySearch.toLowerCase());
  });

  // Filtered Pillars for the Category list
  const filteredPillars = pillars.filter(p => {
    return p.title.toLowerCase().includes(pillarSearch.toLowerCase()) ||
           (p.tagline && p.tagline.toLowerCase().includes(pillarSearch.toLowerCase())) ||
           (p.description && p.description.toLowerCase().includes(pillarSearch.toLowerCase()));
  });

  // Pagination Logic (20 items per page)
  const totalPages = Math.ceil(filteredAppointments.length / itemsPerPage) || 1;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedAppointments = filteredAppointments.slice(startIndex, startIndex + itemsPerPage);

  // 17 Sidebar Navigation Items
  const sidebarItems = [
    { id: 'overview', label: 'Tổng quan hệ thống', icon: LayoutDashboard, badge: null },
    { id: 'consultations', label: 'Đăng ký tư vấn', icon: PhoneCall, badge: stats.pending_consultations },
    { id: 'appointments', label: 'Lịch hẹn trực tuyến', icon: CalendarIcon, badge: stats.total_appointments },
    { id: 'articles', label: 'Bài viết', icon: BookOpen, badge: null },
    { id: 'articleCategories', label: 'Danh mục bài viết', icon: Tags, badge: articleCategories.length },
    { id: 'authors', label: 'Tác giả bài viết', icon: Users, badge: null },
    { id: 'services', label: 'Dịch vụ', icon: Sparkles, badge: services.length },
    { id: 'pillars', label: 'Danh mục dịch vụ', icon: Layers, badge: pillars.length },
    { id: 'reviews', label: 'Quản lý đánh giá', icon: MessageSquare, badge: null },
    { id: 'banners', label: 'Quản lý banners', icon: SlidersHorizontal, badge: null },
    { id: 'doctors', label: 'Đội ngũ bác sĩ', icon: UserCheck, badge: null },
    { id: 'schedules', label: 'Lịch trực bác sĩ', icon: CalendarDays, badge: null },
    { id: 'faqs', label: 'Hỏi đáp FAQ', icon: HelpCircle, badge: null },
    { id: 'results', label: 'Kết quả thực tế', icon: CheckCircle2, badge: null },
    { id: 'about', label: 'Quản lý giới thiệu', icon: Info, badge: null },
    { id: 'policies', label: 'Quản lý chính sách', icon: FileText, badge: null },
    { id: 'settings', label: 'Cấu hình hệ thống', icon: Settings, badge: null },
    { id: 'media', label: 'Quản lý Tệp', icon: FolderOpen, badge: null },
    { id: 'configs', label: 'Configs', icon: Wrench, badge: null },
  ];

  // 7-day trend chart
  const chartDays = [
    { date: '15/07', count: 0 },
    { date: '16/07', count: 0 },
    { date: '17/07', count: 0 },
    { date: '18/07', count: 0 },
    { date: '19/07', count: 0 },
    { date: '20/07', count: 0 },
    { date: '21/07', count: appointments.length },
  ];

  return (
    <div className="min-h-screen bg-[#f4f7fb] text-slate-800 font-sans flex antialiased">
      
      {/* Toast Notification */}
      {notificationMsg && (
        <div className="fixed top-6 right-6 bg-emerald-600 text-white font-bold text-xs px-5 py-3 rounded-2xl shadow-xl z-50 flex items-center gap-2 animate-bounce">
          <CheckCircle2 size={18} />
          <span>{notificationMsg}</span>
        </div>
      )}

      {/* LEFT SIDEBAR */}
      <aside className="w-72 bg-white border-r border-slate-200/80 flex flex-col shrink-0 min-h-screen shadow-xs">
        
        {/* Brand Header */}
        <div className="p-6 flex items-center gap-3 border-b border-slate-100 bg-gradient-to-r from-blue-50/50 to-emerald-50/30 min-h-[92px] justify-center">
          {settings.logo_dark ? (
            <img
              src={settings.logo_dark}
              alt="Logo"
              className="h-11 w-auto max-w-[220px] object-contain"
              onError={(e) => {
                (e.target as HTMLImageElement).src = '/assets/logo.png';
              }}
            />
          ) : (
            <>
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#004b87] to-[#00a896] text-white font-black flex items-center justify-center text-xl shadow-md shrink-0">
                <Sparkles size={20} />
              </div>
              <div>
                <h1 className="text-sm font-black tracking-wider text-[#004b87] uppercase truncate max-w-[150px]">
                  {settings.site_name || 'MEDIPLUS HP'}
                </h1>
                <p className="text-[10px] text-[#00a896] font-bold uppercase tracking-widest mt-0.5">
                  MEDICAL CENTRE
                </p>
              </div>
            </>
          )}
        </div>

        {/* Navigation items */}
        <nav className="flex-1 p-4 overflow-y-auto space-y-1.5 text-sm font-semibold">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  changeTab(item.id);
                  setCurrentPage(1);
                }}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl transition-all cursor-pointer ${
                  isActive 
                    ? 'bg-[#004b87] text-white font-bold shadow-md shadow-blue-900/10' 
                    : 'text-slate-600 hover:text-[#004b87] hover:bg-slate-100/70'
                }`}
              >
                <div className="flex items-center gap-3.5">
                  <Icon size={19} className={isActive ? 'text-white' : 'text-slate-400'} />
                  <span>{item.label}</span>
                </div>
                {item.badge !== null && item.badge > 0 && (
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                    isActive ? 'bg-white text-[#004b87]' : 'bg-amber-100 text-amber-800'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Footer Admin User */}
        <div className="p-4 border-t border-slate-100 bg-slate-50/80 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#004b87]/10 text-[#004b87] font-bold flex items-center justify-center text-sm">
              BS
            </div>
            <div>
              <p className="text-xs font-bold text-slate-800 leading-tight">{auth.user.name}</p>
              <p className="text-[11px] text-slate-500">Quản trị viên</p>
            </div>
          </div>
          <Link href="/logout" method="post" as="button" className="text-slate-400 hover:text-rose-600 cursor-pointer p-1.5">
            <LogOut size={18} />
          </Link>
        </div>

      </aside>

      {/* RIGHT MAIN CONTENT AREA */}
      <main className="flex-1 flex flex-col min-w-0 bg-[#f4f7fb] overflow-y-auto p-8 lg:p-10">
        
        {/* TAB 1: TỔNG QUAN HỆ THỐNG */}
        {activeTab === 'overview' && (
          <div className="space-y-8 w-full">
            
            {/* Header Title Bar */}
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-3xl font-black text-[#004b87]">Tổng Quan Hệ Thống</h2>
                <p className="text-sm text-slate-500 mt-1">Hệ thống điều hành và đồng bộ dữ liệu y tế MediPlus HP Medical Centre</p>
              </div>

              {/* Status Badge & Quick Walkin Action */}
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setShowWalkinModal(true)}
                  className="flex items-center gap-2.5 bg-[#004b87] hover:bg-[#003866] text-white font-bold text-sm px-5 py-3 rounded-2xl shadow-md transition-all cursor-pointer"
                >
                  <UserPlus size={18} />
                  Tạo nhanh lịch hẹn tại quầy
                </button>
                <div className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-emerald-50 text-emerald-700 border border-emerald-200/60 text-xs font-bold shadow-xs">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  Hệ thống trực tuyến (Live)
                </div>
              </div>
            </div>

            {/* Top 4 Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1.5">YÊU CẦU TƯ VẤN MỚI</span>
                  <div className="text-3xl font-black text-amber-600">{stats.pending_consultations}</div>
                  <span className="text-xs text-slate-500 mt-1 block">Đang chờ phản hồi</span>
                </div>
                <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                  <PhoneCall size={24} />
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1.5">LƯỢT ĐĂNG KÝ HÔM NAY</span>
                  <div className="text-3xl font-black text-[#004b87]">{appointments.length}</div>
                  <span className="text-xs text-slate-500 mt-1 block">Khách hàng trong ngày</span>
                </div>
                <div className="w-14 h-14 rounded-2xl bg-blue-50 text-[#004b87] flex items-center justify-center shrink-0">
                  <CalendarIcon size={24} />
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1.5">BÀI VIẾT TIN TỨC</span>
                  <div className="text-3xl font-black text-[#00a896]">{articles.length}</div>
                  <span className="text-xs text-slate-500 mt-1 block">Tin tức & chuyên môn</span>
                </div>
                <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-[#00a896] flex items-center justify-center shrink-0">
                  <BookOpen size={24} />
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1.5">DỊCH VỤ HOẠT ĐỘNG</span>
                  <div className="text-3xl font-black text-purple-600">{services.length}</div>
                  <span className="text-xs text-slate-500 mt-1 block">Gồm các dịch vụ nổi bật</span>
                </div>
                <div className="w-14 h-14 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
                  <Sparkles size={24} />
                </div>
              </div>
            </div>

            {/* Middle 7-Day Trend Chart Panel */}
            <div className="bg-white p-8 rounded-2xl border border-slate-200/80 shadow-sm space-y-6 w-full">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-base font-extrabold text-[#004b87] flex items-center gap-2.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#00a896]" />
                    Biểu Đồ Xu Hướng Đăng Ký Khám (7 ngày qua)
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">Tổng cộng có {appointments.length} lượt đăng ký tư vấn và khám bệnh</p>
                </div>

                <button
                  onClick={handleExportCSV}
                  className="flex items-center gap-2 bg-blue-50 hover:bg-blue-100 text-[#004b87] border border-blue-200 font-bold text-xs px-5 py-2.5 rounded-xl transition-all cursor-pointer shadow-xs"
                >
                  <Download size={16} />
                  Xuất dữ liệu Excel (CSV)
                </button>
              </div>

              <div className="pt-8 pb-3 px-6 flex justify-between items-end h-56 border-b border-slate-100">
                {chartDays.map((d, index) => (
                  <div key={index} className="flex flex-col items-center gap-3 flex-1">
                    {d.count > 0 ? (
                      <div className="relative flex flex-col items-center">
                        <span className="bg-[#004b87] text-white text-xs font-bold px-3 py-1 rounded-lg shadow-md mb-2">
                          {d.count}
                        </span>
                        <div className="w-16 bg-[#00a896] rounded-xl h-32 shadow-sm transition-all hover:brightness-110" />
                      </div>
                    ) : (
                      <div className="w-16 bg-slate-100 rounded-xl h-16" />
                    )}
                    <span className="text-xs font-bold text-slate-500 mt-2">{d.date}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom 2 Summary Panels Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
              <div className="bg-white p-8 rounded-2xl border border-slate-200/80 shadow-sm space-y-6">
                <h3 className="text-sm font-extrabold text-[#004b87] uppercase tracking-wider flex items-center gap-2.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                  YÊU CẦU LIÊN HỆ & TƯ VẤN BỆNH NHÂN
                </h3>

                <div className="space-y-4 text-sm pt-2">
                  <div className="flex justify-between items-center py-3 border-b border-slate-100">
                    <span className="text-slate-600 font-medium">Đăng ký khám mới hôm nay</span>
                    <span className="font-bold text-slate-900 text-base">{appointments.length}</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-slate-100">
                    <span className="text-slate-600 font-medium">Yêu cầu chưa xử lý (Chờ xử lý):</span>
                    <span className="font-bold text-amber-600 text-base">{stats.pending_consultations}</span>
                  </div>
                  <div className="flex justify-between items-center py-3">
                    <span className="text-slate-600 font-medium">Đã tiếp cận & xác nhận:</span>
                    <span className="font-bold text-emerald-600 text-base">{appointments.filter(a => a.status === 'confirmed').length}</span>
                  </div>
                </div>
              </div>

              <div className="bg-white p-8 rounded-2xl border border-slate-200/80 shadow-sm space-y-6">
                <h3 className="text-sm font-extrabold text-[#004b87] uppercase tracking-wider flex items-center gap-2.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#00a896]" />
                  QUẢN LÝ CƠ SỞ DỮ LIỆU NỘI DUNG Y TẾ
                </h3>

                <div className="space-y-4 text-sm pt-2">
                  <div className="flex justify-between items-center py-3 border-b border-slate-100">
                    <span className="text-slate-600 font-medium">Danh mục gói dịch vụ khám:</span>
                    <span className="font-bold text-slate-900 text-base">{services.length}</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-slate-100">
                    <span className="text-slate-600 font-medium">Số lượng bài viết cẩm nang đã đăng:</span>
                    <span className="font-bold text-slate-900 text-base">{articles.length}</span>
                  </div>
                  <div className="flex justify-between items-center py-3">
                    <span className="text-slate-600 font-medium">Đội ngũ bác sĩ chuyên khoa:</span>
                    <span className="font-bold text-slate-900 text-base">{doctors.length}</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        )}

        {/* TAB 2: ĐĂNG KÝ TƯ VẤN (CRM) */}
        {activeTab === 'consultations' && (
          <div className="space-y-6 w-full">
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-400">
              <Link href="/admin/dashboard" className="hover:text-[#004b87]">Tổng quan</Link>
              <ChevronRight size={12} />
              <span className="text-slate-700">Danh Sách Đăng Ký Tư Vấn & CRM Khách Hàng</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
              <button
                onClick={() => { setCrmStatusFilter('all'); setCurrentPage(1); }}
                className={`p-4 rounded-2xl border transition-all text-left cursor-pointer ${
                  crmStatusFilter === 'all' ? 'bg-[#004b87] text-white border-[#004b87] shadow-md' : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
                }`}
              >
                <span className="text-[10px] uppercase font-extrabold tracking-wider block opacity-80">Tất cả khách hàng</span>
                <span className="text-2xl font-black mt-0.5 block">{crmCounts.all}</span>
              </button>

              <button
                onClick={() => { setCrmStatusFilter('pending'); setCurrentPage(1); }}
                className={`p-4 rounded-2xl border transition-all text-left cursor-pointer ${
                  crmStatusFilter === 'pending' ? 'bg-blue-600 text-white border-blue-600 shadow-md' : 'bg-white text-slate-700 border-slate-200 hover:border-blue-300'
                }`}
              >
                <span className="text-[10px] uppercase font-extrabold tracking-wider block text-blue-500">Chờ liên hệ</span>
                <span className="text-2xl font-black mt-0.5 block text-blue-600">{crmCounts.pending}</span>
              </button>

              <button
                onClick={() => { setCrmStatusFilter('confirmed'); setCurrentPage(1); }}
                className={`p-4 rounded-2xl border transition-all text-left cursor-pointer ${
                  crmStatusFilter === 'confirmed' ? 'bg-emerald-600 text-white border-emerald-600 shadow-md' : 'bg-white text-slate-700 border-slate-200 hover:border-emerald-300'
                }`}
              >
                <span className="text-[10px] uppercase font-extrabold tracking-wider block text-emerald-500">Đã liên hệ</span>
                <span className="text-2xl font-black mt-0.5 block text-emerald-600">{crmCounts.confirmed}</span>
              </button>

              <button
                onClick={() => { setCrmStatusFilter('completed'); setCurrentPage(1); }}
                className={`p-4 rounded-2xl border transition-all text-left cursor-pointer ${
                  crmStatusFilter === 'completed' ? 'bg-purple-600 text-white border-purple-600 shadow-md' : 'bg-white text-slate-700 border-slate-200 hover:border-purple-300'
                }`}
              >
                <span className="text-[10px] uppercase font-extrabold tracking-wider block text-purple-500">Đã khám xong</span>
                <span className="text-2xl font-black mt-0.5 block text-purple-600">{crmCounts.completed}</span>
              </button>

              <button
                onClick={() => { setCrmStatusFilter('cancelled'); setCurrentPage(1); }}
                className={`p-4 rounded-2xl border transition-all text-left cursor-pointer ${
                  crmStatusFilter === 'cancelled' ? 'bg-rose-600 text-white border-rose-600 shadow-md' : 'bg-white text-slate-700 border-slate-200 hover:border-rose-300'
                }`}
              >
                <span className="text-[10px] uppercase font-extrabold tracking-wider block text-rose-500">Đã hủy</span>
                <span className="text-2xl font-black mt-0.5 block text-rose-600">{crmCounts.cancelled}</span>
              </button>
            </div>

            <div className="bg-white border border-slate-200/80 rounded-2xl p-8 shadow-sm space-y-6 w-full">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-4 border-b border-slate-100">
                <div>
                  <h2 className="text-xl font-extrabold text-[#004b87]">Danh Sách Đăng Ký Tư Vấn & Đặt Lịch (CRM)</h2>
                  <p className="text-xs text-slate-500 mt-1">
                    Quản lý và lưu trữ thông tin khách hàng • Hiển thị 20 khách hàng/trang (Tổng {filteredAppointments.length} hồ sơ)
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
                  <button
                    onClick={handleExportCSV}
                    className="flex items-center gap-1.5 bg-blue-50 hover:bg-blue-100 text-[#004b87] border border-blue-200 font-bold text-xs px-3.5 py-2 rounded-xl transition-all cursor-pointer"
                  >
                    <Download size={14} /> Xuất CSV Excel
                  </button>

                  <div className="relative flex-1 md:w-64">
                    <Search size={15} className="absolute left-3.5 top-3 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Tìm tên, SĐT, ghi chú..."
                      value={crmSearch}
                      onChange={(e) => {
                        setCrmSearch(e.target.value);
                        setCurrentPage(1);
                      }}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-800 outline-none focus:border-[#004b87] focus:bg-white shadow-xs"
                    />
                  </div>

                  <button
                    onClick={() => setShowWalkinModal(true)}
                    className="flex items-center gap-1.5 bg-[#004b87] hover:bg-[#003866] text-white font-bold text-xs px-4 py-2 rounded-xl transition-all cursor-pointer shrink-0 shadow-sm"
                  >
                    <Plus size={15} /> Thêm khách hàng
                  </button>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-700">
                  <thead className="bg-slate-50/80 text-slate-400 uppercase font-extrabold tracking-wider border-b border-slate-200">
                    <tr>
                      <th className="p-4 w-16 text-center">STT / ID</th>
                      <th className="p-4">KHÁCH HÀNG</th>
                      <th className="p-4">SỐ ĐIỆN THOẠI & KẾT NỐI</th>
                      <th className="p-4">NGÀY ĐĂNG KÝ</th>
                      <th className="p-4">GHI CHÚ TƯ VẤN</th>
                      <th className="p-4">TRẠNG THÁI</th>
                      <th className="p-4 text-center">THAO TÁC</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {paginatedAppointments.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="text-center py-12 text-slate-400 font-medium">
                          Không tìm thấy dữ liệu khách hàng nào phù hợp.
                        </td>
                      </tr>
                    ) : (
                      paginatedAppointments.map((app, idx) => {
                        const sttNumber = startIndex + idx + 1;
                        return (
                          <tr key={app.id} className="hover:bg-slate-50/70 transition-colors">
                            <td className="p-4 text-center font-bold text-slate-500 text-xs">
                              <span className="inline-block px-2.5 py-1 bg-slate-100 rounded-lg text-slate-700 font-mono">
                                #{sttNumber}
                              </span>
                            </td>

                            <td className="p-4 font-bold text-[#004b87] text-sm">
                              <div className="flex items-center gap-3">
                                <div className="w-9 h-9 rounded-full bg-[#004b87]/10 text-[#004b87] font-bold flex items-center justify-center text-xs shrink-0">
                                  {app.patient_name[0] || 'K'}
                                </div>
                                <div>
                                  <span>{app.patient_name}</span>
                                  {app.notes && (
                                    <span className="text-[11px] font-normal text-slate-400 block truncate max-w-xs">{app.notes}</span>
                                  )}
                                </div>
                              </div>
                            </td>

                            <td className="p-4">
                              <span className="font-bold text-slate-800 text-sm tracking-wide block mb-1">
                                {app.phone}
                              </span>
                              <div className="flex items-center gap-1.5">
                                <a
                                  href={`tel:${app.phone}`}
                                  className="inline-flex items-center gap-1 px-2 py-0.5 bg-blue-50 text-blue-700 rounded-md text-[10px] font-bold hover:bg-blue-100 transition-colors"
                                >
                                  <Phone size={10} /> Gọi
                                </a>
                                <a
                                  href={`https://zalo.me/${app.phone}`}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="inline-flex items-center gap-1 px-2 py-0.5 bg-emerald-50 text-emerald-700 rounded-md text-[10px] font-bold hover:bg-emerald-100 transition-colors"
                                >
                                  <MessageCircle size={10} /> Zalo
                                </a>
                              </div>
                            </td>

                            <td className="p-4 text-slate-500 font-medium text-xs">
                              {formatDate(app.created_at)}
                            </td>

                            <td className="p-4 text-slate-600 max-w-xs">
                              {app.doctor_notes ? (
                                <span className="text-xs bg-amber-50 text-amber-900 border border-amber-200/60 p-1.5 rounded-lg block line-clamp-2">
                                  {app.doctor_notes}
                                </span>
                              ) : (
                                <span className="text-slate-400 italic text-[11px]">Chưa có ghi chú</span>
                              )}
                            </td>

                            <td className="p-4">
                              <select
                                value={app.status}
                                onChange={(e) => updateAppointmentStatus(app.id, e.target.value)}
                                className={`px-3 py-1.5 rounded-xl text-xs font-bold border outline-none cursor-pointer shadow-xs transition-all ${
                                  app.status === 'confirmed'
                                    ? 'bg-emerald-50 text-emerald-700 border-emerald-300'
                                    : app.status === 'pending'
                                    ? 'bg-blue-50 text-blue-700 border-blue-300'
                                    : app.status === 'completed'
                                    ? 'bg-purple-50 text-purple-700 border-purple-300'
                                    : 'bg-rose-50 text-rose-700 border-rose-300'
                                }`}
                              >
                                <option value="pending" className="bg-white text-slate-800">Chờ liên hệ</option>
                                <option value="confirmed" className="bg-white text-slate-800">Đã liên hệ</option>
                                <option value="completed" className="bg-white text-slate-800">Đã khám xong</option>
                                <option value="cancelled" className="bg-white text-slate-800">Đã hủy</option>
                              </select>
                            </td>

                            <td className="p-4 text-center flex items-center justify-center gap-2">
                              <button
                                onClick={() => {
                                  setSelectedPatient(app);
                                  setPatientNotesText(app.doctor_notes || '');
                                }}
                                className="p-2 text-slate-400 hover:text-[#004b87] hover:bg-blue-50 rounded-xl transition-all cursor-pointer"
                                title="Xem chi tiết & ghi chú CRM"
                              >
                                <Eye size={16} />
                              </button>

                              <button
                                onClick={() => handleDeleteAppointment(app.id, app.patient_name)}
                                className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all cursor-pointer"
                                title="Xóa dữ liệu khách hàng"
                              >
                                <Trash2 size={16} />
                              </button>
                            </td>

                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>

              {filteredAppointments.length > 0 && (
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-4 border-t border-slate-100 text-xs">
                  <div className="text-slate-500 font-medium">
                    Hiển thị từ <strong className="text-slate-800">{startIndex + 1}</strong> đến <strong className="text-slate-800">{Math.min(startIndex + itemsPerPage, filteredAppointments.length)}</strong> trên tổng số <strong className="text-[#004b87]">{filteredAppointments.length}</strong> khách hàng
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      disabled={currentPage === 1}
                      onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                      className="flex items-center gap-1 px-3 py-1.5 rounded-xl border border-slate-200 text-slate-600 font-bold hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                    >
                      <ChevronLeft size={15} /> Trang trước
                    </button>

                    <div className="flex items-center gap-1 font-bold">
                      {[...Array(totalPages)].map((_, i) => {
                        const pageNum = i + 1;
                        return (
                          <button
                            key={pageNum}
                            onClick={() => setCurrentPage(pageNum)}
                            className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all cursor-pointer ${
                              currentPage === pageNum
                                ? 'bg-[#004b87] text-white shadow-sm font-black'
                                : 'text-slate-600 hover:bg-slate-100'
                            }`}
                          >
                            {pageNum}
                          </button>
                        );
                      })}
                    </div>

                    <button
                      disabled={currentPage === totalPages}
                      onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                      className="flex items-center gap-1 px-3 py-1.5 rounded-xl border border-slate-200 text-slate-600 font-bold hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                    >
                      Trang sau <ChevronRight size={15} />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 3: LỊCH HẸN TRỰC TUYẾN (ENHANCED WITH 5 ADVANCED CLINIC SCHEDULING USE CASES) */}
        {activeTab === 'appointments' && (
          <div className="space-y-6 w-full">
            
            {/* Top Breadcrumbs & Useful Clinic Actions Bar */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-400">
                <Link href="/admin/dashboard" className="hover:text-[#004b87]">Tổng quan</Link>
                <ChevronRight size={12} />
                <span className="text-slate-700">Lịch Hẹn Trực Tuyến & Phân Phối Ca Khám</span>
              </div>

              {/* USE CASE 3: CLINIC CAPACITY & PEAK HOURS INDICATOR */}
              <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-2xl border border-slate-200/80 shadow-xs text-xs font-bold">
                <Activity size={16} className="text-[#00a896]" />
                <span className="text-slate-600">Công suất ngày {formattedSelectedDate}:</span>
                <span className="text-[#004b87] font-extrabold">{selectedDayCount} / {dailyCapacityLimit} suất</span>
                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold ${
                  capacityPercent > 80 ? 'bg-rose-100 text-rose-800' : capacityPercent > 50 ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'
                }`}>
                  {capacityPercent > 80 ? 'Quá tải' : capacityPercent > 50 ? 'Đông khách' : 'Bình thường'}
                </span>
              </div>
            </div>

            {/* USE CASE 1 & 4: ADVANCED FILTERS BAR (DOCTOR & SHIFT FILTERS) */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex flex-wrap justify-between items-center gap-4 text-xs">
              <div className="flex items-center gap-3 flex-wrap">
                <span className="font-extrabold text-[#004b87] flex items-center gap-1.5">
                  <Filter size={15} /> Bộ Lọc Ca Khám & Bác Sĩ:
                </span>

                {/* Doctor Filter */}
                <select
                  value={selectedDoctorFilter}
                  onChange={(e) => setSelectedDoctorFilter(e.target.value)}
                  className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-xs font-bold text-slate-700 outline-none cursor-pointer"
                >
                  <option value="all">Tất cả Bác sĩ (BSCKII Đoàn Khôi + Khác)</option>
                  <option value="1">BSCKII Đoàn Khôi (Chuyên khoa Nội Tim Mạch)</option>
                </select>

                {/* Shift Filter */}
                <select
                  value={selectedShiftFilter}
                  onChange={(e) => setSelectedShiftFilter(e.target.value)}
                  className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-xs font-bold text-slate-700 outline-none cursor-pointer"
                >
                  <option value="all">Tất cả Ca khám (Sáng & Chiều)</option>
                  <option value="morning">Ca Sáng (07:30 – 11:30)</option>
                  <option value="afternoon">Ca Chiều (13:30 – 18:30)</option>
                </select>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowWalkinModal(true)}
                  className="flex items-center gap-1.5 bg-[#004b87] hover:bg-[#003866] text-white font-bold px-4 py-2 rounded-xl text-xs shadow-xs transition-all cursor-pointer"
                >
                  <Plus size={15} /> Tạo mới ca hẹn
                </button>
              </div>
            </div>

            {/* 2-COLUMN CALENDAR & DAILY ALLOCATION SCHEDULER */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 w-full">
              
              {/* LEFT 7-COLUMNS: MONTHLY CALENDAR GRID */}
              <div className="lg:col-span-7 bg-white border border-slate-200/80 rounded-3xl p-7 shadow-sm space-y-6">
                
                {/* Calendar Header */}
                <div className="flex justify-between items-center pb-4 border-b border-slate-100">
                  <div>
                    <div className="flex items-center gap-3">
                      <h2 className="text-xl font-extrabold text-[#004b87]">Lịch Hẹn Trực Tuyến</h2>
                      <button
                        onClick={() => setShowWalkinModal(true)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#004b87]/10 hover:bg-[#004b87]/20 text-[#004b87] font-bold rounded-xl text-xs transition-all cursor-pointer"
                      >
                        <Plus size={14} /> Tạo lịch hẹn
                      </button>
                    </div>
                    <p className="text-xs text-slate-500 mt-1">Quản lý và điều phối lịch trình chăm sóc & thăm khám tim mạch</p>
                  </div>

                  {/* Month Switcher Controls */}
                  <div className="flex items-center gap-3 bg-slate-50 px-3 py-1.5 rounded-2xl border border-slate-200/70">
                    <button onClick={handlePrevMonth} className="p-1 text-slate-500 hover:text-slate-900 cursor-pointer">
                      <ChevronLeft size={16} />
                    </button>
                    <span className="text-xs font-extrabold text-slate-800 font-mono tracking-wider">
                      THÁNG {calMonth} / {calYear}
                    </span>
                    <button onClick={handleNextMonth} className="p-1 text-slate-500 hover:text-slate-900 cursor-pointer">
                      <ChevronRight size={16} />
                    </button>
                  </div>
                </div>

                {/* Calendar Days Table Grid */}
                <div>
                  <div className="grid grid-cols-7 text-center text-xs font-extrabold text-slate-500 mb-3">
                    <div>T2</div>
                    <div>T3</div>
                    <div>T4</div>
                    <div>T5</div>
                    <div>T6</div>
                    <div>T7</div>
                    <div className="text-rose-500">CN</div>
                  </div>

                  <div className="grid grid-cols-7 gap-2">
                    {[...Array(paddingDaysBefore)].map((_, i) => (
                      <div key={`pad-${i}`} className="h-16 rounded-2xl bg-slate-50/40 border border-slate-100/50 opacity-30" />
                    ))}

                    {[...Array(daysInMonth)].map((_, i) => {
                      const dayNum = i + 1;
                      const isSelected = dayNum === selectedDay;
                      const count = getDayCount(dayNum);
                      return (
                        <button
                          key={dayNum}
                          onClick={() => setSelectedDay(dayNum)}
                          className={`h-16 rounded-2xl border p-2 flex flex-col justify-between items-start transition-all cursor-pointer relative ${
                            isSelected 
                              ? 'bg-blue-50/70 border-[#004b87] shadow-md ring-2 ring-[#004b87]/20 font-black' 
                              : 'bg-white border-slate-200/80 hover:border-slate-300 hover:bg-slate-50/80'
                          }`}
                        >
                          <span className={`text-xs font-extrabold ${isSelected ? 'text-[#004b87]' : 'text-slate-700'}`}>
                            {dayNum}
                          </span>

                          {count > 0 && (
                            <span className="w-5 h-5 rounded-full bg-[#00a896] text-white font-bold text-[10px] flex items-center justify-center self-end shadow-xs">
                              {count}
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>

              </div>

              {/* RIGHT 5-COLUMNS: DAILY ALLOCATION SCHEDULER PANEL */}
              <div className="lg:col-span-5 bg-white border border-slate-200/80 rounded-3xl p-7 shadow-sm flex flex-col justify-between">
                
                <div>
                  <div className="flex justify-between items-center pb-4 border-b border-slate-100 mb-6">
                    <div>
                      <h3 className="text-xs font-extrabold text-slate-400 uppercase tracking-wider">BẢNG PHÂN PHỐI LỊCH HẸN</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <CalendarCheck size={16} className="text-[#004b87]" />
                        <span className="text-base font-black text-[#004b87]">{formattedSelectedDate}</span>
                      </div>
                    </div>

                    <span className="px-3 py-1 bg-slate-100 text-slate-700 font-extrabold rounded-full text-xs">
                      {dayAppointments.length} LỊCH
                    </span>
                  </div>

                  {dayAppointments.length === 0 ? (
                    <div className="py-20 flex flex-col items-center justify-center text-center text-slate-400 space-y-3">
                      <div className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400">
                        <CalendarIcon size={28} />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-slate-700">Không có lịch hẹn nào</h4>
                        <p className="text-xs text-slate-400 mt-1 max-w-xs">
                          Không tìm thấy yêu cầu đặt lịch hẹn nào trong ngày {formattedSelectedDate}.
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {dayAppointments.map(app => (
                        <div key={app.id} className="p-4 bg-slate-50 rounded-2xl border border-slate-200/70 space-y-3">
                          <div className="flex justify-between items-start">
                            <div className="flex items-center gap-3">
                              <div className="w-9 h-9 rounded-full bg-[#004b87]/10 text-[#004b87] font-bold flex items-center justify-center text-xs">
                                {app.patient_name[0]}
                              </div>
                              <div>
                                <h4 className="text-sm font-bold text-slate-900">{app.patient_name}</h4>
                                <span className="text-xs text-[#00a896] font-semibold">{app.phone}</span>
                              </div>
                            </div>
                            <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                              app.status === 'confirmed' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                            }`}>
                              {app.status === 'confirmed' ? 'Đã xác nhận' : 'Mới tiếp nhận'}
                            </span>
                          </div>

                          <div className="text-xs text-slate-600 space-y-1 pt-1 border-t border-slate-200/50">
                            <p>Gói dịch vụ: <strong>{app.service_slug || 'Khám tim mạch tổng quát'}</strong></p>
                            <p>Bác sĩ phụ trách: <strong>BSCKII Đoàn Khôi (Phòng 101)</strong></p>
                            {app.notes && <p className="italic text-slate-500">"{app.notes}"</p>}
                          </div>

                          {/* ACTION BUTTONS: RESCHEDULE, PRINT TICKET, CONFIRM */}
                          <div className="flex items-center justify-between pt-2 border-t border-slate-200/60">
                            <div className="flex items-center gap-1.5">
                              {/* EDIT PATIENT INFO BUTTON */}
                              <button
                                onClick={() => {
                                  setEditingPatientInfo(app);
                                  patientEditForm.setData({
                                    patient_name: app.patient_name,
                                    phone: app.phone,
                                    service_slug: app.service_slug || 'Gói Khám Tim Mạch Tổng Quát',
                                    notes: app.notes || '',
                                    doctor_notes: app.doctor_notes || '',
                                    status: app.status,
                                  });
                                }}
                                className="inline-flex items-center gap-1 px-2.5 py-1 bg-blue-50 text-[#004b87] hover:bg-blue-100 rounded-lg text-xs font-bold transition-all cursor-pointer border border-blue-100"
                                title="Chỉnh sửa thông tin hồ sơ bệnh nhân"
                              >
                                <Edit size={12} /> Sửa
                              </button>

                              {/* USE CASE 2: RESCHEDULE BUTTON */}
                              <button
                                onClick={() => setReschedulingAppointment(app)}
                                className="inline-flex items-center gap-1 px-2.5 py-1 bg-amber-50 text-amber-800 hover:bg-amber-100 rounded-lg text-xs font-bold transition-all cursor-pointer"
                                title="Đổi / Dời lịch hẹn sang ngày mới"
                              >
                                <CalendarRange size={12} /> Dời lịch
                              </button>

                              {/* USE CASE 5: PRINT RECEPTION TICKET */}
                              <button
                                onClick={() => setPrintingAppointment(app)}
                                className="inline-flex items-center gap-1 px-2.5 py-1 bg-slate-100 text-slate-700 hover:bg-slate-200 rounded-lg text-xs font-bold transition-all cursor-pointer"
                                title="In phiếu tiếp nhận khám bệnh"
                              >
                                <Printer size={12} /> In phiếu
                              </button>
                            </div>

                            <button
                              onClick={() => {
                                updateAppointmentStatus(app.id, 'confirmed');
                                triggerNotification(`Đã xác nhận lịch hẹn cho ${app.patient_name}`);
                              }}
                              className="px-3 py-1 bg-[#00a896] hover:bg-[#009081] text-white rounded-lg text-xs font-bold transition-all cursor-pointer"
                            >
                              Xác nhận ➔
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="pt-6 border-t border-slate-100 text-center text-xs text-slate-400">
                  Nhấp vào bất kỳ ngày nào trên lịch để xem phân phối lịch hẹn
                </div>

              </div>

            </div>

          </div>
        )}

        {/* TAB 6: DANH MỤC DỊCH VỤ Y KHOA & TRANG CHỈNH SỬA CHI TIẾT DỊCH VỤ 2 CỘT */}
        {activeTab === 'services' && (
          isEditingServicePage ? (
            /* FULL-PAGE 2-COLUMN SERVICE EDITOR MATCHING ARTICLES EDITOR */
            <form onSubmit={handleSaveService} className="space-y-6 w-full pb-16">
              
              {/* Top Breadcrumbs */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-400">
                  <button
                    type="button"
                    onClick={() => setIsEditingServicePage(false)}
                    className="hover:text-[#004b87] flex items-center gap-1 cursor-pointer"
                  >
                    <Sparkles size={14} /> Danh Mục Dịch Vụ
                  </button>
                  <ChevronRight size={12} />
                  <span className="text-slate-700 font-bold">{editingService ? 'Chỉnh Sửa Chi Tiết Gói Dịch Vụ' : 'Thêm Gói Dịch Vụ Y Khoa Mới'}</span>
                </div>

                <button
                  type="button"
                  onClick={() => setIsEditingServicePage(false)}
                  className="text-xs text-slate-500 hover:text-slate-800 font-bold flex items-center gap-1 cursor-pointer bg-white px-3 py-1.5 rounded-xl border border-slate-200 shadow-xs"
                >
                  <ArrowLeft size={14} /> Quay lại danh sách dịch vụ
                </button>
              </div>

              {/* Language Tab Badge */}
              <div className="flex items-center gap-2 border-b border-slate-200/80 pb-3">
                <span className="px-4 py-1.5 bg-[#004b87] text-white font-extrabold text-xs rounded-xl shadow-xs tracking-wider">
                  VN Tiếng Việt
                </span>
              </div>

              {/* 2-Column Grid Layout */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                {/* LEFT COLUMN (lg:col-span-8 - 70%) */}
                <div className="lg:col-span-8 space-y-6">
                  
                  {/* 1. TÊN GÓI DỊCH VỤ & CUSTOM SLUG URL */}
                  <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-3">
                    <div className="flex justify-between items-center">
                      <label className="text-xs font-black text-slate-700 uppercase tracking-wider">
                        TÊN GÓI DỊCH VỤ Y KHOA *
                      </label>
                      <span className="text-[11px] text-slate-400 font-mono font-medium">
                        {serviceForm.data.title.length} Characters
                      </span>
                    </div>

                    <input
                      type="text"
                      required
                      placeholder="Ví dụ: Gói Khám Tim Mạch Tổng Quát, Tầm Soát Tăng Huyết Áp 24h..."
                      value={serviceForm.data.title}
                      onChange={(e) => serviceForm.setData('title', e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-sm font-bold text-slate-800 outline-none focus:border-[#004b87] focus:bg-white transition-all shadow-2xs"
                    />

                    {/* Live Slug URL Preview & Editor */}
                    <div className="pt-2 border-t border-slate-100 space-y-1.5 text-[11px]">
                      <div className="flex items-center justify-between font-mono">
                        <div className="text-blue-600 font-medium truncate flex-1">
                          Đường dẫn (URL): <span className="underline">https://mediplus.vn/dich-vu/{customServiceSlug || (serviceForm.data.title ? serviceForm.data.title.toLowerCase().replace(/[^a-z0-9]/g, '-') : 'slug-dich-vu')}</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => setIsManualServiceSlug(!isManualServiceSlug)}
                          className="px-2.5 py-1 bg-blue-50 hover:bg-blue-100 text-[#004b87] font-bold rounded-lg cursor-pointer shrink-0 ml-2 border border-blue-200 transition-all flex items-center gap-1"
                        >
                          {isManualServiceSlug ? (
                            <>
                              <Lock size={11} /> Khóa Slug
                            </>
                          ) : (
                            <>
                              <Edit size={11} /> Chỉnh Slug URL
                            </>
                          )}
                        </button>
                      </div>

                      {isManualServiceSlug && (
                        <div className="pt-1">
                          <label className="block text-slate-600 font-bold mb-1">Tùy chỉnh đường dẫn tĩnh (Slug URL):</label>
                          <input
                            type="text"
                            placeholder="nhap-duong-dan-dich-vu-chuan-seo"
                            value={customServiceSlug}
                            onChange={(e) => setCustomServiceSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '-'))}
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 font-mono text-slate-800 outline-none focus:border-[#004b87] focus:bg-white"
                          />
                        </div>
                      )}
                    </div>
                  </div>

                  {/* 2. NHÓM TRỤ CỘT Y KHOA & GIÁ NIÊM YẾT & THỜI GIAN KHÁM */}
                  <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-xs font-black text-slate-700 uppercase tracking-wider mb-2">
                          NHÓM DANH MỤC DỊCH VỤ *
                        </label>
                        <select
                          value={serviceForm.data.service_pillar_id}
                          onChange={(e) => serviceForm.setData('service_pillar_id', parseInt(e.target.value))}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs font-bold text-slate-700 outline-none focus:border-[#004b87] cursor-pointer"
                        >
                          {pillars.map((pillar) => (
                            <option key={pillar.id} value={pillar.id}>
                              {pillar.title}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-black text-slate-700 uppercase tracking-wider mb-2">
                          GIÁ NIÊM YẾT *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="Ví dụ: 500.000 VNĐ - 1.200.000 VNĐ"
                          value={serviceForm.data.price}
                          onChange={(e) => serviceForm.setData('price', e.target.value)}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs font-mono font-bold text-slate-800 outline-none focus:border-[#004b87] focus:bg-white"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-black text-slate-700 uppercase tracking-wider mb-2">
                          THỜI GIAN THỰC HIỆN *
                        </label>
                        <input
                          type="text"
                          placeholder="Ví dụ: 60 - 90 phút"
                          value={serviceForm.data.estimated_time}
                          onChange={(e) => serviceForm.setData('estimated_time', e.target.value)}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs font-bold text-slate-800 outline-none focus:border-[#004b87] focus:bg-white"
                        />
                      </div>
                    </div>
                  </div>

                  {/* 3. TAGLINE NGẮN & MÔ TẢ TÓM TẮT DỊCH VỤ */}
                  <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
                    <div>
                      <label className="block text-xs font-black text-slate-700 uppercase tracking-wider mb-2">
                        TAGLINE / THÔNG ĐIỆP NGẮN *
                      </label>
                      <input
                        type="text"
                        placeholder="Ví dụ: Đánh giá sức khỏe trái tim toàn diện & phát hiện sớm biến chứng"
                        value={serviceForm.data.tagline}
                        onChange={(e) => serviceForm.setData('tagline', e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs font-bold text-slate-800 outline-none focus:border-[#004b87] focus:bg-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-black text-slate-700 uppercase tracking-wider mb-2">
                        MÔ TẢ TÓM TẮT GÓI DỊCH VỤ *
                      </label>
                      <textarea
                        rows={3}
                        required
                        placeholder="Khám lâm sàng toàn diện kết hợp đo đạc các chỉ số sinh hóa cơ bản và hình ảnh học tim mạch chuẩn chuyên khoa..."
                        value={serviceForm.data.description}
                        onChange={(e) => serviceForm.setData('description', e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-xs text-slate-800 outline-none focus:border-[#004b87] focus:bg-white leading-relaxed resize-none"
                      />
                    </div>
                  </div>

                  {/* 4. NỘI DUNG CHI TIẾT GÓI KHÁM (WYSIWYG RICH TEXT EDITOR) */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider">
                        NỘI DUNG CHI TIẾT QUY TRÌNH & PHÁC ĐỒ *
                      </label>

                      <div className="flex items-center gap-2 text-[11px] font-mono font-medium text-slate-500">
                        <span>{getArticleWordCount(serviceForm.data.detailed_description)} từ</span>
                      </div>
                    </div>

                    <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-2xs">
                      {/* Attached Clean Minimal Toolbar matching article editor */}
                      {serviceEditorMode === 'wysiwyg' && (
                        <div className="px-4 py-2.5 bg-slate-50/80 border-b border-slate-200/80 flex flex-wrap items-center justify-between gap-2 text-xs font-semibold text-slate-600">
                          <div className="flex flex-wrap items-center gap-1">
                            {/* Formatting B I U S */}
                            <button
                              type="button"
                              onClick={() => execServiceEditorCmd('bold')}
                              className={`p-1.5 rounded-md cursor-pointer transition-all ${
                                activeFormats.bold ? 'bg-[#004b87] text-white shadow-xs font-black scale-105' : 'hover:bg-slate-200/80 text-slate-700 font-extrabold'
                              }`}
                              title="In đậm (Bold)"
                            >
                              B
                            </button>
                            <button
                              type="button"
                              onClick={() => execServiceEditorCmd('italic')}
                              className={`p-1.5 rounded-md cursor-pointer transition-all ${
                                activeFormats.italic ? 'bg-[#004b87] text-white shadow-xs italic scale-105' : 'hover:bg-slate-200/80 text-slate-700 italic'
                              }`}
                              title="In nghiêng (Italic)"
                            >
                              I
                            </button>
                            <button
                              type="button"
                              onClick={() => execServiceEditorCmd('underline')}
                              className={`p-1.5 rounded-md cursor-pointer transition-all ${
                                activeFormats.underline ? 'bg-[#004b87] text-white shadow-xs underline scale-105' : 'hover:bg-slate-200/80 text-slate-700 underline'
                              }`}
                              title="Gạch chân (Underline)"
                            >
                              U
                            </button>
                            <button
                              type="button"
                              onClick={() => execServiceEditorCmd('strikeThrough')}
                              className={`p-1.5 rounded-md cursor-pointer transition-all ${
                                activeFormats.strikeThrough ? 'bg-[#004b87] text-white shadow-xs line-through scale-105' : 'hover:bg-slate-200/80 text-slate-700 line-through'
                              }`}
                              title="Gạch ngang (Strikethrough)"
                            >
                              S
                            </button>

                            <span className="w-px h-4 bg-slate-300 mx-1"></span>

                            {/* Link / Unlink / Image */}
                            <button
                              type="button"
                              onClick={() => {
                                saveEditorSelection();
                                const url = prompt('Nhập địa chỉ đường dẫn liên kết (URL):', 'https://');
                                if (url) {
                                  if (serviceEditorRef.current) serviceEditorRef.current.focus();
                                  execServiceEditorCmd('createLink', url);
                                }
                              }}
                              className="p-1.5 hover:bg-slate-200/80 text-slate-700 rounded-md cursor-pointer transition-colors"
                              title="Chèn liên kết URL"
                            >
                              <Link2 size={15} />
                            </button>
                            <button
                              type="button"
                              onClick={() => execServiceEditorCmd('unlink')}
                              className="p-1.5 hover:bg-slate-200/80 text-slate-700 rounded-md cursor-pointer transition-colors"
                              title="Xóa liên kết URL"
                            >
                              <Unlink size={15} />
                            </button>
                            <button
                              type="button"
                              onClick={() => handleOpenMediaPicker('service_editor')}
                              className="p-1.5 hover:bg-slate-200/80 text-slate-700 rounded-md cursor-pointer transition-colors"
                              title="Chèn hình ảnh từ Quản Lý Tệp (Kéo thả)"
                            >
                              <ImageIcon size={15} />
                            </button>

                            <span className="w-px h-4 bg-slate-300 mx-1"></span>

                            {/* Headings H2 H3 P */}
                            <button
                              type="button"
                              onClick={() => execServiceEditorCmd('formatBlock', '<h4>')}
                              className={`px-2 py-1 rounded-md font-bold cursor-pointer transition-all text-xs ${
                                activeFormats.h2 ? 'bg-[#004b87] text-white shadow-xs scale-105' : 'hover:bg-slate-200/80 text-slate-700'
                              }`}
                              title="Tiêu đề H2"
                            >
                              H2
                            </button>
                            <button
                              type="button"
                              onClick={() => execServiceEditorCmd('formatBlock', '<h5>')}
                              className={`px-2 py-1 rounded-md font-bold cursor-pointer transition-all text-xs ${
                                activeFormats.h3 ? 'bg-[#004b87] text-white shadow-xs scale-105' : 'hover:bg-slate-200/80 text-slate-700'
                              }`}
                              title="Tiêu đề H3"
                            >
                              H3
                            </button>
                            <button
                              type="button"
                              onClick={() => execServiceEditorCmd('formatBlock', '<p>')}
                              className={`px-2 py-1 rounded-md font-bold cursor-pointer transition-all text-xs ${
                                activeFormats.p ? 'bg-[#004b87] text-white shadow-xs scale-105' : 'hover:bg-slate-200/80 text-slate-700'
                              }`}
                              title="Đoạn văn"
                            >
                              P
                            </button>

                            <span className="w-px h-4 bg-slate-300 mx-1"></span>

                            {/* Lists */}
                            <button
                              type="button"
                              onClick={() => execServiceEditorCmd('insertUnorderedList')}
                              className={`p-1.5 rounded-md cursor-pointer transition-all ${
                                activeFormats.unorderedList ? 'bg-[#004b87] text-white shadow-xs scale-105' : 'hover:bg-slate-200/80 text-slate-700'
                              }`}
                              title="Danh sách chấm"
                            >
                              <List size={15} />
                            </button>
                            <button
                              type="button"
                              onClick={() => execServiceEditorCmd('insertOrderedList')}
                              className={`p-1.5 rounded-md cursor-pointer transition-all ${
                                activeFormats.orderedList ? 'bg-[#004b87] text-white shadow-xs scale-105' : 'hover:bg-slate-200/80 text-slate-700'
                              }`}
                              title="Danh sách số"
                            >
                              <ListOrdered size={15} />
                            </button>

                            <span className="w-px h-4 bg-slate-300 mx-1"></span>

                            {/* Alignment */}
                            <button
                              type="button"
                              onClick={() => execServiceEditorCmd('justifyLeft')}
                              className={`p-1.5 rounded-md cursor-pointer transition-all ${
                                activeFormats.alignLeft ? 'bg-[#004b87] text-white shadow-xs scale-105' : 'hover:bg-slate-200/80 text-slate-700'
                              }`}
                              title="Căn trái"
                            >
                              <AlignLeft size={15} />
                            </button>
                            <button
                              type="button"
                              onClick={() => execServiceEditorCmd('justifyCenter')}
                              className={`p-1.5 rounded-md cursor-pointer transition-all ${
                                activeFormats.alignCenter ? 'bg-[#004b87] text-white shadow-xs scale-105' : 'hover:bg-slate-200/80 text-slate-700'
                              }`}
                              title="Căn giữa"
                            >
                              <AlignCenter size={15} />
                            </button>
                            <button
                              type="button"
                              onClick={() => execServiceEditorCmd('justifyRight')}
                              className={`p-1.5 rounded-md cursor-pointer transition-all ${
                                activeFormats.alignRight ? 'bg-[#004b87] text-white shadow-xs scale-105' : 'hover:bg-slate-200/80 text-slate-700'
                              }`}
                              title="Căn phải"
                            >
                              <AlignRight size={15} />
                            </button>

                            <span className="w-px h-4 bg-slate-300 mx-1"></span>

                            {/* Undo / Redo */}
                            <button type="button" onClick={() => execServiceEditorCmd('undo')} className="p-1.5 hover:bg-slate-200/70 text-slate-700 rounded-md cursor-pointer transition-colors" title="Hoàn tác (Undo)">
                              <Undo size={15} />
                            </button>
                            <button type="button" onClick={() => execServiceEditorCmd('redo')} className="p-1.5 hover:bg-slate-200/70 text-slate-700 rounded-md cursor-pointer transition-colors" title="Làm lại (Redo)">
                              <Redo size={15} />
                            </button>
                          </div>

                          {/* Mode Switch (Code vs Visual) */}
                          <div className="flex items-center gap-1 text-[11px]">
                            <button
                              type="button"
                              onClick={() => setServiceEditorMode('wysiwyg')}
                              className={`px-2 py-0.5 rounded font-bold transition-all cursor-pointer ${
                                (serviceEditorMode as string) === 'wysiwyg' ? 'bg-[#004b87] text-white' : 'text-slate-500 hover:text-slate-800'
                              }`}
                            >
                              Trực quan
                            </button>
                            <button
                              type="button"
                              onClick={() => setServiceEditorMode('html')}
                              className={`px-2 py-0.5 rounded font-bold transition-all cursor-pointer ${
                                (serviceEditorMode as string) === 'html' ? 'bg-[#004b87] text-white' : 'text-slate-500 hover:text-slate-800'
                              }`}
                            >
                              HTML
                            </button>
                          </div>
                        </div>
                      )}

                      {/* Editor Canvas Area */}
                      {serviceEditorMode === 'wysiwyg' ? (
                        <div
                          ref={serviceEditorRef}
                          contentEditable={true}
                          onInput={syncServiceEditorContentToForm}
                          onBlur={syncServiceEditorContentToForm}
                          onKeyUp={saveEditorSelection}
                          onMouseUp={saveEditorSelection}
                          className="w-full min-h-[300px] max-h-[520px] overflow-y-auto p-6 text-sm text-slate-700 leading-relaxed font-sans cursor-text outline-none space-y-3 [&_h4]:text-lg [&_h4]:font-extrabold [&_h4]:text-slate-800 [&_h4]:mt-6 [&_h4]:mb-3 [&_h5]:text-base [&_h5]:font-bold [&_h5]:text-slate-800 [&_h5]:mt-4 [&_h5]:mb-2 [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:space-y-1.5 [&_ol]:font-bold [&_ol]:text-slate-800 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1.5 [&_a]:text-blue-600 [&_a]:underline [&_img]:rounded-2xl [&_img]:max-w-full [&_img]:my-3 shadow-inner"
                        />
                      ) : (
                        <textarea
                          rows={14}
                          placeholder="Nội dung HTML phác đồ dịch vụ..."
                          value={serviceForm.data.detailed_description}
                          onChange={(e) => {
                            serviceForm.setData('detailed_description', e.target.value);
                            if (serviceEditorRef.current) {
                              serviceEditorRef.current.innerHTML = e.target.value;
                            }
                          }}
                          className="w-full min-h-[300px] bg-slate-900 p-6 text-xs font-mono text-emerald-400 outline-none leading-relaxed resize-y border-none"
                        />
                      )}
                    </div>
                  </div>

                  {/* 5. HẠNG MỤC BAO GỒM TRONG GÓI KHÁM (INCLUDES LIST MANAGER) */}
                  <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
                    <label className="block text-xs font-black text-slate-700 uppercase tracking-wider">
                      HẠNG MỤC KHÁM BAO GỒM (INCLUDES LIST)
                    </label>

                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Nhập hạng mục khám (VD: Siêu âm tim Doppler màu, Đo ECG 12 kênh...)"
                        value={newIncludeInput}
                        onChange={(e) => setNewIncludeInput(e.target.value)}
                        onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleAddInclude(); } }}
                        className="flex-1 bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs font-semibold text-slate-800 outline-none focus:border-[#004b87]"
                      />
                      <button
                        type="button"
                        onClick={handleAddInclude}
                        className="px-4 py-2 bg-[#004b87] hover:bg-[#003866] text-white font-bold text-xs rounded-xl cursor-pointer transition-all"
                      >
                        <Plus size={16} /> Thêm
                      </button>
                    </div>

                    <div className="flex flex-wrap gap-2 pt-2">
                      {(serviceForm.data.includes || []).map((item, idx) => (
                        <span key={idx} className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-50 text-[#004b87] border border-blue-200/70 font-bold rounded-xl text-xs">
                          <CheckCircle2 size={13} className="text-[#00a896]" />
                          <span>{item}</span>
                          <button
                            type="button"
                            onClick={() => handleRemoveInclude(idx)}
                            className="text-slate-400 hover:text-rose-600 font-black ml-1 cursor-pointer"
                          >
                            ×
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* 6. ĐỐI TƯỢNG CHỈ ĐỊNH KHÁM (CANDIDATES LIST MANAGER) */}
                  <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
                    <label className="block text-xs font-black text-slate-700 uppercase tracking-wider">
                      ĐỐI TƯỢNG CHỈ ĐỊNH KHÁM (TARGET AUDIENCE)
                    </label>

                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Nhập đối tượng chỉ định (VD: Người trên 40 tuổi, Người có triệu chứng tức ngực...)"
                        value={newCandidateInput}
                        onChange={(e) => setNewCandidateInput(e.target.value)}
                        onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleAddCandidate(); } }}
                        className="flex-1 bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs font-semibold text-slate-800 outline-none focus:border-[#004b87]"
                      />
                      <button
                        type="button"
                        onClick={handleAddCandidate}
                        className="px-4 py-2 bg-[#00a896] hover:bg-[#009081] text-white font-bold text-xs rounded-xl cursor-pointer transition-all"
                      >
                        <Plus size={16} /> Thêm
                      </button>
                    </div>

                    <div className="flex flex-wrap gap-2 pt-2">
                      {(serviceForm.data.candidates || []).map((item, idx) => (
                        <span key={idx} className="inline-flex items-center gap-2 px-3 py-1.5 bg-amber-50 text-amber-900 border border-amber-200/70 font-bold rounded-xl text-xs">
                          <User size={13} className="text-amber-600" />
                          <span>{item}</span>
                          <button
                            type="button"
                            onClick={() => handleRemoveCandidate(idx)}
                            className="text-slate-400 hover:text-rose-600 font-black ml-1 cursor-pointer"
                          >
                            ×
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>

                </div>

                {/* RIGHT COLUMN (lg:col-span-4 - 30%) */}
                <div className="lg:col-span-4 space-y-6">
                  
                  {/* 1. HÀNH ĐỘNG & TRẠNG THÁI (ACTION CARD) */}
                  <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
                    <h3 className="text-xs font-black text-slate-700 uppercase tracking-wider border-b border-slate-100 pb-3">
                      HÀNH ĐỘNG & TRẠNG THÁI
                    </h3>

                    {/* Publish / Save Button */}
                    <button
                      type="submit"
                      className="w-full py-3.5 bg-[#004b87] hover:bg-[#003866] text-white font-extrabold text-xs uppercase tracking-wider rounded-xl shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
                    >
                      <Save size={16} /> {editingService ? 'LƯU & CẬP NHẬT DỊCH VỤ' : 'XUẤT BẢN GÓI DỊCH VỤ'}
                    </button>

                    {/* Featured Status Toggle Switch */}
                    <div className="flex items-center justify-between py-2 border-t border-b border-slate-100">
                      <div>
                        <span className="text-xs font-bold text-slate-800 block">Dịch vụ nổi bật</span>
                        <span className="text-[11px] text-slate-400 block">Hiển thị ưu tiên tại trang chủ</span>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={serviceForm.data.is_featured}
                          onChange={(e) => serviceForm.setData('is_featured', e.target.checked)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-500"></div>
                      </label>
                    </div>

                    {/* Preview Button */}
                    <button
                      type="button"
                      onClick={() => setShowServicePreviewModal({
                        id: editingService ? editingService.id : 0,
                        title: serviceForm.data.title,
                        pillar_title: pillars.find(p => p.id === serviceForm.data.service_pillar_id)?.title || 'Chưa phân mục',
                        tagline: serviceForm.data.tagline,
                        price: serviceForm.data.price,
                        estimated_time: serviceForm.data.estimated_time,
                        description: serviceForm.data.description,
                        detailed_description: serviceForm.data.detailed_description,
                        includes: serviceForm.data.includes,
                        candidates: serviceForm.data.candidates,
                        image: serviceForm.data.image,
                        is_featured: serviceForm.data.is_featured,
                      })}
                      className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2"
                    >
                      <Eye size={15} /> XEM TRƯỚC GÓI DỊCH VỤ
                    </button>

                    {/* Delete button if editing */}
                    {editingService && (
                      <button
                        type="button"
                        onClick={() => handleDeleteService(editingService.id, editingService.title)}
                        className="w-full py-2 text-rose-600 hover:text-rose-800 font-bold text-xs transition-colors cursor-pointer text-center"
                      >
                        Xóa gói dịch vụ này
                      </button>
                    )}
                  </div>

                  {/* 2. ẢNH ĐẠI DIỆN GÓI DỊCH VỤ (FEATURED IMAGE PICKER) */}
                  <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-4 text-xs">
                    <label className="block font-black text-slate-700 uppercase tracking-wider border-b border-slate-100 pb-2">
                      ẢNH ĐẠI DIỆN DỊCH VỤ
                    </label>

                    {serviceForm.data.image ? (
                      <div className="relative rounded-3xl overflow-hidden border border-slate-200 group bg-slate-900 aspect-video flex items-center justify-center shadow-xs">
                        <img
                          src={serviceForm.data.image}
                          alt="Ảnh dịch vụ"
                          className="w-full h-full object-cover opacity-90 group-hover:opacity-75 transition-opacity"
                          onError={(e) => { (e.target as HTMLImageElement).src = '/assets/screening_service.png'; }}
                        />
                        
                        {/* Center 'Thay đổi ảnh' Black Button */}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <button
                            type="button"
                            onClick={() => handleOpenMediaPicker('service_featured')}
                            className="px-5 py-2.5 bg-black/85 hover:bg-black text-white font-extrabold rounded-2xl text-xs shadow-lg cursor-pointer transition-all flex items-center gap-1.5 backdrop-blur-xs hover:scale-105"
                          >
                            Thay đổi ảnh
                          </button>
                        </div>

                        {/* Top-Right Circular Red Trash Button */}
                        <button
                          type="button"
                          onClick={() => serviceForm.setData('image', '')}
                          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-rose-600 hover:bg-rose-700 text-white flex items-center justify-center shadow-md cursor-pointer transition-transform hover:scale-110"
                          title="Xóa hình ảnh dịch vụ"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    ) : (
                      <div
                        onClick={() => handleOpenMediaPicker('service_featured')}
                        className="rounded-3xl border-2 border-dashed border-slate-300 hover:border-[#004b87] bg-slate-50 hover:bg-blue-50/50 aspect-video flex flex-col items-center justify-center text-center p-4 cursor-pointer transition-all group"
                      >
                        <div className="w-12 h-12 rounded-2xl bg-white text-[#004b87] shadow-xs flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                          <FolderOpen size={24} />
                        </div>
                        <p className="font-extrabold text-[#004b87] text-xs">Bấm Để Chọn Ảnh Đại Diện</p>
                        <p className="text-[11px] text-slate-400 mt-0.5">Tải tệp từ máy tính (Kéo & thả) hoặc từ Quản lý tệp</p>
                      </div>
                    )}
                  </div>

                  {/* 3. CẤU HÌNH SEO META */}
                  <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
                    <h3 className="text-xs font-black text-slate-700 uppercase tracking-wider border-b border-slate-100 pb-3">
                      CẤU HÌNH SEO META
                    </h3>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 mb-1">SEO Title Tag:</label>
                      <input
                        type="text"
                        placeholder="Tiêu đề hiển thị trên Google..."
                        value={serviceForm.data.meta_title}
                        onChange={(e) => serviceForm.setData('meta_title', e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-800 outline-none focus:border-[#004b87]"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 mb-1">SEO Meta Description:</label>
                      <textarea
                        rows={3}
                        placeholder="Mô tả tóm tắt kết quả tìm kiếm Google..."
                        value={serviceForm.data.meta_description}
                        onChange={(e) => serviceForm.setData('meta_description', e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-800 outline-none focus:border-[#004b87] resize-none"
                      />
                    </div>
                  </div>

                </div>

              </div>

            </form>
          ) : (
            /* SERVICES LIST VIEW WITH BATCH ACTIONS & STATUS TABS */
            <div className="space-y-6 w-full">
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-400">
                <Link href="/admin/dashboard" className="hover:text-[#004b87]">Tổng quan</Link>
                <ChevronRight size={12} />
                <span className="text-slate-700">Quản Lý Danh Mục Gói Dịch Vụ Y Khoa</span>
              </div>

              {/* Status Filter Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <button
                  onClick={() => setServiceStatusTab('all')}
                  className={`p-4 rounded-2xl border transition-all text-left cursor-pointer ${
                    serviceStatusTab === 'all' ? 'bg-[#004b87] text-white border-[#004b87] shadow-md' : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <span className="text-[10px] uppercase font-extrabold tracking-wider block opacity-80">Tất cả dịch vụ</span>
                  <span className="text-2xl font-black mt-0.5 block">{serviceCounts.all}</span>
                </button>

                <button
                  onClick={() => setServiceStatusTab('featured')}
                  className={`p-4 rounded-2xl border transition-all text-left cursor-pointer ${
                    serviceStatusTab === 'featured' ? 'bg-amber-500 text-white border-amber-500 shadow-md' : 'bg-white text-slate-700 border-slate-200 hover:border-amber-300'
                  }`}
                >
                  <span className="text-[10px] uppercase font-extrabold tracking-wider block text-amber-500">Dịch vụ nổi bật</span>
                  <span className="text-2xl font-black mt-0.5 block text-amber-600">{serviceCounts.featured}</span>
                </button>

                <button
                  onClick={() => setServiceStatusTab('standard')}
                  className={`p-4 rounded-2xl border transition-all text-left cursor-pointer ${
                    serviceStatusTab === 'standard' ? 'bg-slate-700 text-white border-slate-700 shadow-md' : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <span className="text-[10px] uppercase font-extrabold tracking-wider block text-slate-400">Dịch vụ tiêu chuẩn</span>
                  <span className="text-2xl font-black mt-0.5 block text-slate-600">{serviceCounts.standard}</span>
                </button>
              </div>

              <div className="bg-white border border-slate-200/80 rounded-2xl p-8 shadow-sm space-y-6 w-full">
                
                {/* Header & Search/Filter Toolbar */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-4 border-b border-slate-100">
                  <div>
                    <h2 className="text-xl font-extrabold text-[#004b87]">Quản Lý Danh Mục Gói Dịch Vụ Y Khoa</h2>
                    <p className="text-xs text-slate-500 mt-1">
                      Cấu hình danh mục dịch vụ khám, giá niêm yết & các trụ cột y khoa chuyên sâu ({filteredServices.length} gói dịch vụ)
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
                    <div className="relative flex-1 md:w-64">
                      <Search size={15} className="absolute left-3.5 top-3 text-slate-400" />
                      <input
                        type="text"
                        placeholder="Tìm gói dịch vụ, giá..."
                        value={serviceSearch}
                        onChange={(e) => setServiceSearch(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-800 outline-none focus:border-[#004b87] focus:bg-white shadow-xs"
                      />
                    </div>

                    <select
                      value={selectedPillarFilter}
                      onChange={(e) => setSelectedPillarFilter(e.target.value)}
                      className="bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs font-bold text-slate-700 outline-none focus:border-[#004b87] cursor-pointer shadow-xs"
                    >
                      <option value="all">Tất cả trụ cột y khoa</option>
                      {uniquePillars.map((pillar, i) => (
                        <option key={i} value={pillar}>{pillar}</option>
                      ))}
                    </select>

                    <button
                      onClick={handleOpenCreateService}
                      className="flex items-center gap-1.5 bg-[#004b87] hover:bg-[#003866] text-white font-bold text-xs px-4 py-2.5 rounded-xl transition-all cursor-pointer shrink-0 shadow-sm"
                    >
                      <Plus size={16} /> Thêm gói dịch vụ mới
                    </button>
                  </div>
                </div>

                {/* Batch Action Toolbar */}
                {selectedServiceIds.length > 0 && (
                  <div className="bg-blue-50 border border-blue-200/80 p-3.5 rounded-xl flex items-center justify-between text-xs animate-fadeIn">
                    <span className="font-bold text-[#004b87]">
                      Đã chọn {selectedServiceIds.length} dịch vụ y khoa:
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleBatchServiceAction('feature')}
                        className="px-3 py-1.5 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-lg cursor-pointer transition-all shadow-xs flex items-center gap-1"
                      >
                        <Star size={13} className="fill-white" /> Bật nổi bật
                      </button>
                      <button
                        onClick={() => handleBatchServiceAction('unfeature')}
                        className="px-3 py-1.5 bg-slate-600 hover:bg-slate-700 text-white font-bold rounded-lg cursor-pointer transition-all shadow-xs flex items-center gap-1"
                      >
                        <Star size={13} className="text-slate-300" /> Tắt nổi bật
                      </button>
                      <button
                        onClick={() => handleBatchServiceAction('delete')}
                        className="px-3 py-1.5 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-lg cursor-pointer transition-all shadow-xs flex items-center gap-1"
                      >
                        <Trash2 size={13} /> Xóa hàng loạt
                      </button>
                    </div>
                  </div>
                )}

                {/* Table */}
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs text-slate-700">
                    <thead className="bg-slate-50/80 text-slate-400 uppercase font-extrabold tracking-wider border-b border-slate-200">
                      <tr>
                        <th className="p-4 w-10 text-center">
                          <input
                            type="checkbox"
                            checked={filteredServices.length > 0 && selectedServiceIds.length === filteredServices.length}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setSelectedServiceIds(filteredServices.map(s => s.id));
                              } else {
                                setSelectedServiceIds([]);
                              }
                            }}
                            className="rounded text-[#004b87] cursor-pointer"
                          />
                        </th>
                        <th className="p-4 w-12 text-center">STT</th>
                        <th className="p-4">TÊN GÓI DỊCH VỤ</th>
                        <th className="p-4">NHÓM TRỤ CỘT Y KHOA</th>
                        <th className="p-4">GIÁ NIÊM YẾT</th>
                        <th className="p-4 text-center">TRẠNG THÁI NỔI BẬT</th>
                        <th className="p-4 text-center">THAO TÁC</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {filteredServices.length === 0 ? (
                        <tr>
                          <td colSpan={7} className="text-center py-12 text-slate-400 font-medium">
                            Không tìm thấy dịch vụ y khoa nào phù hợp.
                          </td>
                        </tr>
                      ) : (
                        filteredServices.map((service, index) => (
                          <tr key={service.id} className="hover:bg-slate-50/70 transition-colors">
                            <td className="p-4 text-center">
                              <input
                                type="checkbox"
                                checked={selectedServiceIds.includes(service.id)}
                                onChange={() => toggleSelectService(service.id)}
                                className="rounded text-[#004b87] cursor-pointer"
                              />
                            </td>

                            <td className="p-4 text-center font-bold text-slate-500 font-mono">
                              #{index + 1}
                            </td>

                            <td className="p-4 font-bold text-[#004b87] text-sm">
                              <div className="flex items-center gap-3">
                                <img
                                  src={service.image || '/assets/screening_service.png'}
                                  alt=""
                                  className="w-10 h-10 rounded-xl object-cover border border-slate-200 shrink-0"
                                  onError={(e) => { (e.target as HTMLImageElement).src = '/assets/screening_service.png'; }}
                                />
                                <div>
                                  <div className="flex items-center gap-1.5">
                                    <Sparkles size={14} className="text-[#00a896] shrink-0" />
                                    <span className="hover:underline cursor-pointer" onClick={() => handleOpenEditService(service)}>{service.title}</span>
                                  </div>
                                  {service.tagline && (
                                    <p className="text-[11px] font-medium text-slate-500 mt-0.5 line-clamp-1">{service.tagline}</p>
                                  )}
                                </div>
                              </div>
                            </td>

                            <td className="p-4">
                              <span className="px-3 py-1 bg-blue-50 text-[#004b87] font-bold rounded-lg text-xs border border-blue-100">
                                {service.pillar_title}
                              </span>
                            </td>

                            <td className="p-4 font-black text-slate-900 text-sm font-mono">
                              <div>{service.price}</div>
                              {service.estimated_time && (
                                <div className="text-[11px] text-slate-400 font-normal mt-0.5 flex items-center gap-1">
                                  <Clock size={11} /> {service.estimated_time}
                                </div>
                              )}
                            </td>

                            <td className="p-4 text-center">
                              {service.is_featured ? (
                                <span className="inline-flex items-center gap-1 px-3 py-1 bg-amber-50 text-amber-700 font-bold rounded-full text-xs border border-amber-200">
                                  <Star size={12} fill="currentColor" /> Nổi bật
                                </span>
                              ) : (
                                <span className="px-3 py-1 bg-slate-100 text-slate-500 font-medium rounded-full text-xs">
                                  Thường
                                </span>
                              )}
                            </td>

                            <td className="p-4 text-center">
                              <div className="flex items-center justify-center gap-1">
                                <button
                                  onClick={() => setShowServicePreviewModal(service)}
                                  className="p-2 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-xl transition-all cursor-pointer"
                                  title="Xem trước dịch vụ"
                                >
                                  <Eye size={16} />
                                </button>
                                <button
                                  onClick={() => handleOpenEditService(service)}
                                  className="p-2 text-slate-400 hover:text-[#004b87] hover:bg-blue-50 rounded-xl transition-all cursor-pointer"
                                  title="Chỉnh sửa chi tiết dịch vụ"
                                >
                                  <Edit size={16} />
                                </button>
                                <button
                                  onClick={() => handleDeleteService(service.id, service.title)}
                                  className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all cursor-pointer"
                                  title="Xóa gói dịch vụ"
                                >
                                  <Trash2 size={16} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>

              </div>
            </div>
          )
        )}

        {/* TAB 6B: QUẢN LÝ DANH MỤC DỊCH VỤ (SERVICE PILLARS) */}
        {activeTab === 'pillars' && (
          <div className="space-y-6 w-full animate-fadeIn">
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-400">
              <Link href="/admin/dashboard" className="hover:text-[#004b87]">Tổng quan</Link>
              <ChevronRight size={12} />
              <span className="text-slate-700 font-bold">Danh Mục Dịch Vụ</span>
            </div>

            <div className="bg-white border border-slate-200/80 rounded-2xl p-8 shadow-sm space-y-6 w-full">
              
              {/* Header Toolbar */}
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-4 border-b border-slate-100">
                <div>
                  <h2 className="text-xl font-extrabold text-[#004b87]">Quản Lý Danh Mục Dịch Vụ</h2>
                  <p className="text-xs text-slate-500 mt-1">
                    Quản lý các danh mục (Trụ cột dịch vụ) dùng để nhóm các gói dịch vụ khám bệnh và đồng bộ với bộ lọc của khách hàng ({filteredPillars.length} danh mục)
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
                  <div className="relative flex-1 md:w-64">
                    <Search size={15} className="absolute left-3.5 top-3 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Tìm danh mục..."
                      value={pillarSearch}
                      onChange={(e) => setPillarSearch(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-800 outline-none focus:border-[#004b87] focus:bg-white shadow-xs"
                    />
                  </div>

                  <button
                    onClick={handleOpenCreatePillar}
                    className="flex items-center gap-1.5 bg-[#004b87] hover:bg-[#003866] text-white font-bold text-xs px-4 py-2.5 rounded-xl transition-all cursor-pointer shrink-0 shadow-sm"
                  >
                    <Plus size={16} /> Thêm danh mục mới
                  </button>
                </div>
              </div>

              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-700">
                  <thead className="bg-slate-50/80 text-slate-400 uppercase font-extrabold tracking-wider border-b border-slate-200">
                    <tr>
                      <th className="p-4 w-12 text-center">STT</th>
                      <th className="p-4">TÊN DANH MỤC</th>
                      <th className="p-4">THÔNG ĐIỆP CHÍNH</th>
                      <th className="p-4">MÔ TẢ DANH MỤC</th>
                      <th className="p-4 text-center">ICON</th>
                      <th className="p-4 text-center">THỨ TỰ</th>
                      <th className="p-4 text-center">SỐ DỊCH VỤ CON</th>
                      <th className="p-4 text-center">THAO TÁC</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredPillars.length === 0 ? (
                      <tr>
                        <td colSpan={8} className="text-center py-12 text-slate-400 font-medium">
                          Không tìm thấy danh mục dịch vụ nào.
                        </td>
                      </tr>
                    ) : (
                      filteredPillars.map((pillar, index) => (
                        <tr key={pillar.id} className="hover:bg-slate-50/70 transition-colors">
                          <td className="p-4 text-center font-bold text-slate-500 font-mono">
                            #{index + 1}
                          </td>

                          <td className="p-4 font-bold text-[#004b87] text-sm">
                            <span className="hover:underline cursor-pointer" onClick={() => handleOpenEditPillar(pillar)}>
                              {pillar.title}
                            </span>
                          </td>

                          <td className="p-4 text-slate-600 italic">
                            {pillar.tagline || <span className="text-slate-300">Trống</span>}
                          </td>

                          <td className="p-4 text-slate-500 max-w-xs truncate">
                            {pillar.description || <span className="text-slate-300">Trống</span>}
                          </td>

                          <td className="p-4 text-center">
                            <span className="inline-block px-2.5 py-1 bg-slate-100 text-slate-700 font-bold rounded-lg text-xs">
                              {pillar.icon_name || 'Search'}
                            </span>
                          </td>

                          <td className="p-4 text-center font-bold font-mono">
                            {pillar.order || 0}
                          </td>

                          <td className="p-4 text-center">
                            <span className="px-2.5 py-1 bg-teal-50 text-[#00a896] font-bold border border-teal-150 rounded-lg">
                              {(services.filter(s => s.service_pillar_id === pillar.id) || []).length} dịch vụ
                            </span>
                          </td>

                          <td className="p-4 text-center">
                            <div className="flex items-center justify-center gap-1.5">
                              <button
                                onClick={() => handleOpenEditPillar(pillar)}
                                className="p-2 text-slate-400 hover:text-[#004b87] hover:bg-blue-50 rounded-xl transition-all cursor-pointer"
                                title="Sửa danh mục"
                              >
                                <Edit size={16} />
                              </button>
                              <button
                                onClick={() => handleDeletePillar(pillar)}
                                className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all cursor-pointer"
                                title="Xóa danh mục"
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>

            </div>

            {/* Modal Edit / Add Pillar */}
            {showPillarModal && (
              <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center z-50 p-4 animate-fadeIn">
                <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-lg w-full overflow-hidden animate-scaleIn">
                  <div className="px-6 py-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
                    <h3 className="text-sm font-black text-[#004b87] uppercase tracking-wider">
                      {editingPillar ? 'Chỉnh Sửa Danh Mục Dịch Vụ' : 'Thêm Danh Mục Dịch Vụ Mới'}
                    </h3>
                    <button
                      onClick={() => setShowPillarModal(false)}
                      className="p-1.5 hover:bg-slate-200 text-slate-400 hover:text-slate-600 rounded-lg transition-colors cursor-pointer"
                    >
                      <X size={18} />
                    </button>
                  </div>

                  <form onSubmit={handleSavePillar} className="p-6 space-y-4 text-xs font-semibold text-slate-700">
                    <div>
                      <label className="block text-slate-500 uppercase tracking-wider mb-1.5 font-bold">Tên danh mục *</label>
                      <input
                        type="text"
                        required
                        placeholder="Ví dụ: Tầm soát & Phát hiện sớm, Chẩn đoán & Điều trị..."
                        value={pillarForm.data.title}
                        onChange={(e) => pillarForm.setData('title', e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-800 outline-none focus:border-[#004b87] focus:bg-white"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-500 uppercase tracking-wider mb-1.5 font-bold">Thông điệp ngắn (Tagline)</label>
                      <input
                        type="text"
                        placeholder="Ví dụ: Đánh giá & phòng ngừa sớm biến chứng tim mạch"
                        value={pillarForm.data.tagline}
                        onChange={(e) => pillarForm.setData('tagline', e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-800 outline-none focus:border-[#004b87] focus:bg-white"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-500 uppercase tracking-wider mb-1.5 font-bold">Mô tả danh mục</label>
                      <textarea
                        rows={3}
                        placeholder="Mô tả tóm tắt vai trò hoặc các nhóm dịch vụ thuộc danh mục này..."
                        value={pillarForm.data.description}
                        onChange={(e) => pillarForm.setData('description', e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-800 outline-none focus:border-[#004b87] focus:bg-white resize-none leading-relaxed"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-slate-500 uppercase tracking-wider mb-1.5 font-bold">Icon hiển thị</label>
                        <select
                          value={pillarForm.data.icon_name}
                          onChange={(e) => pillarForm.setData('icon_name', e.target.value)}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-700 font-bold outline-none focus:border-[#004b87] cursor-pointer"
                        >
                          <option value="Search">Search (Kính lúp)</option>
                          <option value="Stethoscope">Stethoscope (Tai nghe y tế)</option>
                          <option value="Activity">Activity (Nhịp tim)</option>
                          <option value="Heart">Heart (Trái tim)</option>
                          <option value="Shield">Shield (Bảo vệ)</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-slate-500 uppercase tracking-wider mb-1.5 font-bold">Thứ tự hiển thị</label>
                        <input
                          type="number"
                          min={0}
                          value={pillarForm.data.order}
                          onChange={(e) => pillarForm.setData('order', parseInt(e.target.value) || 0)}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-800 font-mono outline-none focus:border-[#004b87] focus:bg-white"
                        />
                      </div>
                    </div>

                    <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => setShowPillarModal(false)}
                        className="px-4 py-2.5 bg-slate-150 hover:bg-slate-200 rounded-xl font-bold cursor-pointer transition-colors text-slate-600"
                      >
                        Hủy bỏ
                      </button>
                      <button
                        type="submit"
                        disabled={pillarForm.processing}
                        className="px-5 py-2.5 bg-[#004b87] hover:bg-[#003866] text-white font-extrabold rounded-xl shadow-xs cursor-pointer transition-colors"
                      >
                        {pillarForm.processing ? 'Đang lưu...' : 'Lưu lại'}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 4: QUẢN LÝ BÀI VIẾT TIN TỨC & TRANG CHỈNH SỬA BÀI VIẾT 2 CỘT */}
        {activeTab === 'articles' && (
          isEditingArticlePage ? (
            /* FULL-PAGE 2-COLUMN ARTICLE EDITOR MATCHING REFERENCE SCREENSHOTS */
            <form onSubmit={handleSaveArticle} className="space-y-6 w-full pb-16">
              
              {/* Top Breadcrumbs */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-400">
                  <button
                    type="button"
                    onClick={() => setIsEditingArticlePage(false)}
                    className="hover:text-[#004b87] flex items-center gap-1 cursor-pointer"
                  >
                    <BookOpen size={14} /> Bài Viết
                  </button>
                  <ChevronRight size={12} />
                  <span className="text-slate-700 font-bold">{editingArticle ? 'Chỉnh Sửa Bài Viết' : 'Tạo Bài Viết Mới'}</span>
                </div>

                <button
                  type="button"
                  onClick={() => setIsEditingArticlePage(false)}
                  className="text-xs text-slate-500 hover:text-slate-800 font-bold flex items-center gap-1 cursor-pointer bg-white px-3 py-1.5 rounded-xl border border-slate-200 shadow-xs"
                >
                  <ArrowLeft size={14} /> Quay lại danh sách bài viết
                </button>
              </div>

              {/* Language Tab Badge */}
              <div className="flex items-center gap-2 border-b border-slate-200/80 pb-3">
                <span className="px-4 py-1.5 bg-[#004b87] text-white font-extrabold text-xs rounded-xl shadow-xs tracking-wider">
                  VN Tiếng Việt
                </span>
              </div>

              {/* 2-Column Grid Layout matching reference screenshots */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                {/* LEFT COLUMN (lg:col-span-8 - 70%) */}
                <div className="lg:col-span-8 space-y-6">
                  
                  {/* 1. TIÊU ĐỀ BÀI VIẾT & CUSTOM SLUG URL (USE CASE 2) */}
                  <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-3">
                    <div className="flex justify-between items-center">
                      <label className="text-xs font-black text-slate-700 uppercase tracking-wider">
                        TIÊU ĐỀ BÀI VIẾT *
                      </label>
                      <span className="text-[11px] text-slate-400 font-mono font-medium">
                        {articleForm.data.title.length} Characters, {articleForm.data.title.trim() ? articleForm.data.title.trim().split(/\s+/).length : 0} Words
                      </span>
                    </div>

                    <input
                      type="text"
                      required
                      placeholder="Ví dụ: 5 Dấu hiệu cảnh báo tăng huyết áp ẩn giấu..."
                      value={articleForm.data.title}
                      onChange={(e) => articleForm.setData('title', e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-sm font-bold text-slate-800 outline-none focus:border-[#004b87] focus:bg-white transition-all shadow-2xs"
                    />

                    {/* Live Slug URL Preview & Editor */}
                    <div className="pt-2 border-t border-slate-100 space-y-1.5 text-[11px]">
                      <div className="flex items-center justify-between font-mono">
                        <div className="text-blue-600 font-medium truncate flex-1">
                          Đường dẫn (URL): <span className="underline">https://mediplus.vn/tin-tuc/{customSlug || (articleForm.data.title ? articleForm.data.title.toLowerCase().replace(/[^a-z0-9]/g, '-') : 'slug-bai-viet')}</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => setIsManualSlug(!isManualSlug)}
                          className="px-2.5 py-1 bg-blue-50 hover:bg-blue-100 text-[#004b87] font-bold rounded-lg cursor-pointer shrink-0 ml-2 border border-blue-200 transition-all flex items-center gap-1"
                        >
                          {isManualSlug ? (
                            <>
                              <Lock size={11} /> Khóa Slug
                            </>
                          ) : (
                            <>
                              <Edit size={11} /> Chỉnh Slug URL
                            </>
                          )}
                        </button>
                      </div>

                      {isManualSlug && (
                        <div className="pt-1">
                          <label className="block text-slate-600 font-bold mb-1">Tùy chỉnh đường dẫn tĩnh (Slug URL):</label>
                          <input
                            type="text"
                            placeholder="nhap-duong-dan-bai-viet-chuan-seo"
                            value={customSlug}
                            onChange={(e) => setCustomSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '-'))}
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 font-mono text-slate-800 outline-none focus:border-[#004b87] focus:bg-white"
                          />
                        </div>
                      )}
                    </div>
                  </div>

                  {/* 2. LIÊN KẾT TÁC GIẢ & TÁC GIẢ HIỂN THỊ */}
                  <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-black text-slate-700 uppercase tracking-wider mb-2">
                          LIÊN KẾT TÁC GIẢ (HỒ SƠ HỆ THỐNG)
                        </label>
                        <select
                          value={articleForm.data.author_link}
                          onChange={(e) => {
                            articleForm.setData('author_link', e.target.value);
                            if (e.target.value !== '-- Không liên kết / Tự nhập --') {
                              articleForm.setData('author', e.target.value);
                            }
                          }}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs font-semibold text-slate-700 outline-none focus:border-[#004b87] cursor-pointer"
                        >
                          <option value="-- Không liên kết / Tự nhập --">-- Không liên kết / Tự nhập --</option>
                          <option value="BSCKII Đoàn Khôi">BSCKII Đoàn Khôi</option>
                          <option value="ThS.BS Nguyễn Văn An">ThS.BS Nguyễn Văn An</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-black text-slate-700 uppercase tracking-wider mb-2">
                          TÁC GIẢ HIỂN THỊ *
                        </label>
                        <input
                          type="text"
                          required
                          value={articleForm.data.author}
                          onChange={(e) => articleForm.setData('author', e.target.value)}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs font-bold text-slate-800 outline-none focus:border-[#004b87] focus:bg-white"
                        />
                      </div>
                    </div>
                  </div>

                  {/* 3. MÔ TẢ TÓM TẮT */}
                  <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-2">
                    <label className="block text-xs font-black text-slate-700 uppercase tracking-wider">
                      MÔ TẢ TÓM TẮT *
                    </label>
                    <textarea
                      rows={3}
                      required
                      placeholder="Tìm hiểu các tiêu chí quan trọng để đánh giá một dịch vụ tim mạch toàn diện chuẩn y khoa hiện đại..."
                      value={articleForm.data.excerpt}
                      onChange={(e) => articleForm.setData('excerpt', e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-xs text-slate-800 outline-none focus:border-[#004b87] focus:bg-white leading-relaxed resize-none"
                    />
                  </div>

                  {/* 4. NỘI DUNG CHI TIẾT (EXACT MATCH FOR USER REFERENCE SCREENSHOT) */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider">
                        NỘI DUNG CHI TIẾT *
                      </label>

                      {/* Live Word Count & Reading Time Badge */}
                      <div className="flex items-center gap-2 text-[11px] font-mono font-medium text-slate-500">
                        <span>{getArticleWordCount(articleForm.data.content)} từ • ~{calcReadingTimeMinutes(getArticleWordCount(articleForm.data.content))} phút đọc</span>
                        <button
                          type="button"
                          onClick={() => articleForm.setData('read_time', `${calcReadingTimeMinutes(getArticleWordCount(articleForm.data.content))} phút đọc`)}
                          className="px-2 py-0.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded cursor-pointer transition-all"
                          title="Tự động đồng bộ thời gian đọc"
                        >
                          Đồng bộ
                        </button>
                      </div>
                    </div>

                    <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-2xs">
                      {/* Attached Clean Minimal Toolbar matching screenshot */}
                      {editorMode === 'wysiwyg' && (
                        <div className="px-4 py-2.5 bg-slate-50/80 border-b border-slate-200/80 flex flex-wrap items-center justify-between gap-2 text-xs font-semibold text-slate-600">
                          <div className="flex flex-wrap items-center gap-1">
                            {/* Formatting B I U S */}
                            <button
                              type="button"
                              onClick={() => execEditorCmd('bold')}
                              className={`p-1.5 rounded-md cursor-pointer transition-all ${
                                activeFormats.bold ? 'bg-[#004b87] text-white shadow-xs font-black scale-105' : 'hover:bg-slate-200/80 text-slate-700 font-extrabold'
                              }`}
                              title="In đậm (Bold)"
                            >
                              B
                            </button>
                            <button
                              type="button"
                              onClick={() => execEditorCmd('italic')}
                              className={`p-1.5 rounded-md cursor-pointer transition-all ${
                                activeFormats.italic ? 'bg-[#004b87] text-white shadow-xs italic scale-105' : 'hover:bg-slate-200/80 text-slate-700 italic'
                              }`}
                              title="In nghiêng (Italic)"
                            >
                              I
                            </button>
                            <button
                              type="button"
                              onClick={() => execEditorCmd('underline')}
                              className={`p-1.5 rounded-md cursor-pointer transition-all ${
                                activeFormats.underline ? 'bg-[#004b87] text-white shadow-xs underline scale-105' : 'hover:bg-slate-200/80 text-slate-700 underline'
                              }`}
                              title="Gạch chân (Underline)"
                            >
                              U
                            </button>
                            <button
                              type="button"
                              onClick={() => execEditorCmd('strikeThrough')}
                              className={`p-1.5 rounded-md cursor-pointer transition-all ${
                                activeFormats.strikeThrough ? 'bg-[#004b87] text-white shadow-xs line-through scale-105' : 'hover:bg-slate-200/80 text-slate-700 line-through'
                              }`}
                              title="Gạch ngang (Strikethrough)"
                            >
                              S
                            </button>

                            <span className="w-px h-4 bg-slate-300 mx-1"></span>

                            {/* Link / Unlink / Image */}
                            <button
                              type="button"
                              onClick={() => {
                                saveEditorSelection();
                                const url = prompt('Nhập địa chỉ đường dẫn liên kết (URL):', 'https://');
                                if (url) {
                                  if (editorRef.current) editorRef.current.focus();
                                  execEditorCmd('createLink', url);
                                }
                              }}
                              className="p-1.5 hover:bg-slate-200/80 text-slate-700 rounded-md cursor-pointer transition-colors"
                              title="Chèn liên kết URL"
                            >
                              <Link2 size={15} />
                            </button>
                            <button
                              type="button"
                              onClick={() => execEditorCmd('unlink')}
                              className="p-1.5 hover:bg-slate-200/80 text-slate-700 rounded-md cursor-pointer transition-colors"
                              title="Xóa liên kết URL"
                            >
                              <Unlink size={15} />
                            </button>
                            <button
                              type="button"
                              onClick={() => handleOpenMediaPicker('article_editor')}
                              className="p-1.5 hover:bg-slate-200/80 text-slate-700 rounded-md cursor-pointer transition-colors"
                              title="Chèn hình ảnh từ Quản Lý Tệp (Kéo thả)"
                            >
                              <ImageIcon size={15} />
                            </button>

                            <span className="w-px h-4 bg-slate-300 mx-1"></span>

                            {/* Headings H2 H3 P */}
                            <button
                              type="button"
                              onClick={() => execEditorCmd('formatBlock', '<h4>')}
                              className={`px-2 py-1 rounded-md font-bold cursor-pointer transition-all text-xs ${
                                activeFormats.h2 ? 'bg-[#004b87] text-white shadow-xs scale-105' : 'hover:bg-slate-200/80 text-slate-700'
                              }`}
                              title="Tiêu đề H2"
                            >
                              H2
                            </button>
                            <button
                              type="button"
                              onClick={() => execEditorCmd('formatBlock', '<h5>')}
                              className={`px-2 py-1 rounded-md font-bold cursor-pointer transition-all text-xs ${
                                activeFormats.h3 ? 'bg-[#004b87] text-white shadow-xs scale-105' : 'hover:bg-slate-200/80 text-slate-700'
                              }`}
                              title="Tiêu đề H3"
                            >
                              H3
                            </button>
                            <button
                              type="button"
                              onClick={() => execEditorCmd('formatBlock', '<p>')}
                              className={`px-2 py-1 rounded-md font-bold cursor-pointer transition-all text-xs ${
                                activeFormats.p ? 'bg-[#004b87] text-white shadow-xs scale-105' : 'hover:bg-slate-200/80 text-slate-700'
                              }`}
                              title="Đoạn văn"
                            >
                              P
                            </button>

                            <span className="w-px h-4 bg-slate-300 mx-1"></span>

                            {/* Lists */}
                            <button
                              type="button"
                              onClick={() => execEditorCmd('insertUnorderedList')}
                              className={`p-1.5 rounded-md cursor-pointer transition-all ${
                                activeFormats.unorderedList ? 'bg-[#004b87] text-white shadow-xs scale-105' : 'hover:bg-slate-200/80 text-slate-700'
                              }`}
                              title="Danh sách chấm"
                            >
                              <List size={15} />
                            </button>
                            <button
                              type="button"
                              onClick={() => execEditorCmd('insertOrderedList')}
                              className={`p-1.5 rounded-md cursor-pointer transition-all ${
                                activeFormats.orderedList ? 'bg-[#004b87] text-white shadow-xs scale-105' : 'hover:bg-slate-200/80 text-slate-700'
                              }`}
                              title="Danh sách số"
                            >
                              <ListOrdered size={15} />
                            </button>

                            <span className="w-px h-4 bg-slate-300 mx-1"></span>

                            {/* Alignment */}
                            <button
                              type="button"
                              onClick={() => execEditorCmd('justifyLeft')}
                              className={`p-1.5 rounded-md cursor-pointer transition-all ${
                                activeFormats.alignLeft ? 'bg-[#004b87] text-white shadow-xs scale-105' : 'hover:bg-slate-200/80 text-slate-700'
                              }`}
                              title="Căn trái"
                            >
                              <AlignLeft size={15} />
                            </button>
                            <button
                              type="button"
                              onClick={() => execEditorCmd('justifyCenter')}
                              className={`p-1.5 rounded-md cursor-pointer transition-all ${
                                activeFormats.alignCenter ? 'bg-[#004b87] text-white shadow-xs scale-105' : 'hover:bg-slate-200/80 text-slate-700'
                              }`}
                              title="Căn giữa"
                            >
                              <AlignCenter size={15} />
                            </button>
                            <button
                              type="button"
                              onClick={() => execEditorCmd('justifyRight')}
                              className={`p-1.5 rounded-md cursor-pointer transition-all ${
                                activeFormats.alignRight ? 'bg-[#004b87] text-white shadow-xs scale-105' : 'hover:bg-slate-200/80 text-slate-700'
                              }`}
                              title="Căn phải"
                            >
                              <AlignRight size={15} />
                            </button>

                            <span className="w-px h-4 bg-slate-300 mx-1"></span>

                            {/* Undo / Redo */}
                            <button type="button" onClick={() => execEditorCmd('undo')} className="p-1.5 hover:bg-slate-200/70 text-slate-700 rounded-md cursor-pointer transition-colors" title="Hoàn tác (Undo)">
                              <Undo size={15} />
                            </button>
                            <button type="button" onClick={() => execEditorCmd('redo')} className="p-1.5 hover:bg-slate-200/70 text-slate-700 rounded-md cursor-pointer transition-colors" title="Làm lại (Redo)">
                              <Redo size={15} />
                            </button>
                          </div>

                          {/* Mode Switch (Code vs Visual) */}
                          <div className="flex items-center gap-1 text-[11px]">
                            <button
                              type="button"
                              onClick={() => setEditorMode('wysiwyg')}
                              className={`px-2 py-0.5 rounded font-bold transition-all cursor-pointer ${
                                (editorMode as string) === 'wysiwyg' ? 'bg-[#004b87] text-white' : 'text-slate-500 hover:text-slate-800'
                              }`}
                            >
                              Trực quan
                            </button>
                            <button
                              type="button"
                              onClick={() => setEditorMode('html')}
                              className={`px-2 py-0.5 rounded font-bold transition-all cursor-pointer ${
                                (editorMode as string) === 'html' ? 'bg-[#004b87] text-white' : 'text-slate-500 hover:text-slate-800'
                              }`}
                            >
                              HTML
                            </button>
                          </div>
                        </div>
                      )}

                      {/* Editor Canvas Area (Exact match for screenshot typography and styling) */}
                      {editorMode === 'wysiwyg' ? (
                        <div
                          ref={editorRef}
                          contentEditable={true}
                          onInput={syncEditorContentToForm}
                          onBlur={syncEditorContentToForm}
                          onKeyUp={saveEditorSelection}
                          onMouseUp={saveEditorSelection}
                          className="w-full min-h-[380px] max-h-[520px] overflow-y-auto p-6 text-sm text-slate-700 leading-relaxed font-sans cursor-text outline-none space-y-3 [&_h4]:text-lg [&_h4]:font-extrabold [&_h4]:text-slate-800 [&_h4]:mt-6 [&_h4]:mb-3 [&_h5]:text-base [&_h5]:font-bold [&_h5]:text-slate-800 [&_h5]:mt-4 [&_h5]:mb-2 [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:space-y-1.5 [&_ol]:font-bold [&_ol]:text-slate-800 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1.5 [&_a]:text-blue-600 [&_a]:underline [&_img]:rounded-2xl [&_img]:max-w-full [&_img]:my-3 shadow-inner"
                        />
                      ) : (
                        <textarea
                          rows={16}
                          placeholder="Nội dung HTML bài viết..."
                          value={articleForm.data.content}
                          onChange={(e) => {
                            articleForm.setData('content', e.target.value);
                            if (editorRef.current) {
                              editorRef.current.innerHTML = e.target.value;
                            }
                          }}
                          className="w-full min-h-[380px] bg-slate-900 p-6 text-xs font-mono text-emerald-400 outline-none leading-relaxed resize-y border-none"
                        />
                      )}
                    </div>
                  </div>

                  {/* 5. SEO META SECTION MATCHING REFERENCE SCREENSHOT */}
                  <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
                    <div>
                      <div className="flex justify-between items-center mb-1.5">
                        <label className="text-xs font-black text-slate-700 uppercase tracking-wider">
                          META TITLE
                        </label>
                        <span className="text-[11px] text-slate-400 font-mono">
                          {articleForm.data.meta_title.length} ký tự • {articleForm.data.meta_title ? 'Đã nhập' : 'Trống'}
                        </span>
                      </div>
                      <input
                        type="text"
                        placeholder="Nhập thẻ tiêu đề SEO (Meta Title)..."
                        value={articleForm.data.meta_title}
                        onChange={(e) => articleForm.setData('meta_title', e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-800 outline-none focus:border-[#004b87] focus:bg-white"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-1.5">
                        <label className="text-xs font-black text-slate-700 uppercase tracking-wider">
                          META DESCRIPTION
                        </label>
                        <span className="text-[11px] text-slate-400 font-mono">
                          {articleForm.data.meta_description.length} ký tự • {articleForm.data.meta_description ? 'Đã nhập' : 'Trống'}
                        </span>
                      </div>
                      <textarea
                        rows={3}
                        placeholder="Nhập thẻ mô tả SEO (Meta Description)..."
                        value={articleForm.data.meta_description}
                        onChange={(e) => articleForm.setData('meta_description', e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-800 outline-none focus:border-[#004b87] focus:bg-white resize-none"
                      />
                    </div>
                  </div>

                </div>

                {/* RIGHT COLUMN (lg:col-span-4 - 30% Sidebar) */}
                <div className="lg:col-span-4 space-y-6">
                  
                  {/* Card 1: TRẠNG THÁI & XUẤT BẢN */}
                  <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4 text-xs">
                    <label className="block font-black text-slate-700 uppercase tracking-wider border-b border-slate-100 pb-2">
                      TRẠNG THÁI
                    </label>

                    <div className="flex items-center gap-6">
                      <label className="flex items-center gap-2 cursor-pointer font-bold text-slate-700">
                        <input
                          type="radio"
                          name="is_published"
                          checked={articleForm.data.is_published === true}
                          onChange={() => articleForm.setData('is_published', true)}
                          className="text-[#004b87] focus:ring-[#004b87]"
                        />
                        Hiển thị
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer font-bold text-slate-500">
                        <input
                          type="radio"
                          name="is_published"
                          checked={articleForm.data.is_published === false}
                          onChange={() => articleForm.setData('is_published', false)}
                          className="text-[#004b87] focus:ring-[#004b87]"
                        />
                        Tạm ẩn
                      </label>
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        NGÀY XUẤT BẢN
                      </label>
                      <input
                        type="text"
                        value={articleForm.data.date}
                        onChange={(e) => articleForm.setData('date', e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs font-mono text-slate-800 outline-none focus:border-[#004b87] focus:bg-white font-bold"
                      />
                    </div>

                    <div className="pt-2 border-t border-slate-100">
                      <label className="flex items-center gap-2 cursor-pointer font-bold text-slate-800">
                        <input
                          type="checkbox"
                          checked={articleForm.data.is_featured}
                          onChange={(e) => articleForm.setData('is_featured', e.target.checked)}
                          className="w-4 h-4 rounded text-[#004b87] focus:ring-[#004b87]"
                        />
                        Nổi bật (Hiển thị trang chủ)
                      </label>
                    </div>
                  </div>

                  {/* Card 2: HÌNH ẢNH BÀI VIẾT (CHUẨN SCREENSHOT MỚI) */}
                  <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-4 text-xs">
                    <label className="block font-black text-slate-700 uppercase tracking-wider border-b border-slate-100 pb-2">
                      HÌNH ẢNH BÀI VIẾT
                    </label>

                    {articleForm.data.image ? (
                      <div className="relative rounded-3xl overflow-hidden border border-slate-200 group bg-slate-900 h-48 flex items-center justify-center shadow-xs">
                        <img
                          src={articleForm.data.image}
                          alt="Banner Bài Viết"
                          className="w-full h-full object-cover opacity-90 group-hover:opacity-75 transition-opacity"
                        />
                        
                        {/* Center 'Thay đổi ảnh' Black Button */}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <button
                            type="button"
                            onClick={() => handleOpenMediaPicker('article_featured')}
                            className="px-5 py-2.5 bg-black/85 hover:bg-black text-white font-extrabold rounded-2xl text-xs shadow-lg cursor-pointer transition-all flex items-center gap-1.5 backdrop-blur-xs hover:scale-105"
                          >
                            Thay đổi ảnh
                          </button>
                        </div>

                        {/* Top-Right Circular Red Trash Button */}
                        <button
                          type="button"
                          onClick={() => articleForm.setData('image', '')}
                          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-rose-600 hover:bg-rose-700 text-white flex items-center justify-center shadow-md cursor-pointer transition-transform hover:scale-110"
                          title="Xóa hình ảnh bài viết"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    ) : (
                      <div
                        onClick={() => handleOpenMediaPicker('article_featured')}
                        className="rounded-3xl border-2 border-dashed border-slate-300 hover:border-[#004b87] bg-slate-50 hover:bg-blue-50/50 h-44 flex flex-col items-center justify-center text-center p-4 cursor-pointer transition-all group"
                      >
                        <div className="w-12 h-12 rounded-2xl bg-white text-[#004b87] shadow-xs flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                          <FolderOpen size={24} />
                        </div>
                        <p className="font-extrabold text-[#004b87] text-xs">Bấm Để Chọn Ảnh Đại Diện</p>
                        <p className="text-[11px] text-slate-400 mt-0.5">Tải tệp từ máy tính (Kéo & thả) hoặc từ Quản lý tệp</p>
                      </div>
                    )}
                  </div>

                  {/* Card 3: DANH MỤC & BÀI VIẾT LIÊN QUAN */}
                  <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4 text-xs">
                    <div>
                      <label className="block font-black text-slate-700 uppercase tracking-wider mb-2">
                        DANH MỤC
                      </label>
                      <select
                        value={articleForm.data.article_category_id}
                        onChange={(e) => articleForm.setData('article_category_id', parseInt(e.target.value))}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs font-bold text-slate-800 outline-none focus:border-[#004b87] cursor-pointer"
                      >
                        {articleCategories.map((cat) => (
                          <option key={cat.id} value={cat.id}>
                            {cat.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block font-black text-slate-700 uppercase tracking-wider mb-2">
                        BÀI VIẾT LIÊN QUAN
                      </label>
                      <select
                        value={articleForm.data.related_article_id}
                        onChange={(e) => articleForm.setData('related_article_id', e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-600 outline-none focus:border-[#004b87] cursor-pointer"
                      >
                        <option value="">Chọn bài viết liên quan...</option>
                        {articles.map(a => (
                          <option key={a.id} value={a.id}>{a.title}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Card 4: ACTION BUTTONS MATCHING SCREENSHOT (Xóa | Hủy | LƯU) */}
                  <div className="flex items-center justify-between pt-2">
                    {editingArticle ? (
                      <button
                        type="button"
                        onClick={() => handleDeleteArticle(editingArticle.id, editingArticle.title)}
                        className="text-xs font-extrabold text-rose-600 hover:text-rose-800 transition-colors cursor-pointer"
                      >
                        XÓA
                      </button>
                    ) : (
                      <div></div>
                    )}

                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => setIsEditingArticlePage(false)}
                        className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-extrabold rounded-xl text-xs transition-all cursor-pointer"
                      >
                        Hủy
                      </button>
                      <button
                        type="submit"
                        disabled={articleForm.processing}
                        className="px-7 py-2.5 bg-[#f97316] hover:bg-[#ea580c] text-white font-black rounded-xl text-xs shadow-md transition-all cursor-pointer uppercase tracking-wider"
                      >
                        LƯU
                      </button>
                    </div>
                  </div>

                </div>

              </div>

            </form>
          ) : (
            /* TABLE LIST VIEW */
            <div className="space-y-6 w-full">
              
              {/* Top Breadcrumbs */}
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-400">
                <Link href="/admin/dashboard" className="hover:text-[#004b87]">Tổng quan</Link>
                <ChevronRight size={12} />
                <span className="text-slate-700 font-bold">Quản Lý Bài Viết & Cẩm Nang Y Khoa</span>
              </div>

              {/* Articles Header & Action Bar */}
              <div className="bg-white border border-slate-200/80 rounded-2xl p-8 shadow-sm space-y-6 w-full">
                
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-4 border-b border-slate-100">
                  <div>
                    <h2 className="text-xl font-extrabold text-[#004b87]">Danh Sách Bài Viết & Cẩm Nang Y Khoa</h2>
                    <p className="text-xs text-slate-500 mt-1">
                      Quản lý các bài viết chuyên môn y khoa, cẩm nang sức khỏe tim mạch ({articles.length} bài viết)
                    </p>
                  </div>

                  {/* Filter & Add Article Controls */}
                  <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
                    {/* Search Input */}
                    <div className="relative flex-1 md:w-64">
                      <Search size={15} className="absolute left-3.5 top-3 text-slate-400" />
                      <input
                        type="text"
                        placeholder="Tìm tiêu đề bài viết, tác giả..."
                        value={articleSearch}
                        onChange={(e) => setArticleSearch(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-800 outline-none focus:border-[#004b87] focus:bg-white shadow-xs"
                      />
                    </div>

                    {/* Filter by Category */}
                    <select
                      value={articleCategoryFilter}
                      onChange={(e) => setArticleCategoryFilter(e.target.value)}
                      className="bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs font-bold text-slate-700 outline-none focus:border-[#004b87] cursor-pointer shadow-xs"
                    >
                      <option value="all">Tất cả chuyên mục tin tức</option>
                      {articleCategories.map((cat) => (
                        <option key={cat.id} value={cat.name}>{cat.name}</option>
                      ))}
                    </select>

                    {/* Create New Article Button */}
                    <button
                      onClick={handleOpenCreateArticle}
                      className="flex items-center gap-1.5 bg-[#004b87] hover:bg-[#003866] text-white font-bold text-xs px-4 py-2 rounded-xl transition-all cursor-pointer shrink-0 shadow-sm"
                    >
                      <Plus size={16} /> Viết bài mới
                    </button>
                  </div>
                </div>

                {/* STATUS FILTER TABS (USE CASE 5) */}
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl text-xs font-bold">
                    <button
                      type="button"
                      onClick={() => setArticleStatusTab('all')}
                      className={`px-3.5 py-1.5 rounded-lg transition-all cursor-pointer ${
                        articleStatusTab === 'all'
                          ? 'bg-[#004b87] text-white shadow-xs'
                          : 'text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      Tất cả bài viết ({articles.length})
                    </button>
                    <button
                      type="button"
                      onClick={() => setArticleStatusTab('published')}
                      className={`px-3.5 py-1.5 rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
                        articleStatusTab === 'published'
                          ? 'bg-emerald-600 text-white shadow-xs'
                          : 'text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      <span className={`w-2 h-2 rounded-full ${articleStatusTab === 'published' ? 'bg-white' : 'bg-emerald-500'}`} />
                      Đã xuất bản ({articles.filter(a => a.is_published !== false).length})
                    </button>
                    <button
                      type="button"
                      onClick={() => setArticleStatusTab('draft')}
                      className={`px-3.5 py-1.5 rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
                        articleStatusTab === 'draft'
                          ? 'bg-amber-600 text-white shadow-xs'
                          : 'text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      <span className={`w-2 h-2 rounded-full ${articleStatusTab === 'draft' ? 'bg-white' : 'bg-amber-500'}`} />
                      Tạm ẩn ({articles.filter(a => a.is_published === false).length})
                    </button>
                  </div>
                </div>

                {/* FLOATING BATCH ACTION BAR (USE CASE 3) */}
                {selectedArticleIds.length > 0 && (
                  <div className="bg-[#004b87] text-white p-4 rounded-2xl shadow-xl flex flex-wrap items-center justify-between gap-3 animate-fade-in text-xs font-bold border border-blue-800">
                    <div className="flex items-center gap-2">
                      <span className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center font-mono text-xs">
                        {selectedArticleIds.length}
                      </span>
                      <span>Đã chọn {selectedArticleIds.length} bài viết</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => handleBatchArticleAction('publish')}
                        className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl shadow-xs cursor-pointer flex items-center gap-1.5 transition-all"
                      >
                        <Eye size={13} /> Chuyển sang Hiển thị
                      </button>
                      <button
                        type="button"
                        onClick={() => handleBatchArticleAction('hide')}
                        className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-xl shadow-xs cursor-pointer flex items-center gap-1.5 transition-all"
                      >
                        <Eye size={13} className="opacity-50" /> Chuyển sang Tạm ẩn
                      </button>
                      <button
                        type="button"
                        onClick={() => handleBatchArticleAction('delete')}
                        className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl shadow-xs cursor-pointer flex items-center gap-1.5 transition-all"
                      >
                        <Trash2 size={13} /> Xóa hàng loạt bài đã chọn
                      </button>
                    </div>
                  </div>
                )}

                {/* Articles Table View */}
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs text-slate-700">
                    <thead className="bg-slate-50/80 text-slate-400 uppercase font-extrabold tracking-wider border-b border-slate-200">
                      <tr>
                        <th className="p-4 w-10 text-center">
                          <input
                            type="checkbox"
                            checked={
                              selectedArticleIds.length > 0 &&
                              selectedArticleIds.length === articles.filter(art => {
                                const matchesSearch = art.title.toLowerCase().includes(articleSearch.toLowerCase()) ||
                                                      art.author.toLowerCase().includes(articleSearch.toLowerCase()) ||
                                                      art.category.toLowerCase().includes(articleSearch.toLowerCase());
                                const matchesCategory = articleCategoryFilter === 'all' || art.category === articleCategoryFilter;
                                const matchesStatus = articleStatusTab === 'all' || 
                                                      (articleStatusTab === 'published' && art.is_published !== false) ||
                                                      (articleStatusTab === 'draft' && art.is_published === false);
                                return matchesSearch && matchesCategory && matchesStatus;
                              }).length
                            }
                            onChange={(e) => {
                              const visibleArticles = articles.filter(art => {
                                const matchesSearch = art.title.toLowerCase().includes(articleSearch.toLowerCase()) ||
                                                      art.author.toLowerCase().includes(articleSearch.toLowerCase()) ||
                                                      art.category.toLowerCase().includes(articleSearch.toLowerCase());
                                const matchesCategory = articleCategoryFilter === 'all' || art.category === articleCategoryFilter;
                                const matchesStatus = articleStatusTab === 'all' || 
                                                      (articleStatusTab === 'published' && art.is_published !== false) ||
                                                      (articleStatusTab === 'draft' && art.is_published === false);
                                return matchesSearch && matchesCategory && matchesStatus;
                              });
                              setSelectedArticleIds(e.target.checked ? visibleArticles.map(a => a.id) : []);
                            }}
                            className="w-4 h-4 rounded text-[#004b87] focus:ring-[#004b87] cursor-pointer"
                          />
                        </th>
                        <th className="p-4 w-12 text-center">STT</th>
                        <th className="p-4">TIÊU ĐỀ BÀI VIẾT</th>
                        <th className="p-4">CHUYÊN MỤC Y KHOA</th>
                        <th className="p-4">TÁC GIẢ BÀI VIẾT</th>
                        <th className="p-4 text-center">TRẠNG THÁI</th>
                        <th className="p-4 text-center">NGÀY ĐĂNG</th>
                        <th className="p-4 text-center">THAO TÁC</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {articles
                        .filter(art => {
                          const matchesSearch = art.title.toLowerCase().includes(articleSearch.toLowerCase()) ||
                                                art.author.toLowerCase().includes(articleSearch.toLowerCase()) ||
                                                art.category.toLowerCase().includes(articleSearch.toLowerCase());
                          const matchesCategory = articleCategoryFilter === 'all' || art.category === articleCategoryFilter;
                          const matchesStatus = articleStatusTab === 'all' || 
                                                (articleStatusTab === 'published' && art.is_published !== false) ||
                                                (articleStatusTab === 'draft' && art.is_published === false);
                          return matchesSearch && matchesCategory && matchesStatus;
                        })
                        .map((art, index) => (
                          <tr key={art.id} className={`hover:bg-slate-50/70 transition-colors ${selectedArticleIds.includes(art.id) ? 'bg-blue-50/40' : ''}`}>
                            <td className="p-4 text-center">
                              <input
                                type="checkbox"
                                checked={selectedArticleIds.includes(art.id)}
                                onChange={() => toggleSelectArticle(art.id)}
                                className="w-4 h-4 rounded text-[#004b87] focus:ring-[#004b87] cursor-pointer"
                              />
                            </td>

                            <td className="p-4 text-center font-bold text-slate-500 font-mono">
                              #{index + 1}
                            </td>

                            <td className="p-4 font-bold text-[#004b87] text-sm max-w-md">
                              <div className="flex items-start gap-3">
                                <div className="w-8 h-8 rounded-xl bg-emerald-50 text-[#00a896] font-bold flex items-center justify-center shrink-0 mt-0.5">
                                  <BookOpen size={16} />
                                </div>
                                <div>
                                  <span className="line-clamp-2 leading-snug">{art.title}</span>
                                  {art.excerpt && (
                                    <p className="text-[11px] font-normal text-slate-500 mt-1 line-clamp-1">{art.excerpt}</p>
                                  )}
                                </div>
                              </div>
                            </td>

                            <td className="p-4">
                              <span className="px-3 py-1 bg-emerald-50 text-emerald-700 font-bold rounded-lg text-xs border border-emerald-100">
                                {art.category}
                              </span>
                            </td>

                            <td className="p-4 font-semibold text-slate-800">
                              <div className="flex items-center gap-2">
                                <User size={14} className="text-[#004b87]" />
                                <span>{art.author}</span>
                              </div>
                            </td>

                            <td className="p-4 text-center">
                              {art.is_published !== false ? (
                                <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-emerald-50 text-emerald-700 font-bold rounded-lg text-[11px] border border-emerald-200">
                                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Hiển thị
                                </span>
                              ) : (
                                <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-amber-50 text-amber-700 font-bold rounded-lg text-[11px] border border-amber-200">
                                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500" /> Tạm ẩn
                                </span>
                              )}
                            </td>

                            <td className="p-4 text-center font-mono font-medium text-slate-500">
                              {art.date}
                            </td>

                            <td className="p-4 text-center flex items-center justify-center gap-2">
                              <button
                                onClick={() => handleOpenEditArticle(art)}
                                className="inline-flex items-center gap-1 px-2.5 py-1 bg-blue-50 text-[#004b87] hover:bg-blue-100 font-bold rounded-lg text-xs transition-all border border-blue-100 cursor-pointer"
                                title="Chỉnh sửa bài viết chi tiết"
                              >
                                <Edit size={12} /> Sửa
                              </button>
                              <a
                                href={`/tin-tuc/${art.slug}`}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center gap-1 px-2.5 py-1 bg-slate-100 text-slate-700 hover:bg-slate-200 font-bold rounded-lg text-xs transition-all cursor-pointer"
                                title="Xem bài viết trên Client website"
                              >
                                <Eye size={12} /> Xem ↗
                              </a>
                              <button
                                onClick={() => handleDeleteArticle(art.id, art.title)}
                                className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all cursor-pointer"
                                title="Xóa bài viết"
                              >
                                <Trash2 size={14} />
                              </button>
                            </td>
                          </tr>
                        ))
                      }
                    </tbody>
                  </table>
                </div>

              </div>

            </div>
          )
        )}

        {/* TAB 4B: QUẢN LÝ DANH MỤC BÀI VIẾT (ARTICLE CATEGORIES) */}
        {activeTab === 'articleCategories' && (
          <div className="space-y-6 w-full animate-fadeIn">
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-400">
              <Link href="/admin/dashboard" className="hover:text-[#004b87]">Tổng quan</Link>
              <ChevronRight size={12} />
              <span className="text-slate-700 font-bold">Danh Mục Bài Viết</span>
            </div>

            <div className="bg-white border border-slate-200/80 rounded-2xl p-8 shadow-sm space-y-6 w-full">
              
              {/* Header Toolbar */}
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-4 border-b border-slate-100">
                <div>
                  <h2 className="text-xl font-extrabold text-[#004b87]">Quản Lý Danh Mục Bài Viết</h2>
                  <p className="text-xs text-slate-500 mt-1">
                    Quản lý danh mục bài viết cẩm nang y khoa để nhóm các bài đăng tin tức ({filteredArticleCategories.length} danh mục)
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
                  <div className="relative flex-1 md:w-64">
                    <Search size={15} className="absolute left-3.5 top-3 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Tìm danh mục bài viết..."
                      value={articleCategorySearch}
                      onChange={(e) => setArticleCategorySearch(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-800 outline-none focus:border-[#004b87] focus:bg-white shadow-xs"
                    />
                  </div>

                  <button
                    onClick={handleOpenCreateArticleCategory}
                    className="flex items-center gap-1.5 bg-[#004b87] hover:bg-[#003866] text-white font-bold text-xs px-4 py-2.5 rounded-xl transition-all cursor-pointer shrink-0 shadow-sm"
                  >
                    <Plus size={16} /> Thêm danh mục mới
                  </button>
                </div>
              </div>

              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-700">
                  <thead className="bg-slate-50/80 text-slate-400 uppercase font-extrabold tracking-wider border-b border-slate-200">
                    <tr>
                      <th className="p-4 w-12 text-center">STT</th>
                      <th className="p-4">TÊN DANH MỤC</th>
                      <th className="p-4">ĐƯỜNG DẪN TĨNH (SLUG)</th>
                      <th className="p-4 text-center">THỨ TỰ HÌNH</th>
                      <th className="p-4 text-center">SỐ BÀI VIẾT CON</th>
                      <th className="p-4 text-center">THAO TÁC</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredArticleCategories.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="text-center py-12 text-slate-400 font-medium">
                          Không tìm thấy danh mục bài viết nào.
                        </td>
                      </tr>
                    ) : (
                      filteredArticleCategories.map((cat, index) => (
                        <tr key={cat.id} className="hover:bg-slate-50/70 transition-colors">
                          <td className="p-4 text-center font-bold text-slate-500 font-mono">
                            #{index + 1}
                          </td>

                          <td className="p-4 font-bold text-[#004b87] text-sm">
                            <span className="hover:underline cursor-pointer" onClick={() => handleOpenEditArticleCategory(cat)}>
                              {cat.name}
                            </span>
                          </td>

                          <td className="p-4 font-mono text-slate-500">
                            {cat.slug}
                          </td>

                          <td className="p-4 text-center font-bold font-mono">
                            {cat.order || 0}
                          </td>

                          <td className="p-4 text-center">
                            <span className="px-2.5 py-1 bg-teal-50 text-[#00a896] font-bold border border-teal-150 rounded-lg">
                              {(articles.filter(a => a.article_category_id === cat.id) || []).length} bài viết
                            </span>
                          </td>

                          <td className="p-4 text-center">
                            <div className="flex items-center justify-center gap-1.5">
                              <button
                                onClick={() => handleOpenEditArticleCategory(cat)}
                                className="p-2 text-slate-400 hover:text-[#004b87] hover:bg-blue-50 rounded-xl transition-all cursor-pointer"
                                title="Sửa danh mục"
                              >
                                <Edit size={16} />
                              </button>
                              <button
                                onClick={() => handleDeleteArticleCategory(cat)}
                                className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all cursor-pointer"
                                title="Xóa danh mục"
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>

            </div>

            {/* Modal Edit / Add Article Category */}
            {showArticleCategoryModal && (
              <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center z-50 p-4 animate-fadeIn">
                <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-lg w-full overflow-hidden animate-scaleIn">
                  <div className="px-6 py-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
                    <h3 className="text-sm font-black text-[#004b87] uppercase tracking-wider">
                      {editingArticleCategory ? 'Chỉnh Sửa Danh Mục Bài Viết' : 'Thêm Danh Mục Bài Viết Mới'}
                    </h3>
                    <button
                      onClick={() => setShowArticleCategoryModal(false)}
                      className="p-1.5 hover:bg-slate-200 text-slate-400 hover:text-slate-600 rounded-lg transition-colors cursor-pointer"
                    >
                      <X size={18} />
                    </button>
                  </div>

                  <form onSubmit={handleSaveArticleCategory} className="p-6 space-y-4 text-xs font-semibold text-slate-700">
                    <div>
                      <label className="block text-slate-500 uppercase tracking-wider mb-1.5 font-bold">Tên danh mục *</label>
                      <input
                        type="text"
                        required
                        placeholder="Ví dụ: Kiến thức Y khoa, Sức khỏe tim mạch..."
                        value={articleCategoryForm.data.name}
                        onChange={(e) => articleCategoryForm.setData('name', e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-800 outline-none focus:border-[#004b87] focus:bg-white"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-500 uppercase tracking-wider mb-1.5 font-bold">Thứ tự hiển thị</label>
                      <input
                        type="number"
                        min={0}
                        value={articleCategoryForm.data.order}
                        onChange={(e) => articleCategoryForm.setData('order', parseInt(e.target.value) || 0)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-800 font-mono outline-none focus:border-[#004b87] focus:bg-white"
                      />
                    </div>

                    <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => setShowArticleCategoryModal(false)}
                        className="px-4 py-2.5 bg-slate-150 hover:bg-slate-200 rounded-xl font-bold cursor-pointer transition-colors text-slate-600"
                      >
                        Hủy bỏ
                      </button>
                      <button
                        type="submit"
                        disabled={articleCategoryForm.processing}
                        className="px-5 py-2.5 bg-[#004b87] hover:bg-[#003866] text-white font-extrabold rounded-xl shadow-xs cursor-pointer transition-colors"
                      >
                        {articleCategoryForm.processing ? 'Đang lưu...' : 'Lưu lại'}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB QUẢN LÝ BANNERS (LIST VIEW MỞ RỘNG) */}
        {activeTab === 'banners' && (
          <div className="space-y-6 w-full">
            {/* Header & Action Bar Card */}
            <div className="bg-white border border-slate-200/80 rounded-2xl p-8 shadow-sm space-y-6 w-full">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-4 border-b border-slate-100">
                <div>
                  <h2 className="text-xl font-extrabold text-[#004b87] flex items-center gap-2">
                    <SlidersHorizontal size={24} className="text-[#00a896]" />
                    Quản Lý Slide Banner Website
                  </h2>
                  <p className="text-xs text-slate-500 mt-1">
                    Cấu hình, hiển thị và phân loại danh sách slide banner trang chủ phòng khám ({banners.length} banner)
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
                  {/* Search Input */}
                  <div className="relative flex-1 md:w-64">
                    <Search size={15} className="absolute left-3.5 top-3 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Tìm tiêu đề, nhãn phụ, nội dung..."
                      value={bannerSearchQuery}
                      onChange={(e) => setBannerSearchQuery(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-800 outline-none focus:border-[#004b87] focus:bg-white shadow-xs"
                    />
                  </div>

                  {/* Create New Banner Button */}
                  <button
                    onClick={handleOpenCreateBanner}
                    className="flex items-center gap-1.5 bg-[#004b87] hover:bg-[#003866] text-white font-bold text-xs px-4 py-2 rounded-xl transition-all cursor-pointer shrink-0 shadow-sm"
                  >
                    <Plus size={16} /> Thêm Banner Mới
                  </button>
                </div>
              </div>

              {/* STATUS FILTER TABS */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-3">
                <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl text-xs font-bold">
                  <button
                    type="button"
                    onClick={() => setBannerStatusTab('all')}
                    className={`px-3.5 py-1.5 rounded-lg transition-all cursor-pointer ${
                      bannerStatusTab === 'all'
                        ? 'bg-[#004b87] text-white shadow-xs'
                        : 'text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    Tất cả banner ({banners.length})
                  </button>
                  <button
                    type="button"
                    onClick={() => setBannerStatusTab('active')}
                    className={`px-3.5 py-1.5 rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
                      bannerStatusTab === 'active'
                        ? 'bg-emerald-600 text-white shadow-xs'
                        : 'text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    <span className={`w-2 h-2 rounded-full ${bannerStatusTab === 'active' ? 'bg-white' : 'bg-emerald-500'}`} />
                    Kích Hoạt ({banners.filter(b => b.is_active !== false).length})
                  </button>
                  <button
                    type="button"
                    onClick={() => setBannerStatusTab('inactive')}
                    className={`px-3.5 py-1.5 rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
                      bannerStatusTab === 'inactive'
                        ? 'bg-rose-600 text-white shadow-xs'
                        : 'text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    <span className={`w-2 h-2 rounded-full ${bannerStatusTab === 'inactive' ? 'bg-white' : 'bg-rose-500'}`} />
                    Tạm Ẩn ({banners.filter(b => b.is_active === false).length})
                  </button>
                </div>
              </div>

              {/* FLOATING BATCH ACTION BAR */}
              {selectedBannerIds.length > 0 && (
                <div className="bg-[#004b87] text-white p-4 rounded-2xl shadow-xl flex flex-wrap items-center justify-between gap-3 animate-fade-in text-xs font-bold border border-blue-800">
                  <div className="flex items-center gap-2">
                    <span className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center font-mono text-xs">
                      {selectedBannerIds.length}
                    </span>
                    <span>Đã chọn {selectedBannerIds.length} slide banner</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleBatchBannerAction('activate')}
                      className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl shadow-xs cursor-pointer flex items-center gap-1.5 transition-all"
                    >
                      <CheckCircle2 size={13} /> Kích Hoạt Hàng Loạt
                    </button>
                    <button
                      type="button"
                      onClick={() => handleBatchBannerAction('deactivate')}
                      className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-xl shadow-xs cursor-pointer flex items-center gap-1.5 transition-all"
                    >
                      <AlertCircle size={13} /> Tạm Ẩn Hàng Loạt
                    </button>
                    <button
                      type="button"
                      onClick={() => handleBatchBannerAction('delete')}
                      className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl shadow-xs cursor-pointer flex items-center gap-1.5 transition-all"
                    >
                      <Trash2 size={13} /> Xóa Hàng Loạt
                    </button>
                  </div>
                </div>
              )}

              {/* Banners Table View */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-700 border-collapse">
                  <thead className="bg-slate-50/80 text-slate-400 uppercase font-extrabold tracking-wider border-b border-slate-200">
                    <tr>
                      <th className="p-4 w-10 text-center">
                        <input
                          type="checkbox"
                          checked={
                            selectedBannerIds.length > 0 &&
                            selectedBannerIds.length === banners.filter(b => {
                              const matchesSearch = b.title.toLowerCase().includes(bannerSearchQuery.toLowerCase()) ||
                                                    (b.eyebrow && b.eyebrow.toLowerCase().includes(bannerSearchQuery.toLowerCase())) ||
                                                    (b.subtitle && b.subtitle.toLowerCase().includes(bannerSearchQuery.toLowerCase()));
                              const matchesStatus = bannerStatusTab === 'all' ||
                                                    (bannerStatusTab === 'active' && b.is_active !== false) ||
                                                    (bannerStatusTab === 'inactive' && b.is_active === false);
                              return matchesSearch && matchesStatus;
                            }).length
                          }
                          onChange={(e) => {
                            const visibleBanners = banners.filter(b => {
                              const matchesSearch = b.title.toLowerCase().includes(bannerSearchQuery.toLowerCase()) ||
                                                    (b.eyebrow && b.eyebrow.toLowerCase().includes(bannerSearchQuery.toLowerCase())) ||
                                                    (b.subtitle && b.subtitle.toLowerCase().includes(bannerSearchQuery.toLowerCase()));
                              const matchesStatus = bannerStatusTab === 'all' ||
                                                    (bannerStatusTab === 'active' && b.is_active !== false) ||
                                                    (bannerStatusTab === 'inactive' && b.is_active === false);
                              return matchesSearch && matchesStatus;
                            });
                            setSelectedBannerIds(e.target.checked ? visibleBanners.map(b => b.id) : []);
                          }}
                          className="w-4 h-4 rounded text-[#004b87] focus:ring-[#004b87] cursor-pointer"
                        />
                      </th>
                      <th className="p-4 w-12 text-center">STT</th>
                      <th className="p-4 w-44">ẢNH DESKTOP / MOBILE</th>
                      <th className="p-4">TIÊU ĐỀ & MÔ TẢ SLIDE BANNER</th>
                      <th className="p-4 w-52">NÚT LIÊN KẾT (CTA)</th>
                      <th className="p-4 w-20 text-center">THỨ TỰ</th>
                      <th className="p-4 text-center w-32">TRẠNG THÁI</th>
                      <th className="p-4 text-center w-40">THAO TÁC</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {banners
                      .filter(b => {
                        const matchesSearch = b.title.toLowerCase().includes(bannerSearchQuery.toLowerCase()) ||
                                              (b.eyebrow && b.eyebrow.toLowerCase().includes(bannerSearchQuery.toLowerCase())) ||
                                              (b.subtitle && b.subtitle.toLowerCase().includes(bannerSearchQuery.toLowerCase()));
                        const matchesStatus = bannerStatusTab === 'all' ||
                                              (bannerStatusTab === 'active' && b.is_active !== false) ||
                                              (bannerStatusTab === 'inactive' && b.is_active === false);
                        return matchesSearch && matchesStatus;
                      })
                      .map((b, index) => (
                        <tr key={b.id} className={`hover:bg-slate-50/70 transition-colors ${selectedBannerIds.includes(b.id) ? 'bg-blue-50/40' : ''}`}>
                          <td className="p-4 text-center">
                            <input
                              type="checkbox"
                              checked={selectedBannerIds.includes(b.id)}
                              onChange={() => {
                                setSelectedBannerIds(prev =>
                                  prev.includes(b.id) ? prev.filter(i => i !== b.id) : [...prev, b.id]
                                );
                              }}
                              className="w-4 h-4 rounded text-[#004b87] focus:ring-[#004b87] cursor-pointer"
                            />
                          </td>

                          <td className="p-4 text-center font-bold text-slate-500 font-mono">
                            #{index + 1}
                          </td>

                          <td className="p-4">
                            <div className="space-y-1.5">
                              <div className="relative w-36 h-20 rounded-xl overflow-hidden border border-slate-200 bg-slate-900 shadow-2xs group">
                                <img
                                  src={b.desktop_image || b.image_url}
                                  alt={b.title}
                                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                                />
                                <span className="absolute bottom-1 left-1 px-1.5 py-0.5 bg-black/60 text-white text-[9px] font-extrabold rounded">
                                  DESKTOP
                                </span>
                              </div>
                              {b.mobile_image && (
                                <span className="inline-block text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                                  📱 Có ảnh Mobile
                                </span>
                              )}
                            </div>
                          </td>

                          <td className="p-4 space-y-1">
                            {b.eyebrow && (
                              <span className="inline-block px-2 py-0.5 bg-blue-50 text-[#004b87] text-[10px] font-extrabold rounded-md uppercase tracking-wider border border-blue-200">
                                {b.eyebrow}
                              </span>
                            )}
                            <h3 className="font-extrabold text-[#004b87] text-sm leading-snug">{b.title}</h3>
                            {b.subtitle && <p className="text-xs font-semibold text-slate-600">{b.subtitle}</p>}
                            {b.subheading && <p className="text-[11px] text-slate-400 line-clamp-1 italic">{b.subheading}</p>}
                          </td>

                          <td className="p-4 space-y-1.5 text-[11px]">
                            {b.primary_button_text && (
                              <div className="bg-slate-50 p-2 rounded-lg border border-slate-200">
                                <span className="font-bold text-slate-800 block">Nút chính: {b.primary_button_text}</span>
                                <span className="text-slate-400 text-[10px] block truncate font-mono">{b.primary_button_link || b.link || '#'}</span>
                              </div>
                            )}
                            {b.secondary_button_text && (
                              <div className="bg-slate-50 p-2 rounded-lg border border-slate-200">
                                <span className="font-bold text-slate-700 block">Nút phụ: {b.secondary_button_text}</span>
                                <span className="text-slate-400 text-[10px] block truncate font-mono">{b.secondary_button_link || '#'}</span>
                              </div>
                            )}
                          </td>

                          <td className="p-4 text-center">
                            <span className="inline-block px-2.5 py-1 bg-slate-100 text-slate-700 font-extrabold font-mono rounded-lg border border-slate-200">
                              {b.order || 0}
                            </span>
                          </td>

                           <td className="p-4 text-center">
                            {b.is_active !== false ? (
                              <span className="inline-flex items-center gap-1 px-3 py-1 bg-emerald-50 text-emerald-700 font-extrabold rounded-full text-xs border border-emerald-200">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Kích hoạt
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 px-3 py-1 bg-rose-50 text-rose-700 font-extrabold rounded-full text-xs border border-rose-200">
                                <span className="w-1.5 h-1.5 rounded-full bg-rose-500" /> Tạm ẩn
                              </span>
                            )}
                          </td>

                          <td className="p-4 text-center">
                            <div className="flex items-center justify-center gap-1.5">
                              {/* TOGGLE STATUS BUTTON */}
                              <button
                                type="button"
                                onClick={() => handleToggleBannerStatus(b)}
                                className={`px-2 py-1 font-extrabold rounded-lg text-[11px] border transition-all cursor-pointer shadow-2xs ${
                                  b.is_active !== false
                                    ? 'bg-rose-50 text-rose-700 border-rose-200 hover:bg-rose-100'
                                    : 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100'
                                }`}
                              >
                                {b.is_active !== false ? 'Ẩn' : 'Hiện'}
                              </button>

                              {/* EDIT BUTTON */}
                              <button
                                type="button"
                                onClick={() => handleOpenEditBanner(b)}
                                className="p-1.5 text-slate-400 hover:text-[#004b87] hover:bg-blue-50 rounded-lg transition-all cursor-pointer"
                                title="Chỉnh sửa slide banner"
                              >
                                <Edit size={14} />
                              </button>

                              {/* DELETE BUTTON */}
                              <button
                                type="button"
                                onClick={() => handleDeleteBanner(b.id, b.title)}
                                className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all cursor-pointer"
                                title="Xóa banner"
                              >
                                <Trash2 size={14} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    }
                  </tbody>
                </table>
              </div>

            </div>
          </div>
        )}

        {/* TAB ĐỘI NGŨ BÁC SĨ & TRANG CHỈNH SỬA BÁC SĨ 2 CỘT */}
        {activeTab === 'doctors' && (
          isEditingDoctorPage ? (
            /* FULL-PAGE 2-COLUMN DOCTOR EDITOR */
            <form onSubmit={handleSaveDoctor} className="space-y-6 w-full pb-16">
              
              {/* Top Breadcrumbs */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-400">
                  <button
                    type="button"
                    onClick={() => setIsEditingDoctorPage(false)}
                    className="hover:text-[#004b87] flex items-center gap-1 cursor-pointer"
                  >
                    <UserCheck size={14} /> Đội Ngũ Bác Sĩ
                  </button>
                  <ChevronRight size={12} />
                  <span className="text-slate-700 font-bold">{editingDoctor ? 'Chỉnh Sửa Hồ Sơ Bác Sĩ' : 'Tạo Hồ Sơ Bác Sĩ Mới'}</span>
                </div>

                <button
                  type="button"
                  onClick={() => setIsEditingDoctorPage(false)}
                  className="text-xs text-slate-500 hover:text-slate-800 font-bold flex items-center gap-1 cursor-pointer bg-white px-3 py-1.5 rounded-xl border border-slate-200 shadow-xs"
                >
                  <ArrowLeft size={14} /> Quay lại danh sách bác sĩ
                </button>
              </div>

              {/* 2-Column Grid Layout */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                {/* LEFT COLUMN (lg:col-span-8 - 70%) */}
                <div className="lg:col-span-8 space-y-6">
                  
                  {/* 1. HỌ TÊN BÁC SĨ & DỌC CHUYÊN KHOA */}
                  <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
                    <div>
                      <label className="block text-xs font-black text-slate-700 uppercase tracking-wider mb-1.5">
                        HỌ VÀ TÊN BÁC SĨ *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="VD: BSCKII Đoàn Khôi"
                        value={doctorForm.data.name}
                        onChange={(e) => doctorForm.setData('name', e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-sm font-bold text-slate-800 outline-none focus:border-[#004b87] focus:bg-white transition-all shadow-2xs"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-black text-slate-700 uppercase tracking-wider mb-1.5">
                          CHUYÊN KHOA & DANH XƯNG *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="VD: Trưởng Khoa Nội Tim Mạch"
                          value={doctorForm.data.specialty}
                          onChange={(e) => doctorForm.setData('specialty', e.target.value)}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs font-bold text-slate-800 outline-none focus:border-[#004b87] focus:bg-white"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-black text-slate-700 uppercase tracking-wider mb-1.5">
                          KINH NGHIỆM THÂM NIÊN *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="VD: 20+ năm kinh nghiệm"
                          value={doctorForm.data.experience}
                          onChange={(e) => doctorForm.setData('experience', e.target.value)}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs font-bold text-slate-800 outline-none focus:border-[#004b87] focus:bg-white"
                        />
                      </div>
                    </div>
                  </div>

                  {/* 2. MÔ TẢ TÓM TẮT TIỂU SỬ */}
                  <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-2">
                    <label className="block text-xs font-black text-slate-700 uppercase tracking-wider">
                      MÔ TẢ TÓM TẮT BÁC SĨ (SHORT BIO) *
                    </label>
                    <textarea
                      rows={3}
                      required
                      placeholder="Gần 20 năm kinh nghiệm thăm khám và điều trị chuyên sâu các bệnh lý tim mạch, tăng huyết áp..."
                      value={doctorForm.data.bio}
                      onChange={(e) => doctorForm.setData('bio', e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-xs text-slate-800 outline-none focus:border-[#004b87] focus:bg-white leading-relaxed resize-none"
                    />
                  </div>

                  {/* 3. QUÁ TRÌNH ĐÀO TẠO & HỒ SƠ CHUYÊN MÔN CHI TIẾT (WYSIWYG RICH TEXT EDITOR) */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider">
                        HỒ SƠ CHUYÊN MÔN & QUÁ TRÌNH ĐÀO TẠO CHI TIẾT *
                      </label>

                      <div className="flex items-center gap-2 text-[11px] font-mono font-medium text-slate-500">
                        <span>{getArticleWordCount(doctorForm.data.detailed_bio)} từ</span>
                      </div>
                    </div>

                    <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-2xs">
                      {/* Attached Toolbar */}
                      {(doctorEditorMode as string) === 'wysiwyg' && (
                        <div className="px-4 py-2.5 bg-slate-50/80 border-b border-slate-200/80 flex flex-wrap items-center justify-between gap-2 text-xs font-semibold text-slate-600">
                          <div className="flex flex-wrap items-center gap-1">
                            <button type="button" onClick={() => execDoctorEditorCmd('bold')} className={`p-1.5 rounded-md cursor-pointer ${activeFormats.bold ? 'bg-[#004b87] text-white font-black' : 'hover:bg-slate-200/80 text-slate-700 font-extrabold'}`} title="In đậm">B</button>
                            <button type="button" onClick={() => execDoctorEditorCmd('italic')} className={`p-1.5 rounded-md cursor-pointer ${activeFormats.italic ? 'bg-[#004b87] text-white italic' : 'hover:bg-slate-200/80 text-slate-700 italic'}`} title="In nghiêng">I</button>
                            <button type="button" onClick={() => execDoctorEditorCmd('underline')} className={`p-1.5 rounded-md cursor-pointer ${activeFormats.underline ? 'bg-[#004b87] text-white underline' : 'hover:bg-slate-200/80 text-slate-700 underline'}`} title="Gạch chân">U</button>
                            <button type="button" onClick={() => execDoctorEditorCmd('strikeThrough')} className={`p-1.5 rounded-md cursor-pointer ${activeFormats.strikeThrough ? 'bg-[#004b87] text-white line-through' : 'hover:bg-slate-200/80 text-slate-700 line-through'}`} title="Gạch ngang">S</button>
                            <span className="w-px h-4 bg-slate-300 mx-1"></span>
                            <button type="button" onClick={() => { saveEditorSelection(); const url = prompt('Nhập URL:', 'https://'); if (url) { if (doctorEditorRef.current) doctorEditorRef.current.focus(); execDoctorEditorCmd('createLink', url); } }} className="p-1.5 hover:bg-slate-200/80 text-slate-700 rounded-md cursor-pointer" title="Chèn link"><Link2 size={15} /></button>
                            <button type="button" onClick={() => execDoctorEditorCmd('unlink')} className="p-1.5 hover:bg-slate-200/80 text-slate-700 rounded-md cursor-pointer" title="Xóa link"><Unlink size={15} /></button>
                            <button type="button" onClick={() => handleOpenMediaPicker('doctor_editor')} className="p-1.5 hover:bg-slate-200/80 text-slate-700 rounded-md cursor-pointer" title="Chèn hình ảnh"><ImageIcon size={15} /></button>
                            <span className="w-px h-4 bg-slate-300 mx-1"></span>
                            <button type="button" onClick={() => execDoctorEditorCmd('formatBlock', '<h4>')} className="px-2 py-1 rounded-md font-bold hover:bg-slate-200/80 text-slate-700 text-xs" title="Tiêu đề H2">H2</button>
                            <button type="button" onClick={() => execDoctorEditorCmd('formatBlock', '<h5>')} className="px-2 py-1 rounded-md font-bold hover:bg-slate-200/80 text-slate-700 text-xs" title="Tiêu đề H3">H3</button>
                            <button type="button" onClick={() => execDoctorEditorCmd('formatBlock', '<p>')} className="px-2 py-1 rounded-md font-bold hover:bg-slate-200/80 text-slate-700 text-xs" title="Đoạn văn">P</button>
                            <span className="w-px h-4 bg-slate-300 mx-1"></span>
                            <button type="button" onClick={() => execDoctorEditorCmd('insertUnorderedList')} className="p-1.5 hover:bg-slate-200/80 text-slate-700 rounded-md cursor-pointer" title="Danh sách chấm"><List size={15} /></button>
                            <button type="button" onClick={() => execDoctorEditorCmd('insertOrderedList')} className="p-1.5 hover:bg-slate-200/80 text-slate-700 rounded-md cursor-pointer" title="Danh sách số"><ListOrdered size={15} /></button>
                            <span className="w-px h-4 bg-slate-300 mx-1"></span>
                            <button type="button" onClick={() => execDoctorEditorCmd('justifyLeft')} className="p-1.5 hover:bg-slate-200/80 text-slate-700 rounded-md cursor-pointer" title="Căn trái"><AlignLeft size={15} /></button>
                            <button type="button" onClick={() => execDoctorEditorCmd('justifyCenter')} className="p-1.5 hover:bg-slate-200/80 text-slate-700 rounded-md cursor-pointer" title="Căn giữa"><AlignCenter size={15} /></button>
                            <button type="button" onClick={() => execDoctorEditorCmd('justifyRight')} className="p-1.5 hover:bg-slate-200/80 text-slate-700 rounded-md cursor-pointer" title="Căn phải"><AlignRight size={15} /></button>
                            <span className="w-px h-4 bg-slate-300 mx-1"></span>
                            <button type="button" onClick={() => execDoctorEditorCmd('undo')} className="p-1.5 hover:bg-slate-200/70 text-slate-700 rounded-md cursor-pointer" title="Undo"><Undo size={15} /></button>
                            <button type="button" onClick={() => execDoctorEditorCmd('redo')} className="p-1.5 hover:bg-slate-200/70 text-slate-700 rounded-md cursor-pointer" title="Redo"><Redo size={15} /></button>
                          </div>

                          <div className="flex items-center gap-1 text-[11px]">
                            <button type="button" onClick={() => setServiceDoctorEditorMode('wysiwyg')} className={`px-2 py-0.5 rounded font-bold cursor-pointer ${(doctorEditorMode as string) === 'wysiwyg' ? 'bg-[#004b87] text-white' : 'text-slate-500'}`}>Trực quan</button>
                            <button type="button" onClick={() => setServiceDoctorEditorMode('html')} className={`px-2 py-0.5 rounded font-bold cursor-pointer ${(doctorEditorMode as string) === 'html' ? 'bg-[#004b87] text-white' : 'text-slate-500'}`}>HTML</button>
                          </div>
                        </div>
                      )}

                      {/* Editor Canvas */}
                      {(doctorEditorMode as string) === 'wysiwyg' ? (
                        <div
                          ref={doctorEditorRef}
                          contentEditable={true}
                          onInput={syncDoctorEditorContentToForm}
                          onBlur={syncDoctorEditorContentToForm}
                          onKeyUp={saveEditorSelection}
                          onMouseUp={saveEditorSelection}
                          className="w-full min-h-[280px] max-h-[480px] overflow-y-auto p-6 text-sm text-slate-700 leading-relaxed outline-none space-y-3 shadow-inner"
                        />
                      ) : (
                        <textarea
                          rows={14}
                          placeholder="Nội dung HTML hồ sơ bác sĩ..."
                          value={doctorForm.data.detailed_bio}
                          onChange={(e) => {
                            doctorForm.setData('detailed_bio', e.target.value);
                            if (doctorEditorRef.current) doctorEditorRef.current.innerHTML = e.target.value;
                          }}
                          className="w-full min-h-[280px] bg-slate-900 p-6 text-xs font-mono text-emerald-400 outline-none leading-relaxed resize-y border-none"
                        />
                      )}
                    </div>
                  </div>

                  {/* 4. SEO META SECTION */}
                  <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
                    <div>
                      <label className="block text-xs font-black text-slate-700 uppercase tracking-wider mb-1.5">
                        META TITLE (CẤU HÌNH SEO)
                      </label>
                      <input
                        type="text"
                        placeholder="VD: BSCKII Đoàn Khôi - Trưởng Khoa Nội Tim Mạch MediPlus"
                        value={doctorForm.data.meta_title}
                        onChange={(e) => doctorForm.setData('meta_title', e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-800 outline-none focus:border-[#004b87] focus:bg-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-black text-slate-700 uppercase tracking-wider mb-1.5">
                        META DESCRIPTION
                      </label>
                      <textarea
                        rows={3}
                        placeholder="Thông tin tiểu sử, bằng cấp và quá trình công tác của BSCKII Đoàn Khôi..."
                        value={doctorForm.data.meta_description}
                        onChange={(e) => doctorForm.setData('meta_description', e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-800 outline-none focus:border-[#004b87] focus:bg-white resize-none"
                      />
                    </div>
                  </div>

                </div>

                {/* RIGHT COLUMN (lg:col-span-4 - 30%) */}
                <div className="lg:col-span-4 space-y-6">
                  
                  {/* 1. HÀNH ĐỘNG & TRẠNG THÁI */}
                  <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
                    <h3 className="text-xs font-black text-slate-700 uppercase tracking-wider border-b border-slate-100 pb-3">
                      HÀNH ĐỘNG & TRẠNG THÁI
                    </h3>

                    <button
                      type="submit"
                      disabled={doctorForm.processing}
                      className="w-full py-3.5 bg-[#004b87] hover:bg-[#003866] text-white font-extrabold text-xs uppercase tracking-wider rounded-xl shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
                    >
                      <Save size={16} /> {editingDoctor ? 'LƯU & CẬP NHẬT BÁC SĨ' : 'THÊM HỒ SƠ BÁC SĨ'}
                    </button>

                    <div className="flex items-center justify-between py-2 border-t border-b border-slate-100">
                      <div>
                        <span className="text-xs font-bold text-slate-800 block">Bác sĩ nổi bật</span>
                        <span className="text-[11px] text-slate-400 block">Hiển thị ưu tiên tại trang chủ</span>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={doctorForm.data.is_featured}
                          onChange={(e) => doctorForm.setData('is_featured', e.target.checked)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-500"></div>
                      </label>
                    </div>

                    <button
                      type="button"
                      onClick={() => setShowDoctorPreviewModal({
                        id: editingDoctor ? editingDoctor.id : 0,
                        name: doctorForm.data.name || 'BSCKII Đoàn Khôi',
                        specialty: doctorForm.data.specialty,
                        experience: doctorForm.data.experience,
                        avatar: doctorForm.data.avatar,
                        bio: doctorForm.data.bio,
                        detailed_bio: doctorForm.data.detailed_bio,
                        is_featured: doctorForm.data.is_featured,
                      })}
                      className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-extrabold rounded-xl text-xs flex items-center justify-center gap-2 cursor-pointer transition-all"
                    >
                      <Eye size={16} /> Xem trước hồ sơ bác sĩ
                    </button>
                  </div>

                  {/* 2. CHỌN ẢNH ĐẠI DIỆN BÁC SĨ */}
                  <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-4 text-xs">
                    <label className="block font-black text-slate-700 uppercase tracking-wider border-b border-slate-100 pb-2">
                      ẢNH ĐẠI DIỆN BÁC SĨ
                    </label>

                    {doctorForm.data.avatar ? (
                      <div className="relative rounded-3xl overflow-hidden border border-slate-200 group bg-slate-900 h-52 flex items-center justify-center shadow-xs">
                        <img
                          src={doctorForm.data.avatar}
                          alt={doctorForm.data.name}
                          className="w-full h-full object-cover opacity-90 group-hover:opacity-75 transition-opacity"
                        />
                        {/* Center 'Thay đổi ảnh' Black Button */}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <button
                            type="button"
                            onClick={() => handleOpenMediaPicker('doctor_avatar')}
                            className="px-5 py-2.5 bg-black/85 hover:bg-black text-white font-extrabold rounded-2xl text-xs shadow-lg cursor-pointer transition-all flex items-center gap-1.5 backdrop-blur-xs hover:scale-105"
                          >
                            Thay đổi ảnh
                          </button>
                        </div>
                        {/* Top-Right Circular Red Trash Button for Doctor Avatar */}
                        <button
                          type="button"
                          onClick={() => doctorForm.setData('avatar', '')}
                          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-rose-600 hover:bg-rose-700 text-white flex items-center justify-center shadow-md cursor-pointer transition-transform hover:scale-110 z-10"
                          title="Xóa hình ảnh bác sĩ"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    ) : (
                      <div
                        onClick={() => handleOpenMediaPicker('doctor_avatar')}
                        className="rounded-3xl border-2 border-dashed border-slate-300 hover:border-[#004b87] bg-slate-50 hover:bg-blue-50/50 h-48 flex flex-col items-center justify-center text-center p-4 cursor-pointer transition-all group"
                      >
                        <div className="w-12 h-12 rounded-2xl bg-white text-[#004b87] shadow-xs flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                          <FolderOpen size={24} />
                        </div>
                        <p className="font-extrabold text-[#004b87] text-xs">Bấm Để Chọn Ảnh Đại Diện</p>
                        <p className="text-[11px] text-slate-400 mt-0.5">Tải tệp từ máy tính (Kéo & thả) hoặc từ Quản lý tệp</p>
                      </div>
                    )}
                  </div>

                </div>

              </div>

            </form>
          ) : (
            /* DOCTORS TABLE LIST VIEW */
            <div className="space-y-6 w-full">
              <div className="bg-white border border-slate-200/80 rounded-2xl p-8 shadow-sm space-y-6 w-full">
                
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-4 border-b border-slate-100">
                  <div>
                    <h2 className="text-xl font-extrabold text-[#004b87]">Đội Ngũ Bác Sĩ Chuyên Khoa</h2>
                    <p className="text-xs text-slate-500 mt-1">
                      Quản lý thông tin bằng cấp, danh xưng chuyên khoa và hồ sơ bác sĩ ({doctors.length} bác sĩ)
                    </p>
                  </div>

                  <button
                    onClick={handleOpenCreateDoctor}
                    className="flex items-center gap-1.5 bg-[#004b87] hover:bg-[#003866] text-white font-bold text-xs px-4 py-2 rounded-xl transition-all cursor-pointer shrink-0 shadow-sm"
                  >
                    <Plus size={16} /> Thêm Bác Sĩ Mới
                  </button>
                </div>

                {/* STATUS FILTER TABS */}
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl text-xs font-bold">
                    <button
                      type="button"
                      onClick={() => setDoctorStatusTab('all')}
                      className={`px-3.5 py-1.5 rounded-lg transition-all cursor-pointer ${doctorStatusTab === 'all' ? 'bg-[#004b87] text-white shadow-xs' : 'text-slate-600 hover:bg-slate-200'}`}
                    >
                      Tất cả bác sĩ ({doctors.length})
                    </button>
                    <button
                      type="button"
                      onClick={() => setDoctorStatusTab('featured')}
                      className={`px-3.5 py-1.5 rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${doctorStatusTab === 'featured' ? 'bg-amber-600 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-200'}`}
                    >
                      <Star size={13} className={doctorStatusTab === 'featured' ? 'fill-white' : 'fill-amber-500 text-amber-500'} />
                      Bác sĩ Nổi bật ({doctors.filter(d => d.is_featured !== false).length})
                    </button>
                    <button
                      type="button"
                      onClick={() => setDoctorStatusTab('standard')}
                      className={`px-3.5 py-1.5 rounded-lg transition-all cursor-pointer ${doctorStatusTab === 'standard' ? 'bg-slate-700 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-200'}`}
                    >
                      Bác sĩ Thường ({doctors.filter(d => d.is_featured === false).length})
                    </button>
                  </div>
                </div>

                {/* BATCH ACTION BAR */}
                {selectedDoctorIds.length > 0 && (
                  <div className="bg-[#004b87] text-white p-4 rounded-2xl shadow-xl flex flex-wrap items-center justify-between gap-3 animate-fade-in text-xs font-bold">
                    <div className="flex items-center gap-2">
                      <span className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center font-mono text-xs">
                        {selectedDoctorIds.length}
                      </span>
                      <span>Đã chọn {selectedDoctorIds.length} bác sĩ</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button type="button" onClick={() => handleBatchDoctorAction('feature')} className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-xl shadow-xs cursor-pointer flex items-center gap-1"><Star size={13} className="fill-white" /> Bật Nổi bật</button>
                      <button type="button" onClick={() => handleBatchDoctorAction('unfeature')} className="px-4 py-2 bg-slate-600 hover:bg-slate-700 text-white rounded-xl shadow-xs cursor-pointer flex items-center gap-1"><Star size={13} className="text-slate-300" /> Tắt Nổi bật</button>
                      <button type="button" onClick={() => handleBatchDoctorAction('delete')} className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl shadow-xs cursor-pointer flex items-center gap-1"><Trash2 size={13} /> Xóa hàng loạt</button>
                    </div>
                  </div>
                )}

                {/* DOCTORS TABLE LIST VIEW */}
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs text-slate-700 border-collapse">
                    <thead className="bg-slate-50/80 text-slate-400 uppercase font-extrabold tracking-wider border-b border-slate-200">
                      <tr>
                        <th className="p-4 w-10 text-center">
                          <input
                            type="checkbox"
                            checked={
                              selectedDoctorIds.length > 0 &&
                              selectedDoctorIds.length === doctors.filter(d => {
                                if (doctorStatusTab === 'featured') return d.is_featured !== false;
                                if (doctorStatusTab === 'standard') return d.is_featured === false;
                                return true;
                              }).length
                            }
                            onChange={(e) => {
                              const visibleDoctors = doctors.filter(d => {
                                if (doctorStatusTab === 'featured') return d.is_featured !== false;
                                if (doctorStatusTab === 'standard') return d.is_featured === false;
                                return true;
                              });
                              setSelectedDoctorIds(e.target.checked ? visibleDoctors.map(d => d.id) : []);
                            }}
                            className="w-4 h-4 rounded text-[#004b87] focus:ring-[#004b87] cursor-pointer"
                          />
                        </th>
                        <th className="p-4 w-12 text-center">STT</th>
                        <th className="p-4 w-28 text-center">ẢNH ĐẠI DIỆN</th>
                        <th className="p-4">HỌ TÊN & CHUYÊN KHOA BÁC SĨ</th>
                        <th className="p-4">KINH NGHIỆM & TIỂU SỬ TÓM TẮT</th>
                        <th className="p-4 text-center w-32">TRẠNG THÁI</th>
                        <th className="p-4 text-center w-36">THAO TÁC</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {doctors
                        .filter(d => {
                          if (doctorStatusTab === 'featured') return d.is_featured !== false;
                          if (doctorStatusTab === 'standard') return d.is_featured === false;
                          return true;
                        })
                        .map((doc, index) => (
                          <tr key={doc.id} className={`hover:bg-slate-50/70 transition-colors ${selectedDoctorIds.includes(doc.id) ? 'bg-blue-50/40' : ''}`}>
                            <td className="p-4 text-center">
                              <input
                                type="checkbox"
                                checked={selectedDoctorIds.includes(doc.id)}
                                onChange={() => {
                                  setSelectedDoctorIds(prev =>
                                    prev.includes(doc.id) ? prev.filter(i => i !== doc.id) : [...prev, doc.id]
                                  );
                                }}
                                className="w-4 h-4 rounded text-[#004b87] focus:ring-[#004b87] cursor-pointer"
                              />
                            </td>

                            <td className="p-4 text-center font-bold text-slate-500 font-mono">
                              #{index + 1}
                            </td>

                            <td className="p-4 text-center">
                              <div className="w-14 h-14 rounded-full overflow-hidden border border-slate-200 bg-slate-100 shadow-2xs mx-auto">
                                <img
                                  src={doc.avatar || '/assets/doctor_khoi.png'}
                                  alt={doc.name}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                            </td>

                            <td className="p-4 space-y-1">
                              <h3 className="font-extrabold text-[#004b87] text-sm leading-snug">{doc.name}</h3>
                              <p className="text-xs font-bold text-emerald-700">{doc.specialty}</p>
                            </td>

                            <td className="p-4 space-y-1 max-w-xs">
                              <span className="inline-block px-2 py-0.5 bg-slate-100 text-slate-700 text-[10px] font-bold rounded border border-slate-200">
                                {doc.experience || '15+ năm kinh nghiệm'}
                              </span>
                              {doc.bio && (
                                <p className="text-[11px] text-slate-500 line-clamp-2 italic leading-relaxed">
                                  {doc.bio}
                                </p>
                              )}
                            </td>

                            <td className="p-4 text-center">
                              {doc.is_featured !== false ? (
                                <span className="inline-flex items-center gap-1 px-3 py-1 bg-amber-50 text-amber-700 font-extrabold rounded-full text-xs border border-amber-200">
                                  <Star size={12} className="fill-amber-500 text-amber-500" /> Nổi bật
                                </span>
                              ) : (
                                <span className="inline-flex items-center gap-1 px-3 py-1 bg-slate-100 text-slate-600 font-extrabold rounded-full text-xs border border-slate-200">
                                  Thường
                                </span>
                              )}
                            </td>

                            <td className="p-4 text-center">
                              <div className="flex items-center justify-center gap-1.5">
                                {/* PREVIEW BUTTON */}
                                <button
                                  type="button"
                                  onClick={() => setShowDoctorPreviewModal(doc)}
                                  className="p-1.5 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-all cursor-pointer"
                                  title="Xem trước hồ sơ bác sĩ"
                                >
                                  <Eye size={16} />
                                </button>

                                {/* EDIT BUTTON */}
                                <button
                                  type="button"
                                  onClick={() => handleOpenEditDoctor(doc)}
                                  className="p-1.5 text-slate-400 hover:text-[#004b87] hover:bg-blue-50 rounded-lg transition-all cursor-pointer"
                                  title="Chỉnh sửa chi tiết bác sĩ"
                                >
                                  <Edit size={16} />
                                </button>

                                {/* DELETE BUTTON */}
                                <button
                                  type="button"
                                  onClick={() => handleDeleteDoctor(doc.id, doc.name)}
                                  className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all cursor-pointer"
                                  title="Xóa bác sĩ"
                                >
                                  <Trash2 size={16} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      }
                    </tbody>
                  </table>
                </div>

              </div>
            </div>
          )
        )}

        {/* TAB KẾT QUẢ THỰC TẾ & TRANG CHỈNH SỬA KẾT QUẢ 2 CỘT */}
        {activeTab === 'results' && (
          isEditingResultPage ? (
            /* FULL-PAGE 2-COLUMN RESULT EDITOR */
            <form onSubmit={handleSaveResult} className="space-y-6 w-full pb-16">
              
              {/* Top Breadcrumbs */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-400">
                  <button
                    type="button"
                    onClick={() => setIsEditingResultPage(false)}
                    className="hover:text-[#004b87] flex items-center gap-1 cursor-pointer"
                  >
                    <CheckCircle2 size={14} /> Kết Quả Thực Tế
                  </button>
                  <ChevronRight size={12} />
                  <span className="text-slate-700 font-bold">{editingResult ? 'Chỉnh Sửa Ca Điều Trị' : 'Tạo Ca Điều Trị Mới'}</span>
                </div>

                <button
                  type="button"
                  onClick={() => setIsEditingResultPage(false)}
                  className="text-xs text-slate-500 hover:text-slate-800 font-bold flex items-center gap-1 cursor-pointer bg-white px-3 py-1.5 rounded-xl border border-slate-200 shadow-xs"
                >
                  <ArrowLeft size={14} /> Quay lại danh sách kết quả
                </button>
              </div>

              {/* 2-Column Grid Layout */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                {/* LEFT COLUMN (lg:col-span-8 - 70%) */}
                <div className="lg:col-span-8 space-y-6">
                  
                  {/* 1. TÊM CA BỆNH NHA VÀ CHẨN ĐOÁN */}
                  <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
                    <div>
                      <label className="block text-xs font-black text-slate-700 uppercase tracking-wider mb-1.5">
                        TIÊU ĐỀ CA BỆNH NHÂN *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="VD: Bệnh nhân N.V.A (58 tuổi, Hải Phòng) - Điều trị Tăng Huyết Áp độ 3"
                        value={resultForm.data.patient_title}
                        onChange={(e) => resultForm.setData('patient_title', e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-sm font-bold text-slate-800 outline-none focus:border-[#004b87] focus:bg-white transition-all shadow-2xs"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-black text-slate-700 uppercase tracking-wider mb-1.5">
                        CHẨN ĐOÁN LÂM SÀNG BAN ĐẦU *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="VD: Tăng huyết áp nguyên phát độ 3, nguy cơ tim mạch rất cao"
                        value={resultForm.data.diagnosis}
                        onChange={(e) => resultForm.setData('diagnosis', e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs font-bold text-slate-800 outline-none focus:border-[#004b87] focus:bg-white"
                      />
                    </div>
                  </div>

                  {/* 2. TÓM TẮT KẾT QUẢ PHÁC ĐỒ */}
                  <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-2">
                    <label className="block text-xs font-black text-slate-700 uppercase tracking-wider">
                      MÔ TẢ KẾT QUẢ ĐIỀU TRỊ THỰC TẾ (OUTCOME SUMMARY) *
                    </label>
                    <textarea
                      rows={3}
                      required
                      placeholder="Huyết áp ổn định về mức 120/80 mmHg sau 4 tuần phác đồ phối hợp. Không còn triệu chứng đau đầu tức ngực..."
                      value={resultForm.data.outcome}
                      onChange={(e) => resultForm.setData('outcome', e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-xs text-slate-800 outline-none focus:border-[#004b87] focus:bg-white leading-relaxed resize-none"
                    />
                  </div>

                  {/* 3. BÁO CÁO PHÁC ĐỒ ĐIỀU TRỊ VÀ DIỄN TIẾN CA BỆNH CHI TIẾT (WYSIWYG RICH TEXT EDITOR) */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider">
                        CHI TIẾT PHÁC ĐỒ ĐIỀU TRỊ & DIỄN TIẾN LÂM SÀNG *
                      </label>

                      <div className="flex items-center gap-2 text-[11px] font-mono font-medium text-slate-500">
                        <span>{getArticleWordCount(resultForm.data.detailed_case)} từ</span>
                      </div>
                    </div>

                    <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-2xs">
                      {/* Attached Toolbar */}
                      {(resultEditorMode as string) === 'wysiwyg' && (
                        <div className="px-4 py-2.5 bg-slate-50/80 border-b border-slate-200/80 flex flex-wrap items-center justify-between gap-2 text-xs font-semibold text-slate-600">
                          <div className="flex flex-wrap items-center gap-1">
                            <button type="button" onClick={() => execResultEditorCmd('bold')} className={`p-1.5 rounded-md cursor-pointer ${activeFormats.bold ? 'bg-[#004b87] text-white font-black' : 'hover:bg-slate-200/80 text-slate-700 font-extrabold'}`} title="In đậm">B</button>
                            <button type="button" onClick={() => execResultEditorCmd('italic')} className={`p-1.5 rounded-md cursor-pointer ${activeFormats.italic ? 'bg-[#004b87] text-white italic' : 'hover:bg-slate-200/80 text-slate-700 italic'}`} title="In nghiêng">I</button>
                            <button type="button" onClick={() => execResultEditorCmd('underline')} className={`p-1.5 rounded-md cursor-pointer ${activeFormats.underline ? 'bg-[#004b87] text-white underline' : 'hover:bg-slate-200/80 text-slate-700 underline'}`} title="Gạch chân">U</button>
                            <button type="button" onClick={() => execResultEditorCmd('strikeThrough')} className={`p-1.5 rounded-md cursor-pointer ${activeFormats.strikeThrough ? 'bg-[#004b87] text-white line-through' : 'hover:bg-slate-200/80 text-slate-700 line-through'}`} title="Gạch ngang">S</button>
                            <span className="w-px h-4 bg-slate-300 mx-1"></span>
                            <button type="button" onClick={() => { saveEditorSelection(); const url = prompt('Nhập URL:', 'https://'); if (url) { if (resultEditorRef.current) resultEditorRef.current.focus(); execResultEditorCmd('createLink', url); } }} className="p-1.5 hover:bg-slate-200/80 text-slate-700 rounded-md cursor-pointer" title="Chèn link"><Link2 size={15} /></button>
                            <button type="button" onClick={() => execResultEditorCmd('unlink')} className="p-1.5 hover:bg-slate-200/80 text-slate-700 rounded-md cursor-pointer" title="Xóa link"><Unlink size={15} /></button>
                            <button type="button" onClick={() => handleOpenMediaPicker('result_editor')} className="p-1.5 hover:bg-slate-200/80 text-slate-700 rounded-md cursor-pointer" title="Chèn hình ảnh"><ImageIcon size={15} /></button>
                            <span className="w-px h-4 bg-slate-300 mx-1"></span>
                            <button type="button" onClick={() => execResultEditorCmd('formatBlock', '<h4>')} className="px-2 py-1 rounded-md font-bold hover:bg-slate-200/80 text-slate-700 text-xs" title="Tiêu đề H2">H2</button>
                            <button type="button" onClick={() => execResultEditorCmd('formatBlock', '<h5>')} className="px-2 py-1 rounded-md font-bold hover:bg-slate-200/80 text-slate-700 text-xs" title="Tiêu đề H3">H3</button>
                            <button type="button" onClick={() => execResultEditorCmd('formatBlock', '<p>')} className="px-2 py-1 rounded-md font-bold hover:bg-slate-200/80 text-slate-700 text-xs" title="Đoạn văn">P</button>
                            <span className="w-px h-4 bg-slate-300 mx-1"></span>
                            <button type="button" onClick={() => execResultEditorCmd('insertUnorderedList')} className="p-1.5 hover:bg-slate-200/80 text-slate-700 rounded-md cursor-pointer" title="Danh sách chấm"><List size={15} /></button>
                            <button type="button" onClick={() => execResultEditorCmd('insertOrderedList')} className="p-1.5 hover:bg-slate-200/80 text-slate-700 rounded-md cursor-pointer" title="Danh sách số"><ListOrdered size={15} /></button>
                            <span className="w-px h-4 bg-slate-300 mx-1"></span>
                            <button type="button" onClick={() => execResultEditorCmd('justifyLeft')} className="p-1.5 hover:bg-slate-200/80 text-slate-700 rounded-md cursor-pointer" title="Căn trái"><AlignLeft size={15} /></button>
                            <button type="button" onClick={() => execResultEditorCmd('justifyCenter')} className="p-1.5 hover:bg-slate-200/80 text-slate-700 rounded-md cursor-pointer" title="Căn giữa"><AlignCenter size={15} /></button>
                            <button type="button" onClick={() => execResultEditorCmd('justifyRight')} className="p-1.5 hover:bg-slate-200/80 text-slate-700 rounded-md cursor-pointer" title="Căn phải"><AlignRight size={15} /></button>
                            <span className="w-px h-4 bg-slate-300 mx-1"></span>
                            <button type="button" onClick={() => execResultEditorCmd('undo')} className="p-1.5 hover:bg-slate-200/70 text-slate-700 rounded-md cursor-pointer" title="Undo"><Undo size={15} /></button>
                            <button type="button" onClick={() => execResultEditorCmd('redo')} className="p-1.5 hover:bg-slate-200/70 text-slate-700 rounded-md cursor-pointer" title="Redo"><Redo size={15} /></button>
                          </div>

                          <div className="flex items-center gap-1 text-[11px]">
                            <button type="button" onClick={() => setResultEditorMode('wysiwyg')} className={`px-2 py-0.5 rounded font-bold cursor-pointer ${(resultEditorMode as string) === 'wysiwyg' ? 'bg-[#004b87] text-white' : 'text-slate-500'}`}>Trực quan</button>
                            <button type="button" onClick={() => setResultEditorMode('html')} className={`px-2 py-0.5 rounded font-bold cursor-pointer ${(resultEditorMode as string) === 'html' ? 'bg-[#004b87] text-white' : 'text-slate-500'}`}>HTML</button>
                          </div>
                        </div>
                      )}

                      {/* Editor Canvas */}
                      {(resultEditorMode as string) === 'wysiwyg' ? (
                        <div
                          ref={resultEditorRef}
                          contentEditable={true}
                          onInput={syncResultEditorContentToForm}
                          onBlur={syncResultEditorContentToForm}
                          onKeyUp={saveEditorSelection}
                          onMouseUp={saveEditorSelection}
                          className="w-full min-h-[280px] max-h-[480px] overflow-y-auto p-6 text-sm text-slate-700 leading-relaxed outline-none space-y-3 shadow-inner"
                        />
                      ) : (
                        <textarea
                          rows={14}
                          placeholder="Nội dung HTML ca lâm sàng..."
                          value={resultForm.data.detailed_case}
                          onChange={(e) => {
                            resultForm.setData('detailed_case', e.target.value);
                            if (resultEditorRef.current) resultEditorRef.current.innerHTML = e.target.value;
                          }}
                          className="w-full min-h-[280px] bg-slate-900 p-6 text-xs font-mono text-emerald-400 outline-none leading-relaxed resize-y border-none"
                        />
                      )}
                    </div>
                  </div>

                  {/* 4. SEO META SECTION */}
                  <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
                    <div>
                      <label className="block text-xs font-black text-slate-700 uppercase tracking-wider mb-1.5">
                        META TITLE (CẤU HÌNH SEO)
                      </label>
                      <input
                        type="text"
                        placeholder="VD: Kết quả điều trị Tăng Huyết Áp độ 3 thành công - MediPlus"
                        value={resultForm.data.meta_title}
                        onChange={(e) => resultForm.setData('meta_title', e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-800 outline-none focus:border-[#004b87] focus:bg-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-black text-slate-700 uppercase tracking-wider mb-1.5">
                        META DESCRIPTION
                      </label>
                      <textarea
                        rows={3}
                        placeholder="Xem chi tiết diễn tiến điều trị và hình ảnh lâm sàng ca bệnh..."
                        value={resultForm.data.meta_description}
                        onChange={(e) => resultForm.setData('meta_description', e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-800 outline-none focus:border-[#004b87] focus:bg-white resize-none"
                      />
                    </div>
                  </div>

                </div>

                {/* RIGHT COLUMN (lg:col-span-4 - 30%) */}
                <div className="lg:col-span-4 space-y-6">
                  
                  {/* 1. HÀNH ĐỘNG & TRẠNG THÁI */}
                  <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
                    <h3 className="text-xs font-black text-slate-700 uppercase tracking-wider border-b border-slate-100 pb-3">
                      HÀNH ĐỘNG & TRẠNG THÁI
                    </h3>

                    <button
                      type="submit"
                      disabled={resultForm.processing}
                      className="w-full py-3.5 bg-[#004b87] hover:bg-[#003866] text-white font-extrabold text-xs uppercase tracking-wider rounded-xl shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
                    >
                      <Save size={16} /> {editingResult ? 'LƯU & CẬP NHẬT CA ĐIỀU TRỊ' : 'XUẤT BẢN CA ĐIỀU TRỊ MỚI'}
                    </button>

                    <div className="flex items-center justify-between py-2 border-t border-b border-slate-100">
                      <div>
                        <span className="text-xs font-bold text-slate-800 block">Ca lâm sàng nổi bật</span>
                        <span className="text-[11px] text-slate-400 block">Hiển thị ưu tiên tại trang chủ</span>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={resultForm.data.is_featured}
                          onChange={(e) => resultForm.setData('is_featured', e.target.checked)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-500"></div>
                      </label>
                    </div>

                    <button
                      type="button"
                      onClick={() => setShowResultPreviewModal({
                        id: editingResult ? editingResult.id : 0,
                        patient_title: resultForm.data.patient_title || 'Bệnh nhân N.V.A',
                        before_image: resultForm.data.before_image,
                        after_image: resultForm.data.after_image,
                        diagnosis: resultForm.data.diagnosis,
                        outcome: resultForm.data.outcome,
                        detailed_case: resultForm.data.detailed_case,
                        is_featured: resultForm.data.is_featured,
                      })}
                      className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-extrabold rounded-xl text-xs flex items-center justify-center gap-2 cursor-pointer transition-all"
                    >
                      <Eye size={16} /> Xem trước ca lâm sàng
                    </button>
                  </div>

                  {/* 2. CHỌN ẢNH TRƯỚC VÀ SAU ĐIỀU TRỊ */}
                  <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-4 text-xs">
                    <label className="block font-black text-slate-700 uppercase tracking-wider border-b border-slate-100 pb-2">
                      HÌNH ÁNH LÂM SÀNG TRƯỚC & SAU (BEFORE / AFTER)
                    </label>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      
                      {/* Before Image Card */}
                      <div className="space-y-2">
                        <span className="block font-bold text-slate-500 text-[10px] uppercase tracking-wider">
                          Trước điều trị (Before)
                        </span>
                        
                        {resultForm.data.before_image ? (
                          <div className="relative rounded-2xl overflow-hidden border border-slate-200 bg-slate-950 h-36 flex items-center justify-center group shadow-xs">
                            <img
                              src={resultForm.data.before_image}
                              alt="Before Treatment"
                              className="w-full h-full object-cover opacity-90 group-hover:opacity-75 transition-all duration-300"
                              onError={(e) => { (e.target as HTMLImageElement).src = '/assets/screening_service.png'; }}
                            />
                            {/* Hover Overlay */}
                            <div className="absolute inset-0 flex items-center justify-center">
                              <button
                                type="button"
                                onClick={() => handleOpenMediaPicker('result_before')}
                                className="px-4 py-2 bg-black/85 hover:bg-black text-white font-extrabold rounded-xl text-[11px] shadow-md cursor-pointer transition-all hover:scale-105"
                              >
                                Thay đổi ảnh
                              </button>
                            </div>
                            {/* Delete Button */}
                            <button
                              type="button"
                              onClick={() => resultForm.setData('before_image', '')}
                              className="absolute top-2 right-2 w-7 h-7 rounded-full bg-rose-600 hover:bg-rose-700 text-white flex items-center justify-center shadow-md cursor-pointer transition-transform hover:scale-110 z-10"
                              title="Xóa hình ảnh Before"
                            >
                              <Trash2 size={13} />
                            </button>
                          </div>
                        ) : (
                          <div
                            onClick={() => handleOpenMediaPicker('result_before')}
                            className="rounded-2xl border-2 border-dashed border-slate-200 hover:border-[#004b87] bg-slate-50 hover:bg-blue-50/30 h-36 flex flex-col items-center justify-center text-center p-3 cursor-pointer transition-all group"
                          >
                            <div className="w-10 h-10 rounded-xl bg-white text-blue-600 shadow-3xs flex items-center justify-center mb-1.5 group-hover:scale-110 transition-transform">
                              <FolderOpen size={20} />
                            </div>
                            <p className="font-extrabold text-blue-600 text-[11px]">Chọn ảnh Before</p>
                            <p className="text-[9px] text-slate-400 mt-0.5">Tải lên từ thiết bị hoặc quản lý tệp</p>
                          </div>
                        )}
                      </div>

                      {/* After Image Card */}
                      <div className="space-y-2">
                        <span className="block font-bold text-slate-500 text-[10px] uppercase tracking-wider">
                          Sau điều trị (After)
                        </span>

                        {resultForm.data.after_image ? (
                          <div className="relative rounded-2xl overflow-hidden border border-slate-200 bg-slate-950 h-36 flex items-center justify-center group shadow-xs">
                            <img
                              src={resultForm.data.after_image}
                              alt="After Treatment"
                              className="w-full h-full object-cover opacity-90 group-hover:opacity-75 transition-all duration-300"
                              onError={(e) => { (e.target as HTMLImageElement).src = '/assets/screening_service.png'; }}
                            />
                            {/* Hover Overlay */}
                            <div className="absolute inset-0 flex items-center justify-center">
                              <button
                                type="button"
                                onClick={() => handleOpenMediaPicker('result_after')}
                                className="px-4 py-2 bg-black/85 hover:bg-black text-white font-extrabold rounded-xl text-[11px] shadow-md cursor-pointer transition-all hover:scale-105"
                              >
                                Thay đổi ảnh
                              </button>
                            </div>
                            {/* Delete Button */}
                            <button
                              type="button"
                              onClick={() => resultForm.setData('after_image', '')}
                              className="absolute top-2 right-2 w-7 h-7 rounded-full bg-rose-600 hover:bg-rose-700 text-white flex items-center justify-center shadow-md cursor-pointer transition-transform hover:scale-110 z-10"
                              title="Xóa hình ảnh After"
                            >
                              <Trash2 size={13} />
                            </button>
                          </div>
                        ) : (
                          <div
                            onClick={() => handleOpenMediaPicker('result_after')}
                            className="rounded-2xl border-2 border-dashed border-slate-200 hover:border-emerald-500 bg-slate-50 hover:bg-emerald-50/30 h-36 flex flex-col items-center justify-center text-center p-3 cursor-pointer transition-all group"
                          >
                            <div className="w-10 h-10 rounded-xl bg-white text-emerald-600 shadow-3xs flex items-center justify-center mb-1.5 group-hover:scale-110 transition-transform">
                              <FolderOpen size={20} />
                            </div>
                            <p className="font-extrabold text-emerald-600 text-[11px]">Chọn ảnh After</p>
                            <p className="text-[9px] text-slate-400 mt-0.5">Tải lên từ thiết bị hoặc quản lý tệp</p>
                          </div>
                        )}
                      </div>

                    </div>
                  </div>

                </div>

              </div>

            </form>
          ) : (
            /* RESULTS TABLE LIST VIEW */
            <div className="space-y-6 w-full">
              <div className="bg-white border border-slate-200/80 rounded-2xl p-8 shadow-sm space-y-6 w-full">
                
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-4 border-b border-slate-100">
                  <div>
                    <h2 className="text-xl font-extrabold text-[#004b87]">Kết Quả Điều Trị Thực Tế</h2>
                    <p className="text-xs text-slate-500 mt-1">
                      Quản lý kho dữ liệu ca bệnh lâm sàng thực tế ({treatmentResults.length} ca điều trị)
                    </p>
                  </div>

                  <button
                    onClick={handleOpenCreateResult}
                    className="flex items-center gap-1.5 bg-[#004b87] hover:bg-[#003866] text-white font-bold text-xs px-4 py-2 rounded-xl transition-all cursor-pointer shrink-0 shadow-sm"
                  >
                    <Plus size={16} /> Thêm Ca Thực Tế Mới
                  </button>
                </div>

                {/* STATUS FILTER TABS */}
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl text-xs font-bold">
                    <button
                      type="button"
                      onClick={() => setResultStatusTab('all')}
                      className={`px-3.5 py-1.5 rounded-lg transition-all cursor-pointer ${resultStatusTab === 'all' ? 'bg-[#004b87] text-white shadow-xs' : 'text-slate-600 hover:bg-slate-200'}`}
                    >
                      Tất cả ca lâm sàng ({treatmentResults.length})
                    </button>
                    <button
                      type="button"
                      onClick={() => setResultStatusTab('featured')}
                      className={`px-3.5 py-1.5 rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${resultStatusTab === 'featured' ? 'bg-amber-600 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-200'}`}
                    >
                      <Star size={13} className={resultStatusTab === 'featured' ? 'fill-white' : 'fill-amber-500 text-amber-500'} />
                      Ca Nổi bật ({treatmentResults.filter(r => r.is_featured !== false).length})
                    </button>
                    <button
                      type="button"
                      onClick={() => setResultStatusTab('standard')}
                      className={`px-3.5 py-1.5 rounded-lg transition-all cursor-pointer ${resultStatusTab === 'standard' ? 'bg-slate-700 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-200'}`}
                    >
                      Ca Thường ({treatmentResults.filter(r => r.is_featured === false).length})
                    </button>
                  </div>
                </div>

                {/* BATCH ACTION BAR */}
                {selectedResultIds.length > 0 && (
                  <div className="bg-[#004b87] text-white p-4 rounded-2xl shadow-xl flex flex-wrap items-center justify-between gap-3 animate-fade-in text-xs font-bold">
                    <div className="flex items-center gap-2">
                      <span className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center font-mono text-xs">
                        {selectedResultIds.length}
                      </span>
                      <span>Đã chọn {selectedResultIds.length} ca điều trị</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button type="button" onClick={() => handleBatchResultAction('feature')} className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-xl shadow-xs cursor-pointer flex items-center gap-1"><Star size={13} className="fill-white" /> Bật Nổi bật</button>
                      <button type="button" onClick={() => handleBatchResultAction('unfeature')} className="px-4 py-2 bg-slate-600 hover:bg-slate-700 text-white rounded-xl shadow-xs cursor-pointer flex items-center gap-1"><Star size={13} className="text-slate-300" /> Tắt Nổi bật</button>
                      <button type="button" onClick={() => handleBatchResultAction('delete')} className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl shadow-xs cursor-pointer flex items-center gap-1"><Trash2 size={13} /> Xóa hàng loạt</button>
                    </div>
                  </div>
                )}

                {/* Treatment Results Table List View */}
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs text-slate-700 border-collapse">
                    <thead className="bg-slate-50/80 text-slate-400 uppercase font-extrabold tracking-wider border-b border-slate-200">
                      <tr>
                        <th className="p-4 w-10 text-center">
                          <input
                            type="checkbox"
                            checked={
                              selectedResultIds.length > 0 &&
                              selectedResultIds.length === treatmentResults.filter(r => {
                                if (resultStatusTab === 'featured') return r.is_featured !== false;
                                if (resultStatusTab === 'standard') return r.is_featured === false;
                                return true;
                              }).length
                            }
                            onChange={(e) => {
                              const visibleResults = treatmentResults.filter(r => {
                                if (resultStatusTab === 'featured') return r.is_featured !== false;
                                if (resultStatusTab === 'standard') return r.is_featured === false;
                                return true;
                              });
                              setSelectedResultIds(e.target.checked ? visibleResults.map(r => r.id) : []);
                            }}
                            className="w-4 h-4 rounded text-[#004b87] focus:ring-[#004b87] cursor-pointer"
                          />
                        </th>
                        <th className="p-4 w-12 text-center">STT</th>
                        <th className="p-4 w-32 text-center">ẢNH TRƯỚC / SAU</th>
                        <th className="p-4">TIÊU ĐỀ CA BỆNH NHÂN & CHẨN ĐOÁN</th>
                        <th className="p-4">KẾT QUẢ ĐIỀU TRỊ THỰC TẾ</th>
                        <th className="p-4 text-center w-32">TRẠNG THÁI</th>
                        <th className="p-4 text-center w-36">THAO TÁC</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {treatmentResults
                        .filter(r => {
                          if (resultStatusTab === 'featured') return r.is_featured !== false;
                          if (resultStatusTab === 'standard') return r.is_featured === false;
                          return true;
                        })
                        .map((res, index) => (
                          <tr key={res.id} className={`hover:bg-slate-50/70 transition-colors ${selectedResultIds.includes(res.id) ? 'bg-blue-50/40' : ''}`}>
                            <td className="p-4 text-center">
                              <input
                                type="checkbox"
                                checked={selectedResultIds.includes(res.id)}
                                onChange={() => {
                                  setSelectedResultIds(prev =>
                                    prev.includes(res.id) ? prev.filter(i => i !== res.id) : [...prev, res.id]
                                  );
                                }}
                                className="w-4 h-4 rounded text-[#004b87] focus:ring-[#004b87] cursor-pointer"
                              />
                            </td>

                            <td className="p-4 text-center font-bold text-slate-500 font-mono">
                              #{index + 1}
                            </td>

                            <td className="p-4">
                              <div className="flex items-center justify-center gap-1.5">
                                {res.before_image && (
                                  <div className="relative w-12 h-12 rounded-xl overflow-hidden border border-slate-200 shadow-2xs group">
                                    <img src={res.before_image} alt="Before" className="w-full h-full object-cover" />
                                    <span className="absolute bottom-0 inset-x-0 bg-black/60 text-white text-[8px] font-bold text-center">BEFORE</span>
                                  </div>
                                )}
                                {res.after_image && (
                                  <div className="relative w-12 h-12 rounded-xl overflow-hidden border border-emerald-200 shadow-2xs group">
                                    <img src={res.after_image} alt="After" className="w-full h-full object-cover" />
                                    <span className="absolute bottom-0 inset-x-0 bg-emerald-700/80 text-white text-[8px] font-bold text-center">AFTER</span>
                                  </div>
                                )}
                              </div>
                            </td>

                            <td className="p-4 space-y-1">
                              <h3 className="font-extrabold text-[#004b87] text-sm leading-snug">{res.patient_title}</h3>
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-emerald-50 text-emerald-700 font-bold rounded-md text-[10px] border border-emerald-200">
                                {res.diagnosis}
                              </span>
                            </td>

                            <td className="p-4 text-slate-600 text-xs leading-relaxed max-w-sm line-clamp-3">
                              {res.outcome}
                            </td>

                            <td className="p-4 text-center">
                              {res.is_featured !== false ? (
                                <span className="inline-flex items-center gap-1 px-3 py-1 bg-amber-50 text-amber-700 font-extrabold rounded-full text-xs border border-amber-200">
                                  <Star size={12} className="fill-amber-500 text-amber-500" /> Ca Nổi bật
                                </span>
                              ) : (
                                <span className="inline-flex items-center gap-1 px-3 py-1 bg-slate-100 text-slate-600 font-extrabold rounded-full text-xs border border-slate-200">
                                  Thường
                                </span>
                              )}
                            </td>

                            <td className="p-4 text-center">
                              <div className="flex items-center justify-center gap-1.5">
                                <button
                                  type="button"
                                  onClick={() => setShowResultPreviewModal(res)}
                                  className="p-1.5 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-all cursor-pointer"
                                  title="Xem trước ca điều trị"
                                >
                                  <Eye size={16} />
                                </button>
                                <button
                                  type="button"
                                  onClick={() => handleOpenEditResult(res)}
                                  className="p-1.5 text-slate-400 hover:text-[#004b87] hover:bg-blue-50 rounded-lg transition-all cursor-pointer"
                                  title="Chỉnh sửa ca điều trị"
                                >
                                  <Edit size={16} />
                                </button>
                                <button
                                  type="button"
                                  onClick={() => handleDeleteResult(res.id, res.patient_title)}
                                  className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all cursor-pointer"
                                  title="Xóa ca điều trị"
                                >
                                  <Trash2 size={16} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      }
                    </tbody>
                  </table>
                </div>

              </div>
            </div>
          )
        )}

        {/* TAB QUẢN LÝ TÁC GIẢ BÀI VIẾT */}
        {activeTab === 'authors' && (
          isEditingAuthorPage ? (
            /* SUB-PAGE: CHỈNH SỬA / THÊM TÁC GIẢ CHI TIẾT (CHUẨN SCREENSHOT REFERENCE) */
            <div className="space-y-6 w-full">
              {/* Header Navigation Bar */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
                  <button type="button" onClick={() => setIsEditingAuthorPage(false)} className="hover:text-[#004b87] transition-colors">
                    Tác giả bài viết
                  </button>
                  <span>/</span>
                  <span className="text-[#004b87] font-black">
                    {editingAuthor ? 'Chỉnh Sửa Tác Giả' : 'Thêm Tác Giả'}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => setIsEditingAuthorPage(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs transition-all cursor-pointer border border-slate-200"
                >
                  Quay lại danh sách
                </button>
              </div>

              <form onSubmit={handleSaveAuthor} className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                
                {/* LEFT COLUMN (lg:col-span-8 - 70%) */}
                <div className="lg:col-span-8 space-y-6">
                  
                  {/* Card 1: Thông tin cơ bản tác giả */}
                  <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                        TÊN TÁC GIẢ *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Nhập họ và tên tác giả"
                        value={authorForm.data.name}
                        onChange={(e) => authorForm.setData('name', e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-xs font-bold text-slate-800 outline-none focus:border-[#004b87] focus:bg-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                        CHỨC DANH / VAI TRÒ
                      </label>
                      <input
                        type="text"
                        placeholder="Ví dụ: Bác sĩ CKI Da liễu, Chuyên gia thẩm mỹ..."
                        value={authorForm.data.title}
                        onChange={(e) => authorForm.setData('title', e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-xs text-slate-800 outline-none focus:border-[#004b87] focus:bg-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                        TÓM TẮT TIỂU SỬ
                      </label>
                      <textarea
                        rows={3}
                        placeholder="Nhập thông tin giới thiệu tóm tắt..."
                        value={authorForm.data.bio}
                        onChange={(e) => authorForm.setData('bio', e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-xs text-slate-800 outline-none focus:border-[#004b87] focus:bg-white leading-relaxed resize-none"
                      />
                    </div>
                  </div>

                  {/* Card 2: Nội dung giới thiệu chi tiết (Rich Editor matching screenshot) */}
                  <div className="space-y-2">
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider">
                      NỘI DUNG GIỚI THIỆU CHI TIẾT (MARKDOWN/HTML)
                    </label>

                    <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-2xs">
                      {/* Attached Toolbar Identical to Article Editor */}
                      {editorMode === 'wysiwyg' && (
                        <div className="px-4 py-2.5 bg-slate-50/80 border-b border-slate-200/80 flex flex-wrap items-center justify-between gap-2 text-xs font-semibold text-slate-600">
                          <div className="flex flex-wrap items-center gap-1">
                            {/* Formatting B I U S */}
                            <button
                              type="button"
                              onClick={() => execEditorCmd('bold')}
                              className={`p-1.5 rounded-md cursor-pointer transition-all ${
                                activeFormats.bold ? 'bg-[#004b87] text-white shadow-xs font-black scale-105' : 'hover:bg-slate-200/80 text-slate-700 font-extrabold'
                              }`}
                              title="In đậm (Bold)"
                            >
                              B
                            </button>
                            <button
                              type="button"
                              onClick={() => execEditorCmd('italic')}
                              className={`p-1.5 rounded-md cursor-pointer transition-all ${
                                activeFormats.italic ? 'bg-[#004b87] text-white shadow-xs italic scale-105' : 'hover:bg-slate-200/80 text-slate-700 italic'
                              }`}
                              title="In nghiêng (Italic)"
                            >
                              I
                            </button>
                            <button
                              type="button"
                              onClick={() => execEditorCmd('underline')}
                              className={`p-1.5 rounded-md cursor-pointer transition-all ${
                                activeFormats.underline ? 'bg-[#004b87] text-white shadow-xs underline scale-105' : 'hover:bg-slate-200/80 text-slate-700 underline'
                              }`}
                              title="Gạch chân (Underline)"
                            >
                              U
                            </button>
                            <button
                              type="button"
                              onClick={() => execEditorCmd('strikeThrough')}
                              className={`p-1.5 rounded-md cursor-pointer transition-all ${
                                activeFormats.strikeThrough ? 'bg-[#004b87] text-white shadow-xs line-through scale-105' : 'hover:bg-slate-200/80 text-slate-700 line-through'
                              }`}
                              title="Gạch ngang (Strikethrough)"
                            >
                              S
                            </button>

                            <span className="w-px h-4 bg-slate-300 mx-1"></span>

                            {/* Link / Unlink / Image */}
                            <button
                              type="button"
                              onClick={() => {
                                saveEditorSelection();
                                const url = prompt('Nhập địa chỉ đường dẫn liên kết (URL):', 'https://');
                                if (url) {
                                  if (authorEditorRef.current) authorEditorRef.current.focus();
                                  execEditorCmd('createLink', url);
                                }
                              }}
                              className="p-1.5 hover:bg-slate-200/80 text-slate-700 rounded-md cursor-pointer transition-colors"
                              title="Chèn liên kết URL"
                            >
                              <Link2 size={15} />
                            </button>
                            <button
                              type="button"
                              onClick={() => execEditorCmd('unlink')}
                              className="p-1.5 hover:bg-slate-200/80 text-slate-700 rounded-md cursor-pointer transition-colors"
                              title="Xóa liên kết URL"
                            >
                              <Unlink size={15} />
                            </button>
                            <button
                              type="button"
                              onClick={() => handleOpenMediaPicker('author_editor')}
                              className="p-1.5 hover:bg-slate-200/80 text-slate-700 rounded-md cursor-pointer transition-colors"
                              title="Chèn hình ảnh từ Quản Lý Tệp (Kéo thả)"
                            >
                              <ImageIcon size={15} />
                            </button>

                            <span className="w-px h-4 bg-slate-300 mx-1"></span>

                            {/* Headings H2 H3 P */}
                            <button
                              type="button"
                              onClick={() => execEditorCmd('formatBlock', '<h4>')}
                              className={`px-2 py-1 rounded-md font-bold cursor-pointer transition-all text-xs ${
                                activeFormats.h2 ? 'bg-[#004b87] text-white shadow-xs scale-105' : 'hover:bg-slate-200/80 text-slate-700'
                              }`}
                              title="Tiêu đề H2"
                            >
                              H2
                            </button>
                            <button
                              type="button"
                              onClick={() => execEditorCmd('formatBlock', '<h5>')}
                              className={`px-2 py-1 rounded-md font-bold cursor-pointer transition-all text-xs ${
                                activeFormats.h3 ? 'bg-[#004b87] text-white shadow-xs scale-105' : 'hover:bg-slate-200/80 text-slate-700'
                              }`}
                              title="Tiêu đề H3"
                            >
                              H3
                            </button>
                            <button
                              type="button"
                              onClick={() => execEditorCmd('formatBlock', '<p>')}
                              className={`px-2 py-1 rounded-md font-bold cursor-pointer transition-all text-xs ${
                                activeFormats.p ? 'bg-[#004b87] text-white shadow-xs scale-105' : 'hover:bg-slate-200/80 text-slate-700'
                              }`}
                              title="Đoạn văn"
                            >
                              P
                            </button>

                            <span className="w-px h-4 bg-slate-300 mx-1"></span>

                            {/* Lists */}
                            <button
                              type="button"
                              onClick={() => execEditorCmd('insertUnorderedList')}
                              className={`p-1.5 rounded-md cursor-pointer transition-all ${
                                activeFormats.unorderedList ? 'bg-[#004b87] text-white shadow-xs scale-105' : 'hover:bg-slate-200/80 text-slate-700'
                              }`}
                              title="Danh sách chấm"
                            >
                              <List size={15} />
                            </button>
                            <button
                              type="button"
                              onClick={() => execEditorCmd('insertOrderedList')}
                              className={`p-1.5 rounded-md cursor-pointer transition-all ${
                                activeFormats.orderedList ? 'bg-[#004b87] text-white shadow-xs scale-105' : 'hover:bg-slate-200/80 text-slate-700'
                              }`}
                              title="Danh sách số"
                            >
                              <ListOrdered size={15} />
                            </button>

                            <span className="w-px h-4 bg-slate-300 mx-1"></span>

                            {/* Alignment */}
                            <button
                              type="button"
                              onClick={() => execEditorCmd('justifyLeft')}
                              className={`p-1.5 rounded-md cursor-pointer transition-all ${
                                activeFormats.alignLeft ? 'bg-[#004b87] text-white shadow-xs scale-105' : 'hover:bg-slate-200/80 text-slate-700'
                              }`}
                              title="Căn trái"
                            >
                              <AlignLeft size={15} />
                            </button>
                            <button
                              type="button"
                              onClick={() => execEditorCmd('justifyCenter')}
                              className={`p-1.5 rounded-md cursor-pointer transition-all ${
                                activeFormats.alignCenter ? 'bg-[#004b87] text-white shadow-xs scale-105' : 'hover:bg-slate-200/80 text-slate-700'
                              }`}
                              title="Căn giữa"
                            >
                              <AlignCenter size={15} />
                            </button>
                            <button
                              type="button"
                              onClick={() => execEditorCmd('justifyRight')}
                              className={`p-1.5 rounded-md cursor-pointer transition-all ${
                                activeFormats.alignRight ? 'bg-[#004b87] text-white shadow-xs scale-105' : 'hover:bg-slate-200/80 text-slate-700'
                              }`}
                              title="Căn phải"
                            >
                              <AlignRight size={15} />
                            </button>

                            <span className="w-px h-4 bg-slate-300 mx-1"></span>

                            {/* Undo / Redo */}
                            <button type="button" onClick={() => execEditorCmd('undo')} className="p-1.5 hover:bg-slate-200/70 text-slate-700 rounded-md cursor-pointer transition-colors" title="Hoàn tác (Undo)">
                              <Undo size={15} />
                            </button>
                            <button type="button" onClick={() => execEditorCmd('redo')} className="p-1.5 hover:bg-slate-200/70 text-slate-700 rounded-md cursor-pointer transition-colors" title="Làm lại (Redo)">
                              <Redo size={15} />
                            </button>
                          </div>

                          {/* Mode Switch (Code vs Visual) */}
                          <div className="flex items-center gap-1 text-[11px]">
                            <button
                              type="button"
                              onClick={() => setEditorMode('wysiwyg')}
                              className={`px-2 py-0.5 rounded font-bold transition-all cursor-pointer ${
                                (editorMode as string) === 'wysiwyg' ? 'bg-[#004b87] text-white' : 'text-slate-500 hover:text-slate-800'
                              }`}
                            >
                              Trực quan
                            </button>
                            <button
                              type="button"
                              onClick={() => setEditorMode('html')}
                              className={`px-2 py-0.5 rounded font-bold transition-all cursor-pointer ${
                                (editorMode as string) === 'html' ? 'bg-[#004b87] text-white' : 'text-slate-500 hover:text-slate-800'
                              }`}
                            >
                              HTML
                            </button>
                          </div>
                        </div>
                      )}

                      {/* Editor Canvas Area */}
                      {editorMode === 'wysiwyg' ? (
                        <div
                          ref={authorEditorRef}
                          contentEditable={true}
                          onInput={() => authorEditorRef.current && authorForm.setData('details', authorEditorRef.current.innerHTML)}
                          onBlur={() => authorEditorRef.current && authorForm.setData('details', authorEditorRef.current.innerHTML)}
                          onKeyUp={checkActiveFormats}
                          onMouseUp={checkActiveFormats}
                          className="w-full min-h-[300px] max-h-[500px] overflow-y-auto p-6 text-sm text-slate-700 leading-relaxed font-sans cursor-text outline-none space-y-3 [&_h4]:text-lg [&_h4]:font-extrabold [&_h4]:text-slate-800 [&_h4]:mt-6 [&_h4]:mb-3 [&_h5]:text-base [&_h5]:font-bold [&_h5]:text-slate-800 [&_h5]:mt-4 [&_h5]:mb-2 [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:space-y-1.5 [&_ol]:font-bold [&_ol]:text-slate-800 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1.5 [&_a]:text-blue-600 [&_a]:underline [&_img]:rounded-2xl [&_img]:max-w-full [&_img]:my-3 shadow-inner"
                        />
                      ) : (
                        <textarea
                          rows={14}
                          placeholder="Nội dung HTML giới thiệu tác giả..."
                          value={authorForm.data.details}
                          onChange={(e) => {
                            authorForm.setData('details', e.target.value);
                            if (authorEditorRef.current) {
                              authorEditorRef.current.innerHTML = e.target.value;
                            }
                          }}
                          className="w-full min-h-[300px] bg-slate-900 p-6 text-xs font-mono text-emerald-400 outline-none leading-relaxed resize-y border-none"
                        />
                      )}
                    </div>
                  </div>

                  {/* Card 3: Accordion SEO & Nâng cao */}
                  <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-2xs">
                    <button
                      type="button"
                      onClick={() => setShowAuthorSeoAccordion(!showAuthorSeoAccordion)}
                      className="w-full p-4 flex justify-between items-center bg-slate-50/50 hover:bg-slate-100/60 transition-colors text-left font-bold text-xs text-[#004b87] cursor-pointer"
                    >
                      <span className="flex items-center gap-2">
                        {showAuthorSeoAccordion ? '▼' : '▶'} Cấu hình SEO & Nâng cao
                      </span>
                      <span className="text-[11px] text-slate-400 font-normal">Tự chọn thẻ Meta SEO tác giả</span>
                    </button>

                    {showAuthorSeoAccordion && (
                      <div className="p-6 border-t border-slate-200/80 space-y-4 bg-white">
                        <div>
                          <label className="block text-xs font-bold text-slate-500 mb-1">META TITLE</label>
                          <input
                            type="text"
                            placeholder="Nhập thẻ tiêu đề SEO hồ sơ tác giả..."
                            value={authorForm.data.meta_title}
                            onChange={(e) => authorForm.setData('meta_title', e.target.value)}
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-800 outline-none focus:border-[#004b87]"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-500 mb-1">META DESCRIPTION</label>
                          <textarea
                            rows={3}
                            placeholder="Nhập thẻ mô tả SEO hồ sơ tác giả..."
                            value={authorForm.data.meta_description}
                            onChange={(e) => authorForm.setData('meta_description', e.target.value)}
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-800 outline-none focus:border-[#004b87] resize-none"
                          />
                        </div>
                      </div>
                    )}
                  </div>

                </div>

                {/* RIGHT COLUMN (lg:col-span-4 - 30%) */}
                <div className="lg:col-span-4 space-y-6">
                  
                  {/* Card 1: ẢNH ĐẠI DIỆN (MATCHING USER SCREENSHOT) */}
                  <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-5 text-center">
                    <label className="block font-bold text-slate-500 uppercase tracking-wider text-xs border-b border-slate-100 pb-2 text-left">
                      ẢNH ĐẠI DIỆN
                    </label>

                    {/* Circular Avatar Container matching screenshot */}
                    <div className="flex flex-col items-center justify-center space-y-4">
                      <div className="relative group w-36 h-36">
                        <div
                          onClick={() => handleOpenMediaPicker('author_avatar')}
                          className="w-full h-full rounded-full border-2 border-dashed border-slate-300 hover:border-[#004b87] bg-slate-50 flex flex-col items-center justify-center cursor-pointer transition-all overflow-hidden shadow-sm"
                        >
                          {authorForm.data.avatar ? (
                            <img
                              src={authorForm.data.avatar}
                              alt="Avatar Preview"
                              className="w-full h-full object-cover group-hover:opacity-75 transition-opacity"
                            />
                          ) : (
                            <div className="flex flex-col items-center text-slate-400 group-hover:text-[#004b87]">
                              <User size={36} />
                              <span className="text-[11px] font-extrabold uppercase mt-1">CHỌN ẢNH</span>
                            </div>
                          )}

                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-bold gap-1">
                            <FolderOpen size={13} className="text-white fill-white/20" /> Đổi ảnh
                          </div>
                        </div>

                        {/* Top-Right Circular Red Trash Button for Author Avatar */}
                        {authorForm.data.avatar && (
                          <button
                            type="button"
                            onClick={() => authorForm.setData('avatar', '')}
                            className="absolute top-0 right-0 w-8 h-8 rounded-full bg-rose-600 hover:bg-rose-700 text-white flex items-center justify-center shadow-md cursor-pointer transition-transform hover:scale-110 z-10"
                            title="Xóa hình ảnh đại diện"
                          >
                            <Trash2 size={15} />
                          </button>
                        )}
                      </div>

                      <div className="space-y-2 w-full pt-2">
                        <span className="block text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">
                          HOẶC TẢI TỆP LÊN TỪ THIẾT BỊ
                        </span>
                        
                        <button
                          type="button"
                          onClick={() => handleOpenMediaPicker('author_avatar')}
                          className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs border border-slate-200 cursor-pointer transition-all flex items-center justify-center gap-1.5"
                        >
                          <FolderOpen size={14} /> Choose File từ Quản Lý Tệp
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Card 2: Nút Hành Động Submit */}
                  <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-3">
                    <button
                      type="submit"
                      disabled={authorForm.processing}
                      className="w-full py-3 bg-[#004b87] hover:bg-[#003866] text-white font-black text-xs uppercase tracking-wider rounded-xl shadow-md cursor-pointer transition-all hover:scale-[1.01]"
                    >
                      LƯU CẤU HÌNH TÁC GIẢ
                    </button>

                    <button
                      type="button"
                      onClick={() => setIsEditingAuthorPage(false)}
                      className="w-full py-2.5 bg-white border border-slate-200 text-slate-600 font-bold text-xs rounded-xl hover:bg-slate-50 cursor-pointer transition-all"
                    >
                      HỦY BỎ
                    </button>
                  </div>

                </div>

              </form>
            </div>
          ) : (
            /* LIST PAGE: TABLE OF AUTHORS (LIKE ARTICLE LIST TABLE) */
            <div className="space-y-6 w-full">
              {/* Header & Title */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
                <div>
                  <h2 className="text-lg font-black text-[#004b87] uppercase tracking-wider flex items-center gap-2">
                    <Users size={22} className="text-[#00a896]" /> QUẢN LÝ TÁC GIẢ & HỘI ĐỒNG CỐ VẤN Y KHOA
                  </h2>
                  <p className="text-xs text-slate-500 mt-1">
                    Quản lý danh sách tác giả bài viết, chức danh chuyên môn và tiểu sử hiển thị trên các bài viết cẩm nang y tế
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleOpenCreateAuthor}
                  className="px-5 py-2.5 bg-[#004b87] hover:bg-[#003866] text-white font-bold rounded-xl text-xs shadow-md flex items-center gap-2 cursor-pointer transition-all"
                >
                  <Plus size={16} /> Thêm Tác Giả Mới ➔
                </button>
              </div>

              {/* Table Container */}
              <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
                <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                  <div className="flex items-center gap-2 text-xs font-black text-slate-700 uppercase">
                    <span>Danh Sách Tác Giả</span>
                    <span className="px-2 py-0.5 bg-blue-50 text-[#004b87] rounded-md font-mono text-[11px]">
                      {authors.length} tác giả
                    </span>
                  </div>

                  <div className="relative w-full sm:w-72">
                    <Search size={14} className="absolute left-3 top-2.5 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Tìm kiếm tác giả theo tên, chức danh..."
                      value={authorSearchQuery}
                      onChange={(e) => setAuthorSearchQuery(e.target.value)}
                      className="w-full pl-8 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:border-[#004b87]"
                    />
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="bg-slate-50/80 text-slate-500 font-extrabold uppercase border-b border-slate-200/80 tracking-wider">
                        <th className="p-4 w-12 text-center">#</th>
                        <th className="p-4 w-16 text-center">ẢNH</th>
                        <th className="p-4">TÊN TÁC GIẢ</th>
                        <th className="p-4">CHỨC DANH / VAI TRÒ</th>
                        <th className="p-4 max-w-md">TÓM TẮT TIỂU SỬ</th>
                        <th className="p-4 w-36 text-center">THAO TÁC</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {authors
                        .filter((a: any) =>
                          a.name.toLowerCase().includes(authorSearchQuery.toLowerCase()) ||
                          (a.title && a.title.toLowerCase().includes(authorSearchQuery.toLowerCase()))
                        )
                        .map((author: any, index: number) => (
                          <tr key={author.id} className="hover:bg-slate-50/70 transition-colors">
                            <td className="p-4 text-center font-bold text-slate-500 font-mono">
                              #{index + 1}
                            </td>

                            <td className="p-4 text-center">
                              <div className="w-10 h-10 rounded-full overflow-hidden bg-slate-100 border border-slate-200 mx-auto shadow-2xs">
                                <img
                                  src={author.avatar || '/assets/doctor_khoi.png'}
                                  alt={author.name}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                            </td>

                            <td className="p-4 font-bold text-[#004b87] text-sm">
                              {author.name}
                            </td>

                            <td className="p-4 font-bold text-[#00a896]">
                              {author.title || 'Chưa cập nhật'}
                            </td>

                            <td className="p-4 text-slate-600 max-w-md">
                              <p className="line-clamp-2 leading-relaxed">
                                {author.bio || 'Chưa có tiểu sử tóm tắt.'}
                              </p>
                            </td>

                            <td className="p-4 text-center">
                              <div className="flex items-center justify-center gap-2">
                                <button
                                  type="button"
                                  onClick={() => handleOpenEditAuthor(author)}
                                  className="inline-flex items-center gap-1 px-3 py-1.5 bg-blue-50 text-[#004b87] hover:bg-blue-100 font-bold rounded-lg text-xs transition-all border border-blue-100 cursor-pointer"
                                  title="Sửa tác giả chi tiết"
                                >
                                  <Edit size={13} /> Sửa Chi Tiết
                                </button>
                                <button
                                  type="button"
                                  onClick={() => {
                                    if (confirm(`Bạn có chắc chắn muốn xóa tác giả "${author.name}" không?`)) {
                                      router.delete(`/admin/authors/${author.id}`);
                                    }
                                  }}
                                  className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all cursor-pointer"
                                  title="Xóa tác giả"
                                >
                                  <Trash2 size={14} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )
        )}

        {/* TAB QUẢN LÝ ĐÁNH GIÁ & PHẢN HỒI BỆNH NHÂN (LIST VIEW MỞ RỘNG) */}
        {activeTab === 'reviews' && (
          <div className="space-y-6 w-full">
            {/* Header & Action Bar Card */}
            <div className="bg-white border border-slate-200/80 rounded-2xl p-8 shadow-sm space-y-6 w-full">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-4 border-b border-slate-100">
                <div>
                  <h2 className="text-xl font-extrabold text-[#004b87] flex items-center gap-2">
                    <MessageSquare size={24} className="text-[#00a896]" />
                    Quản Lý Đánh Giá & Phản Hồi Bệnh Nhân
                  </h2>
                  <p className="text-xs text-slate-500 mt-1">
                    Kiểm duyệt, phê duyệt, từ chối và quản lý ý kiến nhận xét của khách hàng ({reviews.length} đánh giá)
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
                  {/* Search Input */}
                  <div className="relative flex-1 md:w-64">
                    <Search size={15} className="absolute left-3.5 top-3 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Tìm tên bệnh nhân, dịch vụ, nội dung..."
                      value={reviewSearchQuery}
                      onChange={(e) => setReviewSearchQuery(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-800 outline-none focus:border-[#004b87] focus:bg-white shadow-xs"
                    />
                  </div>

                  {/* Rating Filter Dropdown */}
                  <select
                    value={reviewRatingFilter}
                    onChange={(e) => setReviewRatingFilter(e.target.value === 'all' ? 'all' : Number(e.target.value))}
                    className="bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs font-bold text-slate-700 outline-none focus:border-[#004b87] cursor-pointer shadow-xs"
                  >
                    <option value="all">Tất cả xếp hạng (1 - 5 sao)</option>
                    <option value="5">★★★★★ 5 Sao</option>
                    <option value="4">★★★★☆ 4 Sao</option>
                    <option value="3">★★★☆☆ 3 Sao</option>
                    <option value="2">★★☆☆☆ 2 Sao</option>
                    <option value="1">★☆☆☆☆ 1 Sao</option>
                  </select>

                  {/* Create New Review Button */}
                  <button
                    onClick={handleOpenCreateReview}
                    className="flex items-center gap-1.5 bg-[#004b87] hover:bg-[#003866] text-white font-bold text-xs px-4 py-2 rounded-xl transition-all cursor-pointer shrink-0 shadow-sm"
                  >
                    <Plus size={16} /> Thêm Đánh Giá Mới
                  </button>
                </div>
              </div>

              {/* STATUS FILTER TABS */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-3">
                <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl text-xs font-bold">
                  <button
                    type="button"
                    onClick={() => setReviewStatusTab('all')}
                    className={`px-3.5 py-1.5 rounded-lg transition-all cursor-pointer ${
                      reviewStatusTab === 'all'
                        ? 'bg-[#004b87] text-white shadow-xs'
                        : 'text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    Tất cả đánh giá ({reviews.length})
                  </button>
                  <button
                    type="button"
                    onClick={() => setReviewStatusTab('approved')}
                    className={`px-3.5 py-1.5 rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
                      reviewStatusTab === 'approved'
                        ? 'bg-emerald-600 text-white shadow-xs'
                        : 'text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    <span className={`w-2 h-2 rounded-full ${reviewStatusTab === 'approved' ? 'bg-white' : 'bg-emerald-500'}`} />
                    Đã Phê Duyệt ({reviews.filter(r => r.is_approved !== false).length})
                  </button>
                  <button
                    type="button"
                    onClick={() => setReviewStatusTab('rejected')}
                    className={`px-3.5 py-1.5 rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
                      reviewStatusTab === 'rejected'
                        ? 'bg-rose-600 text-white shadow-xs'
                        : 'text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    <span className={`w-2 h-2 rounded-full ${reviewStatusTab === 'rejected' ? 'bg-white' : 'bg-rose-500'}`} />
                    Từ Chối / Chờ Duyệt ({reviews.filter(r => r.is_approved === false).length})
                  </button>
                </div>
              </div>

              {/* FLOATING BATCH ACTION BAR */}
              {selectedReviewIds.length > 0 && (
                <div className="bg-[#004b87] text-white p-4 rounded-2xl shadow-xl flex flex-wrap items-center justify-between gap-3 animate-fade-in text-xs font-bold border border-blue-800">
                  <div className="flex items-center gap-2">
                    <span className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center font-mono text-xs">
                      {selectedReviewIds.length}
                    </span>
                    <span>Đã chọn {selectedReviewIds.length} đánh giá</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleBatchReviewAction('approve')}
                      className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl shadow-xs cursor-pointer flex items-center gap-1.5 transition-all"
                    >
                      <CheckCircle2 size={13} /> Phê Duyệt Hàng Loạt
                    </button>
                    <button
                      type="button"
                      onClick={() => handleBatchReviewAction('reject')}
                      className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-xl shadow-xs cursor-pointer flex items-center gap-1.5 transition-all"
                    >
                      <AlertCircle size={13} /> Từ Chối Hàng Loạt
                    </button>
                    <button
                      type="button"
                      onClick={() => handleBatchReviewAction('delete')}
                      className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl shadow-xs cursor-pointer flex items-center gap-1.5 transition-all"
                    >
                      <Trash2 size={13} /> Xóa Hàng Loạt
                    </button>
                  </div>
                </div>
              )}

              {/* Reviews Table View */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-700 border-collapse">
                  <thead className="bg-slate-50/80 text-slate-400 uppercase font-extrabold tracking-wider border-b border-slate-200">
                    <tr>
                      <th className="p-4 w-10 text-center">
                        <input
                          type="checkbox"
                          checked={
                            selectedReviewIds.length > 0 &&
                            selectedReviewIds.length === reviews.filter(rev => {
                              const matchesSearch = rev.patient_name.toLowerCase().includes(reviewSearchQuery.toLowerCase()) ||
                                                    (rev.service_name && rev.service_name.toLowerCase().includes(reviewSearchQuery.toLowerCase())) ||
                                                    rev.comment.toLowerCase().includes(reviewSearchQuery.toLowerCase());
                              const matchesRating = reviewRatingFilter === 'all' || rev.rating === reviewRatingFilter;
                              const matchesStatus = reviewStatusTab === 'all' || 
                                                    (reviewStatusTab === 'approved' && rev.is_approved !== false) ||
                                                    (reviewStatusTab === 'rejected' && rev.is_approved === false);
                              return matchesSearch && matchesRating && matchesStatus;
                            }).length
                          }
                          onChange={(e) => {
                            const visibleReviews = reviews.filter(rev => {
                              const matchesSearch = rev.patient_name.toLowerCase().includes(reviewSearchQuery.toLowerCase()) ||
                                                    (rev.service_name && rev.service_name.toLowerCase().includes(reviewSearchQuery.toLowerCase())) ||
                                                    rev.comment.toLowerCase().includes(reviewSearchQuery.toLowerCase());
                              const matchesRating = reviewRatingFilter === 'all' || rev.rating === reviewRatingFilter;
                              const matchesStatus = reviewStatusTab === 'all' || 
                                                    (reviewStatusTab === 'approved' && rev.is_approved !== false) ||
                                                    (reviewStatusTab === 'rejected' && rev.is_approved === false);
                              return matchesSearch && matchesRating && matchesStatus;
                            });
                            setSelectedReviewIds(e.target.checked ? visibleReviews.map(r => r.id) : []);
                          }}
                          className="w-4 h-4 rounded text-[#004b87] focus:ring-[#004b87] cursor-pointer"
                        />
                      </th>
                      <th className="p-4 w-12 text-center">STT</th>
                      <th className="p-4">BỆNH NHÂN & DỊCH VỤ KHÁM</th>
                      <th className="p-4 w-36">XẾP HẠNG</th>
                      <th className="p-4 max-w-lg">NỘI DUNG NHẬN XÉT / ĐÁNH GIÁ</th>
                      <th className="p-4 text-center w-36">TRẠNG THÁI</th>
                      <th className="p-4 text-center w-48">THAO TÁC</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {reviews
                      .filter(rev => {
                        const matchesSearch = rev.patient_name.toLowerCase().includes(reviewSearchQuery.toLowerCase()) ||
                                              (rev.service_name && rev.service_name.toLowerCase().includes(reviewSearchQuery.toLowerCase())) ||
                                              rev.comment.toLowerCase().includes(reviewSearchQuery.toLowerCase());
                        const matchesRating = reviewRatingFilter === 'all' || rev.rating === reviewRatingFilter;
                        const matchesStatus = reviewStatusTab === 'all' || 
                                              (reviewStatusTab === 'approved' && rev.is_approved !== false) ||
                                              (reviewStatusTab === 'rejected' && rev.is_approved === false);
                        return matchesSearch && matchesRating && matchesStatus;
                      })
                      .map((rev, index) => (
                        <tr key={rev.id} className={`hover:bg-slate-50/70 transition-colors ${selectedReviewIds.includes(rev.id) ? 'bg-blue-50/40' : ''}`}>
                          <td className="p-4 text-center">
                            <input
                              type="checkbox"
                              checked={selectedReviewIds.includes(rev.id)}
                              onChange={() => {
                                setSelectedReviewIds(prev =>
                                  prev.includes(rev.id) ? prev.filter(i => i !== rev.id) : [...prev, rev.id]
                                );
                              }}
                              className="w-4 h-4 rounded text-[#004b87] focus:ring-[#004b87] cursor-pointer"
                            />
                          </td>

                          <td className="p-4 text-center font-bold text-slate-500 font-mono">
                            #{index + 1}
                          </td>

                          <td className="p-4 font-bold text-[#004b87]">
                            <div className="flex items-center gap-3">
                              <div className="w-9 h-9 rounded-full bg-blue-100 text-[#004b87] font-black flex items-center justify-center text-xs shrink-0 shadow-2xs border border-blue-200">
                                {rev.patient_name.charAt(0).toUpperCase()}
                              </div>
                              <div>
                                <span className="block font-bold text-slate-900 text-sm">{rev.patient_name}</span>
                                <span className="text-[11px] font-medium text-[#00a896] flex items-center gap-1 mt-0.5">
                                  <Activity size={11} /> {rev.service_name || 'Khám tim mạch tổng quát'}
                                </span>
                              </div>
                            </div>
                          </td>

                          <td className="p-4">
                            <div className="flex items-center gap-1 bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-200/80 w-fit">
                              {Array.from({ length: 5 }).map((_, i) => (
                                <Star
                                  key={i}
                                  size={13}
                                  className={i < rev.rating ? 'fill-amber-400 text-amber-500' : 'text-slate-300'}
                                />
                              ))}
                              <span className="text-xs font-black text-amber-700 ml-1">{rev.rating}/5</span>
                            </div>
                          </td>

                          <td className="p-4">
                            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/60 leading-relaxed text-xs text-slate-700 italic">
                              "{rev.comment}"
                            </div>
                          </td>

                          <td className="p-4 text-center">
                            {rev.is_approved !== false ? (
                              <span className="inline-flex items-center gap-1 px-3 py-1 bg-emerald-50 text-emerald-700 font-extrabold rounded-full text-xs border border-emerald-200">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Đã phê duyệt
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 px-3 py-1 bg-rose-50 text-rose-700 font-extrabold rounded-full text-xs border border-rose-200">
                                <span className="w-1.5 h-1.5 rounded-full bg-rose-500" /> Từ chối / Ẩn
                              </span>
                            )}
                          </td>

                          <td className="p-4 text-center">
                            <div className="flex items-center justify-center gap-1.5">
                              {/* APPROVE / REJECT TOGGLE BUTTON */}
                              {rev.is_approved !== false ? (
                                <button
                                  type="button"
                                  onClick={() => handleToggleReviewApproval(rev)}
                                  className="px-2.5 py-1 bg-rose-50 text-rose-700 hover:bg-rose-100 font-extrabold rounded-lg text-[11px] border border-rose-200 transition-all cursor-pointer shadow-2xs flex items-center gap-1"
                                  title="Bấm để Từ Chối / Tạm Ẩn đánh giá này khỏi website"
                                >
                                  <AlertCircle size={11} /> Từ chối
                                </button>
                              ) : (
                                <button
                                  type="button"
                                  onClick={() => handleToggleReviewApproval(rev)}
                                  className="px-2.5 py-1 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 font-extrabold rounded-lg text-[11px] border border-emerald-200 transition-all cursor-pointer shadow-2xs flex items-center gap-1"
                                  title="Bấm để Phê Duyệt đánh giá này hiển thị trên website"
                                >
                                  <CheckCircle2 size={11} /> Phê duyệt
                                </button>
                              )}

                              {/* EDIT BUTTON */}
                              <button
                                type="button"
                                onClick={() => handleOpenEditReview(rev)}
                                className="p-1.5 text-slate-400 hover:text-[#004b87] hover:bg-blue-50 rounded-lg transition-all cursor-pointer"
                                title="Chỉnh sửa nội dung đánh giá"
                              >
                                <Edit size={14} />
                              </button>

                              {/* DELETE BUTTON */}
                              <button
                                type="button"
                                onClick={() => handleDeleteReview(rev.id, rev.patient_name)}
                                className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all cursor-pointer"
                                title="Xóa đánh giá"
                              >
                                <Trash2 size={14} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    }
                  </tbody>
                </table>
              </div>

            </div>
          </div>
        )}

        {/* TAB LỊCH TRỰC BÁC SĨ (CHUẨN HÌNH 1 MOCKUP) */}
        {activeTab === 'schedules' && (
          <div className="space-y-6 w-full">
            {/* Top Breadcrumb */}
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-400">
              <span className="text-amber-700">🏠</span>
              <span>/</span>
              <span className="text-slate-700 font-bold">Lịch trực bác sĩ</span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* LEFT BOX: THÊM LỊCH TRỰC MỚI (Col-span 5) */}
              <div className="lg:col-span-5 bg-white p-7 rounded-3xl border border-slate-200/80 shadow-xs space-y-5">
                <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest border-b border-slate-100 pb-3">
                  THÊM LỊCH TRỰC MỚI
                </h3>

                <form onSubmit={handleSaveSchedule} className="space-y-4 text-xs">
                  <div>
                    <label className="block text-xs font-black text-slate-700 mb-1.5">
                      Chọn Bác sĩ *
                    </label>
                    <select
                      required
                      value={scheduleForm.data.doctor_id}
                      onChange={(e) => scheduleForm.setData('doctor_id', e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs font-bold text-slate-800 outline-none focus:border-[#004b87] focus:bg-white cursor-pointer"
                    >
                      <option value="">-- Chọn bác sĩ --</option>
                      {doctors.map(d => (
                        <option key={d.id} value={d.id}>{d.name} ({d.specialty})</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-black text-slate-700 mb-1.5">
                      Thứ trong tuần *
                    </label>
                    <select
                      required
                      value={scheduleForm.data.day_of_week}
                      onChange={(e) => scheduleForm.setData('day_of_week', e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs font-bold text-slate-800 outline-none focus:border-[#004b87] focus:bg-white cursor-pointer"
                    >
                      <option value="Thứ Hai (Thứ 2)">Thứ Hai (Thứ 2)</option>
                      <option value="Thứ Ba (Thứ 3)">Thứ Ba (Thứ 3)</option>
                      <option value="Thứ Tư (Thứ 4)">Thứ Tư (Thứ 4)</option>
                      <option value="Thứ Năm (Thứ 5)">Thứ Năm (Thứ 5)</option>
                      <option value="Thứ Sáu (Thứ 6)">Thứ Sáu (Thứ 6)</option>
                      <option value="Thứ Bảy (Thứ 7)">Thứ Bảy (Thứ 7)</option>
                      <option value="Chủ Nhật (CN)">Chủ Nhật (CN)</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-black text-slate-700 mb-1.5">
                        Bắt đầu *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="08:00"
                        value={scheduleForm.data.start_time}
                        onChange={(e) => scheduleForm.setData('start_time', e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs font-bold text-slate-800 outline-none focus:border-[#004b87] focus:bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-black text-slate-700 mb-1.5">
                        Kết thúc *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="17:00"
                        value={scheduleForm.data.end_time}
                        onChange={(e) => scheduleForm.setData('end_time', e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs font-bold text-slate-800 outline-none focus:border-[#004b87] focus:bg-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-black text-slate-700 mb-1.5">
                      Chi nhánh / Cơ sở
                    </label>
                    <select
                      value={scheduleForm.data.branch}
                      onChange={(e) => scheduleForm.setData('branch', e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs font-bold text-slate-800 outline-none focus:border-[#004b87] focus:bg-white cursor-pointer"
                    >
                      <option value="Hà Nội (Hồ Tây)">Hà Nội (Hồ Tây)</option>
                      <option value="Cơ sở Chính: 123 Nguyễn Đức Cảnh, Hải Phòng">Cơ sở Chính: Hải Phòng</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    disabled={scheduleForm.processing}
                    className="w-full py-3.5 bg-[#b89a67] hover:bg-[#a38553] text-white font-black text-xs uppercase tracking-wider rounded-xl shadow-md transition-all cursor-pointer mt-2"
                  >
                    THÊM CA TRỰC
                  </button>
                </form>
              </div>

              {/* RIGHT BOX: DANH SÁCH LỊCH TRỰC HIỆN TẠI (Col-span 7) */}
              <div className="lg:col-span-7 bg-white p-7 rounded-3xl border border-slate-200/80 shadow-xs min-h-[380px] flex flex-col justify-start">
                <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest border-b border-slate-100 pb-3 mb-6">
                  DANH SÁCH LỊCH TRỰC HIỆN TẠI
                </h3>

                {schedules.length === 0 ? (
                  <div className="flex-1 flex flex-col items-center justify-center text-center p-12 text-slate-400 text-xs space-y-2">
                    <p className="font-semibold">Chưa cấu hình lịch trực cho bác sĩ nào.</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {schedules.map((sch) => (
                      <div key={sch.id} className="p-4 bg-slate-50 border border-slate-200 rounded-2xl flex items-center justify-between gap-4 hover:bg-blue-50/40 transition-all">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full overflow-hidden border border-slate-200 bg-white shrink-0">
                            <img src={sch.doctor?.avatar || '/assets/doctor_khoi.png'} alt={sch.doctor?.name || 'Bác sĩ'} className="w-full h-full object-cover" />
                          </div>
                          <div>
                            <h4 className="font-extrabold text-[#004b87] text-xs">{sch.doctor?.name || 'Bác sĩ chuyên khoa'}</h4>
                            <p className="text-[11px] font-bold text-slate-600 mt-0.5">{sch.day_of_week} • <span className="text-emerald-700">{sch.start_time || '08:00'} - {sch.end_time || '17:00'}</span></p>
                            <span className="text-[10px] text-slate-400 block italic">{sch.branch || sch.room || 'Hà Nội (Hồ Tây)'}</span>
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() => handleDeleteSchedule(sch.id)}
                          className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all cursor-pointer"
                          title="Xóa ca trực"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* TAB CÂU HỎI THƯỜNG GẶP FAQ (CHUẨN HÌNH 2 & 3 MOCKUP) */}
        {activeTab === 'faqs' && (
          <div className="space-y-6 w-full">
            {/* Top Breadcrumb */}
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-400">
              <span className="text-amber-700">🏠</span>
              <span>/</span>
              <span className="text-slate-700 font-bold">Câu hỏi thường gặp FAQ</span>
            </div>

            <div className="bg-white border border-slate-200/80 rounded-3xl p-8 shadow-sm space-y-6 w-full">
              
              {/* Header Action Bar */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <button
                  onClick={handleOpenCreateFaq}
                  className="flex items-center gap-1.5 bg-[#f97316] hover:bg-[#ea580c] text-white font-extrabold text-xs px-5 py-2.5 rounded-xl transition-all cursor-pointer shadow-md uppercase tracking-wider"
                >
                  THÊM MỚI
                </button>

                <div className="relative w-full sm:w-72">
                  <input
                    type="text"
                    placeholder="Tìm kiếm.."
                    value={faqSearchQuery}
                    onChange={(e) => setFaqSearchQuery(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 pl-3 pr-9 text-xs text-slate-800 outline-none focus:border-[#004b87] focus:bg-white"
                  />
                  <Search size={14} className="absolute right-3 top-2.5 text-slate-400" />
                </div>
              </div>

              {/* BATCH ACTION BAR FOR FAQS */}
              {selectedFaqIds.length > 0 && (
                <div className="bg-[#004b87] text-white p-4 rounded-2xl shadow-xl flex flex-wrap items-center justify-between gap-3 animate-fade-in text-xs font-bold border border-blue-800">
                  <div className="flex items-center gap-2">
                    <span className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center font-mono text-xs">
                      {selectedFaqIds.length}
                    </span>
                    <span>Đã chọn {selectedFaqIds.length} câu hỏi FAQ</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button type="button" onClick={() => handleBatchFaqAction('show')} className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl shadow-xs cursor-pointer flex items-center gap-1"><CheckCircle2 size={13} /> Bật Hiển Thị</button>
                    <button type="button" onClick={() => handleBatchFaqAction('hide')} className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-xl shadow-xs cursor-pointer flex items-center gap-1"><AlertCircle size={13} /> Tạm Ẩn</button>
                    <button type="button" onClick={() => handleBatchFaqAction('delete')} className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl shadow-xs cursor-pointer flex items-center gap-1"><Trash2 size={13} /> Xóa Hàng Loạt</button>
                  </div>
                </div>
              )}

              {/* FAQs Table View */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-700 border-collapse">
                  <thead className="bg-slate-50/80 text-slate-400 uppercase font-extrabold tracking-wider border-b border-slate-200">
                    <tr>
                      <th className="p-4 w-10 text-center">
                        <input
                          type="checkbox"
                          checked={
                            selectedFaqIds.length > 0 &&
                            selectedFaqIds.length === faqs.filter(f => f.question.toLowerCase().includes(faqSearchQuery.toLowerCase())).length
                          }
                          onChange={(e) => {
                            const visibleFaqs = faqs.filter(f => f.question.toLowerCase().includes(faqSearchQuery.toLowerCase()));
                            setSelectedFaqIds(e.target.checked ? visibleFaqs.map(f => f.id) : []);
                          }}
                          className="w-4 h-4 rounded text-[#004b87] focus:ring-[#004b87] cursor-pointer"
                        />
                      </th>
                      <th className="p-4 w-12 text-center">ID</th>
                      <th className="p-4 w-1/3">CÂU HỎI</th>
                      <th className="p-4">CÂU TRẢ LỜI</th>
                      <th className="p-4 w-20 text-center">THỨ TỰ</th>
                      <th className="p-4 text-center w-28">TRẠNG THÁI</th>
                      <th className="p-4 text-center w-28">THAO TÁC</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {faqs
                      .filter(f => f.question.toLowerCase().includes(faqSearchQuery.toLowerCase()) || f.answer.toLowerCase().includes(faqSearchQuery.toLowerCase()))
                      .map((faq) => (
                        <tr key={faq.id} className={`hover:bg-slate-50/70 transition-colors ${selectedFaqIds.includes(faq.id) ? 'bg-blue-50/40' : ''}`}>
                          <td className="p-4 text-center">
                            <input
                              type="checkbox"
                              checked={selectedFaqIds.includes(faq.id)}
                              onChange={() => {
                                setSelectedFaqIds(prev =>
                                  prev.includes(faq.id) ? prev.filter(i => i !== faq.id) : [...prev, faq.id]
                                );
                              }}
                              className="w-4 h-4 rounded text-[#004b87] focus:ring-[#004b87] cursor-pointer"
                            />
                          </td>

                          <td className="p-4 text-center font-bold text-slate-500 font-mono">
                            {faq.id}
                          </td>

                          <td className="p-4 font-black text-slate-800 uppercase tracking-tight text-xs leading-snug">
                            {faq.question}
                          </td>

                          <td className="p-4 text-slate-500 text-xs leading-relaxed line-clamp-3">
                            {faq.answer}
                          </td>

                          <td className="p-4 text-center font-bold text-slate-600 font-mono">
                            {faq.order || 0}
                          </td>

                          <td className="p-4 text-center">
                            <button
                              type="button"
                              onClick={() => handleToggleFaqStatus(faq)}
                              className={`px-2.5 py-1 rounded text-[10px] font-extrabold uppercase transition-all cursor-pointer ${
                                faq.is_active !== false
                                  ? 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200'
                                  : 'bg-rose-100 text-rose-700 hover:bg-rose-200'
                              }`}
                            >
                              {faq.is_active !== false ? 'HIỂN THỊ' : 'TẠM ẨN'}
                            </button>
                          </td>

                          <td className="p-4 text-center">
                            <div className="flex items-center justify-center gap-1.5">
                              <button
                                type="button"
                                onClick={() => handleOpenEditFaq(faq)}
                                className="p-1.5 text-slate-400 hover:text-[#004b87] hover:bg-blue-50 rounded-lg transition-all cursor-pointer"
                                title="Sửa câu hỏi FAQ"
                              >
                                <Edit size={14} />
                              </button>
                              <button
                                type="button"
                                onClick={() => handleDeleteFaq(faq.id)}
                                className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all cursor-pointer"
                                title="Xóa câu hỏi FAQ"
                              >
                                <Trash2 size={14} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    }
                  </tbody>
                </table>
              </div>

            </div>
          </div>
        )}

        {/* TAB QUẢN LÝ GIỚI THIỆU & TRIẾT LÝ (CHUẨN 100% SCREENSHOT 1 & 2 MOCKUP) */}
        {activeTab === 'about' && (
          <form onSubmit={handleSaveSettings} className="space-y-8 w-full pb-12">
            
            {/* Header Title */}
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-extrabold text-[#004b87]">Quản Lý Trang Giới Thiệu & Triết Lý</h2>
            </div>

            {/* 1. KHỐI GIỚI THIỆU CHÍNH (GIỚI THIỆU & TRIẾT LÝ) */}
            <div className="bg-white p-8 rounded-3xl border border-slate-200/80 shadow-xs space-y-6">
              <h3 className="text-xs font-black text-[#b89a67] uppercase tracking-widest border-b border-slate-100 pb-3">
                1. KHỐI GIỚI THIỆU CHÍNH (GIỚI THIỆU & TRIẾT LÝ)
              </h3>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                {/* LEFT 8 COLUMNS */}
                <div className="lg:col-span-8 space-y-4 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-black text-slate-700 uppercase tracking-wider mb-1.5">
                        NHÃN PHỤ GIỚI THIỆU (EYEBROW)
                      </label>
                      <input
                        type="text"
                        value={settingsData.about_eyebrow || 'Về Chúng Tôi'}
                        onChange={(e) => setSettingsData({ ...settingsData, about_eyebrow: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-xs text-slate-800 outline-none focus:border-[#004b87] focus:bg-white font-bold"
                      />
                    </div>

                    <div>
                      <label className="block font-black text-slate-700 uppercase tracking-wider mb-1.5">
                        TIÊU ĐỀ CHÍNH (TITLE)
                      </label>
                      <input
                        type="text"
                        value={settingsData.about_title || 'MEDIPLUS HP MEDICAL CENTRE'}
                        onChange={(e) => setSettingsData({ ...settingsData, about_title: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-xs text-slate-800 outline-none focus:border-[#004b87] focus:bg-white font-black"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-black text-slate-700 uppercase tracking-wider mb-1.5">
                      ĐOẠN MÔ TẢ GIỚI THIỆU 1
                    </label>
                    <textarea
                      rows={3}
                      value={settingsData.about_desc1 || ''}
                      onChange={(e) => setSettingsData({ ...settingsData, about_desc1: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-xs text-slate-800 outline-none focus:border-[#004b87] focus:bg-white leading-relaxed resize-none"
                    />
                  </div>

                  <div>
                    <label className="block font-black text-slate-700 uppercase tracking-wider mb-1.5">
                      ĐOẠN MÔ TẢ GIỚI THIỆU 2
                    </label>
                    <textarea
                      rows={3}
                      value={settingsData.about_desc2 || ''}
                      onChange={(e) => setSettingsData({ ...settingsData, about_desc2: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-xs text-slate-800 outline-none focus:border-[#004b87] focus:bg-white leading-relaxed resize-none"
                    />
                  </div>
                </div>

                {/* RIGHT 4 COLUMNS: ẢNH ĐẠI DIỆN PHẦN GIỚI THIỆU */}
                <div className="lg:col-span-4 space-y-2 text-xs">
                  <label className="block font-black text-slate-700 uppercase tracking-wider mb-1.5">
                    ẢNH ĐẠI DIỆN PHẦN GIỚI THIỆU (ẢNH LỚN TRANG CHỦ)
                  </label>

                  <div className="relative rounded-2xl overflow-hidden border border-slate-200 bg-slate-900 h-64 group shadow-sm flex items-center justify-center">
                    <img
                      src={settingsData.about_main_image || '/assets/about_banner.jpg'}
                      alt="About main"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                    
                    {/* Delete overlay button */}
                    <button
                      type="button"
                      onClick={() => setSettingsData({ ...settingsData, about_main_image: '' })}
                      className="absolute top-3 right-3 p-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl shadow-md cursor-pointer transition-all"
                      title="Xóa ảnh"
                    >
                      <Trash2 size={16} />
                    </button>

                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                      <button
                        type="button"
                        onClick={() => handleOpenMediaPicker('about_main_image')}
                        className="px-4 py-2 bg-white/95 text-slate-800 font-extrabold rounded-xl text-xs shadow-lg cursor-pointer hover:bg-white transition-all flex items-center gap-1.5"
                      >
                        <FolderOpen size={13} className="text-slate-800 fill-slate-200" /> Chọn Ảnh Từ Thư Viện
                      </button>
                    </div>
                  </div>
                </div>

              </div>

              {/* STATS ROW */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-6 border-t border-slate-100 text-xs">
                <div>
                  <label className="block font-black text-slate-700 uppercase tracking-wider mb-1.5">
                    ĐẾM SỐ LƯỢNG BÁC SĨ
                  </label>
                  <select
                    value={settingsData.about_doctor_count_type || 'auto'}
                    onChange={(e) => setSettingsData({ ...settingsData, about_doctor_count_type: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs font-bold text-slate-800 outline-none focus:border-[#004b87] cursor-pointer"
                  >
                    <option value="auto">Tự động (Đếm theo số lượng bác sĩ thực tế: {doctors.length})</option>
                    <option value="manual">Nhập thủ công</option>
                  </select>
                </div>

                <div>
                  <label className="block font-black text-slate-700 uppercase tracking-wider mb-1.5">
                    ĐẾM SỐ LƯỢNG KHÁCH HÀNG
                  </label>
                  <select
                    value={settingsData.about_customer_count_type || 'auto'}
                    onChange={(e) => setSettingsData({ ...settingsData, about_customer_count_type: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs font-bold text-slate-800 outline-none focus:border-[#004b87] cursor-pointer"
                  >
                    <option value="auto">Tự động CRM (Cơ sở + Số lượng khách đã liên hệ)</option>
                    <option value="manual">Nhập thủ công</option>
                  </select>
                </div>

                <div>
                  <label className="block font-black text-slate-700 uppercase tracking-wider mb-1.5">
                    SỐ CƠ SỞ (BASE)
                  </label>
                  <input
                    type="number"
                    value={settingsData.about_customer_base || '10000'}
                    onChange={(e) => setSettingsData({ ...settingsData, about_customer_base: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-800 outline-none focus:border-[#004b87] font-bold"
                  />
                </div>

                <div>
                  <label className="block font-black text-slate-700 uppercase tracking-wider mb-1.5">
                    ĐÃ LIÊN HỆ (CRM)
                  </label>
                  <input
                    type="text"
                    value={settingsData.about_customer_crm || '+1'}
                    onChange={(e) => setSettingsData({ ...settingsData, about_customer_crm: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-800 outline-none focus:border-[#004b87] font-bold"
                  />
                </div>
              </div>

            </div>

            {/* 2. CÂU CHUYỆN NHÀ SÁNG LẬP (FOUNDER STORY) */}
            <div className="bg-white p-8 rounded-3xl border border-slate-200/80 shadow-xs space-y-6">
              <h3 className="text-xs font-black text-[#b89a67] uppercase tracking-widest border-b border-slate-100 pb-3">
                2. CÂU CHUYỆN NHÀ SÁNG LẬP (FOUNDER STORY)
              </h3>

              <div className="space-y-4 text-xs">
                <div>
                  <label className="block font-black text-slate-700 uppercase tracking-wider mb-1.5">
                    TIÊU ĐỀ CÂU CHUYỆN
                  </label>
                  <input
                    type="text"
                    value={settingsData.about_founder_title || 'Triết Lý Làm Đẹp Chuẩn Y Khoa & Vẻ Đẹp Độc Bản'}
                    onChange={(e) => setSettingsData({ ...settingsData, about_founder_title: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-xs text-slate-800 outline-none focus:border-[#004b87] font-extrabold"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-black text-slate-700 uppercase tracking-wider mb-1.5">
                      ĐOẠN MÔ TẢ CÂU CHUYỆN 1
                    </label>
                    <textarea
                      rows={4}
                      value={settingsData.about_founder_desc1 || ''}
                      onChange={(e) => setSettingsData({ ...settingsData, about_founder_desc1: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-xs text-slate-800 outline-none focus:border-[#004b87] leading-relaxed resize-none"
                    />
                  </div>

                  <div>
                    <label className="block font-black text-slate-700 uppercase tracking-wider mb-1.5">
                      ĐOẠN MÔ TẢ CÂU CHUYỆN 2
                    </label>
                    <textarea
                      rows={4}
                      value={settingsData.about_founder_desc2 || ''}
                      onChange={(e) => setSettingsData({ ...settingsData, about_founder_desc2: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-xs text-slate-800 outline-none focus:border-[#004b87] leading-relaxed resize-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-black text-slate-700 uppercase tracking-wider mb-1.5">
                      CÂU TRÍCH DẪN (QUOTE)
                    </label>
                    <input
                      type="text"
                      value={settingsData.about_founder_quote || ''}
                      onChange={(e) => setSettingsData({ ...settingsData, about_founder_quote: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-xs text-slate-800 outline-none focus:border-[#004b87] italic"
                    />
                  </div>

                  <div>
                    <label className="block font-black text-slate-700 uppercase tracking-wider mb-1.5">
                      NGƯỜI TRÍCH DẪN (TÁC GIẢ)
                    </label>
                    <input
                      type="text"
                      value={settingsData.about_founder_author || 'BSCKII Đoàn Khôi'}
                      onChange={(e) => setSettingsData({ ...settingsData, about_founder_author: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-xs text-slate-800 outline-none focus:border-[#004b87] font-bold"
                    />
                  </div>
                </div>

                {/* BỘ BA HÌNH ÁNH CÂU CHUYỆN */}
                <div className="space-y-2 pt-2">
                  <label className="block font-black text-slate-700 uppercase tracking-wider mb-1">
                    BỘ BA HÌNH ÁNH CÂU CHUYỆN
                  </label>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    
                    {/* IMAGE 1 */}
                    <div className="space-y-1">
                      <span className="text-[10px] font-bold text-slate-400 block uppercase">ẢNH 1: HỘI THẢO (DỌC/NGANG NHỎ)</span>
                      <div className="relative rounded-2xl overflow-hidden border border-slate-200 bg-slate-900 h-44 group shadow-sm flex items-center justify-center">
                        <img
                          src={settingsData.about_story_img1 || '/assets/screening_service.png'}
                          alt="Story 1"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        />
                        <button
                          type="button"
                          onClick={() => setSettingsData({ ...settingsData, about_story_img1: '' })}
                          className="absolute top-2 right-2 p-1.5 bg-rose-600 text-white rounded-lg cursor-pointer"
                        >
                          <Trash2 size={14} />
                        </button>
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                          <button
                            type="button"
                            onClick={() => handleOpenMediaPicker('about_story_img1')}
                            className="px-3 py-1.5 bg-white text-slate-800 font-bold rounded-lg text-xs cursor-pointer flex items-center gap-1"
                          >
                            <FolderOpen size={11} className="text-slate-700 fill-slate-100" /> Đổi ảnh 1
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* IMAGE 2 */}
                    <div className="space-y-1">
                      <span className="text-[10px] font-bold text-slate-400 block uppercase">ẢNH 2: NHỎ/CHỨNG NHẬN</span>
                      <div className="relative rounded-2xl overflow-hidden border border-slate-200 bg-slate-900 h-44 group shadow-sm flex items-center justify-center">
                        <img
                          src={settingsData.about_story_img2 || '/assets/telehealth_service.png'}
                          alt="Story 2"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        />
                        <button
                          type="button"
                          onClick={() => setSettingsData({ ...settingsData, about_story_img2: '' })}
                          className="absolute top-2 right-2 p-1.5 bg-rose-600 text-white rounded-lg cursor-pointer"
                        >
                          <Trash2 size={14} />
                        </button>
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                          <button
                            type="button"
                            onClick={() => handleOpenMediaPicker('about_story_img2')}
                            className="px-3 py-1.5 bg-white text-slate-800 font-bold rounded-lg text-xs cursor-pointer flex items-center gap-1"
                          >
                            <FolderOpen size={11} className="text-slate-700 fill-slate-100" /> Đổi ảnh 2
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* IMAGE 3 */}
                    <div className="space-y-1">
                      <span className="text-[10px] font-bold text-slate-400 block uppercase">ẢNH 3: TOÀN CẢNH (NGANG TO)</span>
                      <div className="relative rounded-2xl overflow-hidden border border-slate-200 bg-slate-900 h-44 group shadow-sm flex items-center justify-center">
                        <img
                          src={settingsData.about_story_img3 || '/assets/heart_care.png'}
                          alt="Story 3"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        />
                        <button
                          type="button"
                          onClick={() => setSettingsData({ ...settingsData, about_story_img3: '' })}
                          className="absolute top-2 right-2 p-1.5 bg-rose-600 text-white rounded-lg cursor-pointer"
                        >
                          <Trash2 size={14} />
                        </button>
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                          <button
                            type="button"
                            onClick={() => handleOpenMediaPicker('about_story_img3')}
                            className="px-3 py-1.5 bg-white text-slate-800 font-bold rounded-lg text-xs cursor-pointer flex items-center gap-1"
                          >
                            <FolderOpen size={11} className="text-slate-700 fill-slate-100" /> Đổi ảnh 3
                          </button>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>

              </div>

            </div>

            {/* SAVE BUTTON */}
            <div className="flex justify-end pt-2">
              <button
                type="submit"
                className="px-8 py-3.5 bg-[#b89a67] hover:bg-[#a38553] text-white font-extrabold text-xs uppercase tracking-wider rounded-xl shadow-lg cursor-pointer transition-all flex items-center gap-2"
              >
                <Save size={16} /> Lưu Cấu Hình Trang Giới Thiệu
              </button>
            </div>

          </form>
        )}

        {/* TAB QUẢN LÝ NỘI DUNG TRANG CHÍNH SÁCH (CHUẨN SCREENSHOT 1) */}
        {activeTab === 'policies' && (
          <div className="space-y-6 w-full pb-12">
            <h2 className="text-xl font-extrabold text-[#004b87]">Quản Lý Nội Dung Trang Chính Sách</h2>

            {/* Sub-tabs horizontal Bar */}
            <div className="flex items-center gap-2 border-b border-slate-200 pb-2 overflow-x-auto text-xs font-bold">
              {[
                { key: 'terms', label: '1. Điều khoản sử dụng' },
                { key: 'privacy', label: '2. Chính sách bảo mật' },
                { key: 'payment', label: '3. Chính sách thanh toán' },
                { key: 'refund', label: '4. Chính sách hoàn tiền' },
                { key: 'disclaimer', label: '5. Miễn trừ trách nhiệm' },
              ].map(subTab => (
                <button
                  key={subTab.key}
                  type="button"
                  onClick={() => setActivePolicyTab(subTab.key as any)}
                  className={`px-5 py-2.5 rounded-xl cursor-pointer transition-all whitespace-nowrap ${
                    activePolicyTab === subTab.key
                      ? 'bg-amber-100/70 text-amber-900 border border-amber-300 font-extrabold shadow-xs'
                      : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  {subTab.label}
                </button>
              ))}
            </div>

            {/* Main Policy Box */}
            <div className="bg-white border border-slate-200/80 rounded-3xl p-8 shadow-xs space-y-5">
              <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest border-b border-slate-100 pb-3">
                NỘI DUNG {
                  activePolicyTab === 'terms' ? 'ĐIỀU KHỎAN SỬ DỤNG' :
                  activePolicyTab === 'privacy' ? 'CHÍNH SÁCH BẢO MẬT' :
                  activePolicyTab === 'payment' ? 'CHÍNH SÁCH THANH TOÁN' :
                  activePolicyTab === 'refund' ? 'CHÍNH SÁCH HOÀN TIỀN' : 'MIỄN TRỪ TRÁCH NHIỆM'
                }
              </h3>

              {/* RICH TEXT EDITOR TOOLBAR */}
              <div className="border border-slate-200 rounded-2xl overflow-hidden bg-slate-50">
                <div className="flex flex-wrap items-center gap-1 p-2 bg-white border-b border-slate-200 text-xs">
                  <button type="button" onClick={() => handleFormatPolicy('bold')} className="p-2 hover:bg-slate-100 rounded-lg font-black text-slate-800" title="In đậm (Bold)">B</button>
                  <button type="button" onClick={() => handleFormatPolicy('italic')} className="p-2 hover:bg-slate-100 rounded-lg italic font-serif text-slate-800" title="In nghiêng (Italic)">I</button>
                  <button type="button" onClick={() => handleFormatPolicy('underline')} className="p-2 hover:bg-slate-100 rounded-lg underline text-slate-800" title="Gạch chân (Underline)">U</button>
                  <button type="button" onClick={() => handleFormatPolicy('strikeThrough')} className="p-2 hover:bg-slate-100 rounded-lg line-through text-slate-800" title="Gạch ngang (Strikethrough)">S</button>
                  <div className="w-px h-5 bg-slate-200 mx-1" />
                  <button type="button" onClick={() => handleFormatPolicy('createLink')} className="p-2 hover:bg-slate-100 rounded-lg text-slate-700" title="Chèn liên kết (Link)"><Link2 size={14} /></button>
                  <button type="button" onClick={() => handleFormatPolicy('insertImage')} className="p-2 hover:bg-slate-100 rounded-lg text-slate-700" title="Chèn ảnh từ Thư viện"><ImageIcon size={14} /></button>
                  <div className="w-px h-5 bg-slate-200 mx-1" />
                  <button type="button" onClick={() => handleFormatPolicy('formatBlock', '<h2>')} className="px-2.5 py-1 hover:bg-slate-100 rounded-lg font-black text-slate-800 text-[11px]" title="Tiêu đề H2">H2</button>
                  <button type="button" onClick={() => handleFormatPolicy('formatBlock', '<h3>')} className="px-2.5 py-1 hover:bg-slate-100 rounded-lg font-bold text-slate-800 text-[11px]" title="Tiêu đề H3">H3</button>
                  <button type="button" onClick={() => handleFormatPolicy('formatBlock', '<p>')} className="px-2.5 py-1 hover:bg-slate-100 rounded-lg text-slate-700 text-[11px]" title="Đoạn văn P">P</button>
                  <div className="w-px h-5 bg-slate-200 mx-1" />
                  <button type="button" onClick={() => handleFormatPolicy('justifyLeft')} className="p-2 hover:bg-slate-100 rounded-lg text-slate-700" title="Căn trái"><AlignLeft size={14} /></button>
                  <button type="button" onClick={() => handleFormatPolicy('justifyCenter')} className="p-2 hover:bg-slate-100 rounded-lg text-slate-700" title="Căn giữa"><AlignCenter size={14} /></button>
                  <button type="button" onClick={() => handleFormatPolicy('justifyRight')} className="p-2 hover:bg-slate-100 rounded-lg text-slate-700" title="Căn phải"><AlignRight size={14} /></button>
                  <div className="w-px h-5 bg-slate-200 mx-1" />
                  <button type="button" onClick={() => handleFormatPolicy('insertUnorderedList')} className="p-2 hover:bg-slate-100 rounded-lg text-slate-700" title="Danh sách chấm"><List size={14} /></button>
                  <button type="button" onClick={() => handleFormatPolicy('insertOrderedList')} className="p-2 hover:bg-slate-100 rounded-lg text-slate-700" title="Danh sách số"><ListOrdered size={14} /></button>
                  <div className="w-px h-5 bg-slate-200 mx-1" />
                  <button type="button" onClick={() => handleFormatPolicy('undo')} className="p-2 hover:bg-slate-100 rounded-lg text-slate-700" title="Hoàn tác"><Undo size={14} /></button>
                  <button type="button" onClick={() => handleFormatPolicy('redo')} className="p-2 hover:bg-slate-100 rounded-lg text-slate-700" title="Làm lại"><Redo size={14} /></button>
                </div>

                {/* CONTENT EDITABLE AREA */}
                <div
                  ref={policyEditorRef}
                  contentEditable
                  suppressContentEditableWarning
                  onInput={() => {
                    if (policyEditorRef.current) {
                      setPolicyContent(policyEditorRef.current.innerHTML);
                    }
                  }}
                  dangerouslySetInnerHTML={{ __html: policyContent }}
                  className="p-6 min-h-[350px] outline-none text-xs text-slate-800 leading-relaxed bg-white prose max-w-none"
                />
              </div>

            </div>

            {/* SAVE BUTTON */}
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => {
                  const key = `policy_${activePolicyTab}`;
                  setSettingsData(prev => ({ ...prev, [key]: policyContent }));
                  router.post('/admin/settings', { settings: { ...settingsData, [key]: policyContent } }, {
                    onSuccess: () => triggerNotification('Đã lưu nội dung chính sách thành công!')
                  });
                }}
                className="px-8 py-3.5 bg-[#b89a67] hover:bg-[#a38553] text-white font-extrabold text-xs uppercase tracking-wider rounded-xl shadow-lg cursor-pointer transition-all flex items-center gap-2"
              >
                <Save size={16} /> Lưu Thay Đổi Chính Sách
              </button>
            </div>
          </div>
        )}

        {/* TAB CẤU HÌNH THÔNG TIN HỆ THỐNG (CHUẨN SCREENSHOT 2 - WHITE & BLUE LOGO CARDS) */}
        {activeTab === 'settings' && (
          <form onSubmit={handleSaveSettings} className="space-y-6 w-full pb-12">
            <h2 className="text-xl font-extrabold text-[#004b87]">Cấu Hình Thông Tin Hệ Thống</h2>

            <div className="bg-white border border-slate-200/80 rounded-3xl p-8 shadow-xs space-y-6 text-xs">
              
              {/* CLINIC NAME */}
              <div>
                <label className="block font-black text-slate-700 uppercase tracking-wider mb-1.5">
                  TÊN PHÒNG KHÁM / TRUNG TÂM TIM MẠCH
                </label>
                <input
                  type="text"
                  value={settingsData.clinic_name || ''}
                  onChange={(e) => setSettingsData({ ...settingsData, clinic_name: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-xs text-slate-800 outline-none focus:border-[#004b87] focus:bg-white font-bold"
                />
              </div>

              {/* CONTACT INFO */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block font-black text-slate-700 uppercase tracking-wider mb-1.5">
                    SỐ ĐIỆN THOẠI HOTLINE CHÍNH
                  </label>
                  <input
                    type="text"
                    value={settingsData.hotline_1 || ''}
                    onChange={(e) => {
                      const val = e.target.value;
                      setSettingsData({ 
                        ...settingsData, 
                        hotline_1: val,
                        hotline_1_clean: val.replace(/\s+/g, '') 
                      });
                    }}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-xs text-slate-800 outline-none focus:border-[#004b87] focus:bg-white font-bold font-mono"
                  />
                </div>

                <div>
                  <label className="block font-black text-slate-700 uppercase tracking-wider mb-1.5">
                    SỐ ĐIỆN THOẠI HOTLINE PHỤ
                  </label>
                  <input
                    type="text"
                    value={settingsData.hotline_2 || ''}
                    onChange={(e) => {
                      const val = e.target.value;
                      setSettingsData({ 
                        ...settingsData, 
                        hotline_2: val,
                        hotline_2_clean: val.replace(/\s+/g, '') 
                      });
                    }}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-xs text-slate-800 outline-none focus:border-[#004b87] focus:bg-white font-bold font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block font-black text-slate-700 uppercase tracking-wider mb-1.5">
                    EMAIL LIÊN HỆ
                  </label>
                  <input
                    type="email"
                    value={settingsData.email || ''}
                    onChange={(e) => setSettingsData({ ...settingsData, email: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-xs text-slate-800 outline-none focus:border-[#004b87] focus:bg-white font-bold"
                  />
                </div>

                <div>
                  <label className="block font-black text-slate-700 uppercase tracking-wider mb-1.5">
                    GIỜ LÀM VIỆC CHI TIẾT
                  </label>
                  <input
                    type="text"
                    value={settingsData.working_hours || ''}
                    onChange={(e) => setSettingsData({ ...settingsData, working_hours: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-xs text-slate-800 outline-none focus:border-[#004b87] focus:bg-white font-bold"
                  />
                </div>
              </div>

              <div>
                <label className="block font-black text-slate-700 uppercase tracking-wider mb-1.5">
                  ĐỊA CHỈ PHÒNG KHÁM
                </label>
                <input
                  type="text"
                  value={settingsData.address || ''}
                  onChange={(e) => setSettingsData({ ...settingsData, address: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-xs text-slate-800 outline-none focus:border-[#004b87] focus:bg-white font-bold"
                />
              </div>

              {/* LOGO THƯƠNG HIỆU (WHITE & BLUE CARDS ONLY) */}
              <div className="space-y-3 pt-4 border-t border-slate-100">
                <h3 className="font-black text-slate-700 uppercase tracking-wider">LOGO THƯƠNG HIỆU</h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  
                  {/* LOGO 1: DARK LOGO (FOR LIGHT/WHITE BG) */}
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-slate-400 block uppercase">
                      LOGO TỐI MÀU (DÙNG CHO NỀN SÁNG/TRẮNG)
                    </span>
                    <div className="h-36 rounded-2xl border border-slate-200 bg-slate-50 hover:bg-slate-100/80 transition-colors p-4 flex flex-col items-center justify-center text-center cursor-pointer group relative overflow-hidden"
                         onClick={() => handleOpenMediaPicker('logo_dark')}>
                      {settingsData.logo_dark ? (
                        <img src={settingsData.logo_dark} alt="Logo tối" className="max-h-20 object-contain" />
                      ) : (
                        <div className="flex flex-col items-center gap-2 text-slate-400 group-hover:text-[#004b87]">
                          <ImageIcon size={24} />
                          <span className="text-xs font-bold">Chọn logo từ thư viện</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* LOGO 2: LIGHT LOGO (FOR DARK BG - WHITE & BLUE THEMED CARD) */}
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-slate-400 block uppercase">
                      LOGO SÁNG MÀU (DÙNG CHO NỀN TỐI/TRONG SUỐT)
                    </span>
                    <div className="h-36 rounded-2xl border border-blue-200 bg-blue-50/60 hover:bg-blue-100/60 transition-colors p-4 flex flex-col items-center justify-center text-center cursor-pointer group relative overflow-hidden"
                         onClick={() => handleOpenMediaPicker('logo_light')}>
                      {settingsData.logo_light ? (
                        <img src={settingsData.logo_light} alt="Logo sáng" className="max-h-20 object-contain" />
                      ) : (
                        <div className="flex flex-col items-center gap-2 text-blue-600 group-hover:text-[#004b87]">
                          <ImageIcon size={24} />
                          <span className="text-xs font-bold">Chọn logo từ thư viện</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* LOGO 3: FAVICON / SQUARE LOGO */}
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-slate-400 block uppercase">
                      LOGO VUÔNG (FAVICON / ICON ĐẠI DIỆN)
                    </span>
                    <div className="h-36 rounded-2xl border border-slate-200 bg-slate-50 hover:bg-slate-100/80 transition-colors p-4 flex flex-col items-center justify-center text-center cursor-pointer group relative overflow-hidden"
                         onClick={() => handleOpenMediaPicker('logo_favicon')}>
                      {settingsData.logo_favicon ? (
                        <img src={settingsData.logo_favicon} alt="Favicon" className="max-h-16 object-contain" />
                      ) : (
                        <div className="flex flex-col items-center gap-2 text-slate-400 group-hover:text-[#004b87]">
                          <ImageIcon size={24} />
                          <span className="text-xs font-bold">Chọn logo từ thư viện</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* LOGO 4: SQUARE LIGHT LOGO (WHITE & BLUE THEMED CARD) */}
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-slate-400 block uppercase">
                      LOGO VUÔNG SÁNG MÀU (DÙNG CHO NỀN TỐI)
                    </span>
                    <div className="h-36 rounded-2xl border border-blue-200 bg-blue-50/60 hover:bg-blue-100/60 transition-colors p-4 flex flex-col items-center justify-center text-center cursor-pointer group relative overflow-hidden"
                         onClick={() => handleOpenMediaPicker('logo_favicon_light')}>
                      {settingsData.logo_favicon_light ? (
                        <img src={settingsData.logo_favicon_light} alt="Favicon sáng" className="max-h-16 object-contain" />
                      ) : (
                        <div className="flex flex-col items-center gap-2 text-blue-600 group-hover:text-[#004b87]">
                          <ImageIcon size={24} />
                          <span className="text-xs font-bold">Chọn logo từ thư viện</span>
                        </div>
                      )}
                    </div>
                  </div>

                </div>
              </div>

              {/* SOCIAL LINKS */}
              <div className="space-y-3 pt-4 border-t border-slate-100">
                <h3 className="font-black text-slate-700 uppercase tracking-wider">MẠNG XÃ HỘI & HỖ TRỢ TRỰC TUYẾN</h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block font-bold text-slate-600 mb-1">ĐƯỜNG DẪN FACEBOOK</label>
                    <input
                      type="text"
                      value={settingsData.social_facebook || ''}
                      onChange={(e) => setSettingsData({ ...settingsData, social_facebook: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-800 outline-none focus:border-[#004b87]"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-600 mb-1">ĐƯỜNG DẪN ZALO</label>
                    <input
                      type="text"
                      value={settingsData.zalo_link || ''}
                      onChange={(e) => setSettingsData({ ...settingsData, zalo_link: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-800 outline-none focus:border-[#004b87]"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-600 mb-1">KÊNH YOUTUBE</label>
                    <input
                      type="text"
                      value={settingsData.social_youtube || ''}
                      onChange={(e) => setSettingsData({ ...settingsData, social_youtube: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-800 outline-none focus:border-[#004b87]"
                    />
                  </div>
                </div>
              </div>

            </div>

            {/* SAVE BUTTON */}
            <div className="flex justify-end">
              <button
                type="submit"
                className="px-8 py-3.5 bg-[#b89a67] hover:bg-[#a38553] text-white font-extrabold text-xs uppercase tracking-wider rounded-xl shadow-lg cursor-pointer transition-all flex items-center gap-2"
              >
                <Save size={16} /> Lưu Cấu Hình
              </button>
            </div>
          </form>
        )}

        {/* TAB QUẢN LÝ TỆP (GIAO DIỆN CHUẨN ĐỒNG BỘ 100% SANG TRỌNG, GỌN GÀNG, TỐI ƯU BỐ CỤC) */}
        {activeTab === 'media' && (
          <div className="space-y-6 w-full pb-12">
            
            {/* UNIFIED TOP BAR HEADER */}
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs">
              <div>
                <h2 className="text-xl font-extrabold text-[#004b87]">Quản lý tệp</h2>
                <p className="text-xs text-slate-500 mt-0.5">Quản lý kho tài nguyên hình ảnh hệ thống dùng chung cho bài viết, dịch vụ, bác sĩ & banner</p>
              </div>

              <div className="flex flex-wrap items-center gap-2.5 w-full lg:w-auto">
                {/* Search Bar */}
                <div className="relative flex-1 sm:w-52">
                  <Search size={14} className="absolute left-3 top-2.5 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Nhập tên tệp..."
                    value={mediaSearchQuery}
                    onChange={(e) => setMediaSearchQuery(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 pl-8 pr-3 text-xs text-slate-800 outline-none focus:border-[#004b87] focus:bg-white"
                  />
                </div>

                {/* Create Folder Button */}
                <button
                  type="button"
                  onClick={() => {
                    const currentFolderName = currentFolderPath === 'root' ? 'File Manager' : currentFolderPath.split('/').pop();
                    const name = prompt(
                      currentFolderPath === 'root'
                        ? 'Nhập tên thư mục mới:'
                        : `Nhập tên thư mục con cho "${currentFolderName}":`
                    );
                    if (name && name.trim()) {
                      const cleanName = name.trim().toLowerCase().replace(/\s+/g, '-');
                      const newFolderPath = currentFolderPath === 'root'
                        ? cleanName
                        : `${currentFolderPath}/${cleanName}`;
                      if (!folders.includes(newFolderPath)) {
                        setFolders(prev => [...prev, newFolderPath]);
                        triggerNotification(`Đã tạo thư mục con "${cleanName}" trong "${currentFolderName}"!`);
                      } else {
                        triggerNotification(`Thư mục "${cleanName}" đã tồn tại!`);
                      }
                    }
                  }}
                  className="px-4 py-2 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 font-extrabold text-xs rounded-xl shadow-2xs cursor-pointer transition-all uppercase tracking-wider flex items-center gap-1.5"
                >
                  <Plus size={14} /> TẠO THƯ MỤC
                </button>

                {/* Select All / Deselect All Button */}
                <button
                  type="button"
                  onClick={() => {
                    if (selectedMediaIds.length === mediaFiles.length && mediaFiles.length > 0) {
                      setSelectedMediaIds([]);
                    } else {
                      setSelectedMediaIds(mediaFiles.map(m => m.id));
                    }
                  }}
                  className="px-4 py-2 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 font-extrabold text-xs rounded-xl shadow-2xs cursor-pointer transition-all uppercase tracking-wider"
                >
                  {selectedMediaIds.length === mediaFiles.length && mediaFiles.length > 0 ? 'BỎ CHỌN TẤT CẢ' : 'CHỌN TẤT CẢ'}
                </button>

                {/* Batch Delete Button if selected */}
                {selectedMediaIds.length > 0 && (
                  <button
                    type="button"
                    onClick={() => {
                      if (confirm(`Bạn có chắc chắn muốn xóa ${selectedMediaIds.length} tệp đã chọn?`)) {
                        router.post('/admin/media/batch-delete', { ids: selectedMediaIds }, {
                          onSuccess: () => {
                            setSelectedMediaIds([]);
                            triggerNotification('Đã xóa hàng loạt tệp!');
                          }
                        });
                      }
                    }}
                    className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white font-extrabold text-xs rounded-xl shadow-xs cursor-pointer transition-all uppercase tracking-wider flex items-center gap-1.5"
                  >
                    <Trash2 size={14} /> XÓA ({selectedMediaIds.length})
                  </button>
                )}

                {/* Choose File / Upload Button */}
                <button
                  type="button"
                  onClick={() => {
                    const el = document.getElementById('media-drag-upload-input');
                    if (el) el.click();
                  }}
                  className="px-5 py-2 bg-[#f97316] hover:bg-[#ea580c] text-white font-extrabold text-xs rounded-xl shadow-md cursor-pointer transition-all uppercase tracking-wider flex items-center gap-1.5"
                >
                  ▲ CHỌN TỆP
                </button>
              </div>
            </div>

            {/* TWO COLUMN MAIN CONTENT AREA */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              
              {/* LEFT SIDEBAR: FOLDER TREE */}
              <div className="lg:col-span-3 bg-white border border-slate-200/80 rounded-3xl p-6 shadow-xs space-y-4 text-xs">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <h3 className="font-black text-slate-700 uppercase tracking-wider flex items-center gap-2">
                    <FolderOpen size={16} className="text-[#004b87]" /> THƯ MỤC
                  </h3>
                  <button
                    type="button"
                    onClick={() => {
                      if (isRootCollapsed || collapsedFolders.length > 0) {
                        setIsRootCollapsed(false);
                        setCollapsedFolders([]);
                      } else {
                        setIsRootCollapsed(true);
                        setCollapsedFolders([...folders]);
                      }
                    }}
                    className="text-[10px] font-bold text-[#004b87] hover:underline cursor-pointer flex items-center gap-1"
                  >
                    {isRootCollapsed || collapsedFolders.length > 0 ? 'Mở rộng tất cả' : 'Thu gọn tất cả'}
                  </button>
                </div>

                <div className="space-y-1 max-h-[500px] overflow-y-auto pr-1">
                  {/* ROOT FILE MANAGER ITEM WITH COLLAPSE TOGGLE */}
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => setIsRootCollapsed(prev => !prev)}
                      className="p-1 text-[#004b87] hover:text-slate-700 cursor-pointer rounded-lg hover:bg-slate-100"
                      title={isRootCollapsed ? 'Mở rộng tất cả thư mục' : 'Thu gọn tất cả thư mục'}
                    >
                      {isRootCollapsed ? <ChevronRight size={15} /> : <ChevronDown size={15} />}
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setCurrentFolderPath('root');
                        if (isRootCollapsed) setIsRootCollapsed(false);
                      }}
                      className={`flex-1 text-left p-2.5 rounded-2xl flex items-center justify-between transition-all cursor-pointer font-bold ${
                        currentFolderPath === 'root'
                          ? 'bg-amber-100/70 text-amber-900 font-extrabold border border-amber-300 shadow-2xs'
                          : 'hover:bg-slate-50 text-slate-700 border border-transparent'
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <FolderOpen size={14} className="text-amber-500 fill-amber-100" /> File Manager
                      </span>
                      <span className="px-2 py-0.5 bg-white/80 rounded-md font-mono text-[10px] text-slate-500">{mediaFiles.length}</span>
                    </button>
                  </div>

                  {/* FOLDER TREE ITEMS (SORTED HIERARCHICALLY) */}
                  {!isRootCollapsed && (() => {
                    const sortFoldersHierarchically = (folderList: string[]) => {
                      const result: string[] = [];
                      const addChildren = (parentPath: string) => {
                        const children = folderList.filter(f => {
                          if (parentPath === 'root') {
                            return !f.includes('/');
                          }
                          const prefix = parentPath + '/';
                          return f.startsWith(prefix) && !f.slice(prefix.length).includes('/');
                        });
                        children.sort((a, b) => a.localeCompare(b));
                        for (const child of children) {
                          result.push(child);
                          addChildren(child);
                        }
                      };
                      addChildren('root');
                      return result;
                    };

                    const sortedFolders = sortFoldersHierarchically(folders);

                    return sortedFolders.map((fPath) => {
                      const depth = fPath.split('/').length - 1;
                      const folderName = fPath.split('/').pop();
                      const hasSubfolders = folders.some(child => child.startsWith(fPath + '/'));
                      const isCollapsed = collapsedFolders.includes(fPath);

                      // Check if any parent ancestor is collapsed
                      const parts = fPath.split('/');
                      let isVisible = true;
                      for (let i = 1; i < parts.length; i++) {
                        const ancestor = parts.slice(0, i).join('/');
                        if (collapsedFolders.includes(ancestor)) {
                          isVisible = false;
                          break;
                        }
                      }

                      if (!isVisible) return null;

                    return (
                      <div
                        key={fPath}
                        style={{ paddingLeft: `${(depth + 1) * 12}px` }}
                        className="flex items-center gap-1 group"
                      >
                        {hasSubfolders ? (
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setCollapsedFolders(prev =>
                                prev.includes(fPath) ? prev.filter(p => p !== fPath) : [...prev, fPath]
                              );
                            }}
                            className="p-1 text-slate-400 hover:text-slate-700 cursor-pointer rounded-lg hover:bg-slate-100"
                            title={isCollapsed ? 'Mở rộng thư mục con' : 'Thu gọn thư mục con'}
                          >
                            {isCollapsed ? <ChevronRight size={14} /> : <ChevronDown size={14} />}
                          </button>
                        ) : (
                          <span className="w-5 text-center text-slate-300 font-mono text-[10px]">↳</span>
                        )}

                        <button
                          type="button"
                          onClick={() => {
                            setCurrentFolderPath(fPath);
                            // If collapsed, expand it on navigate
                            if (isCollapsed) {
                              setCollapsedFolders(prev => prev.filter(p => p !== fPath));
                            }
                          }}
                          className={`flex-1 text-left px-2.5 py-2 rounded-2xl flex items-center justify-between transition-all cursor-pointer text-xs ${
                            currentFolderPath === fPath
                              ? 'bg-amber-100/70 text-amber-900 font-extrabold border border-amber-300 shadow-2xs'
                              : 'hover:bg-slate-50 text-slate-600 border border-transparent'
                          }`}
                        >
                          <span className="flex items-center gap-1.5 truncate">
                            <FolderOpen size={13} className="text-amber-500 fill-amber-100 shrink-0" /> {folderName}
                          </span>
                        </button>
                      </div>
                    );
                  });
                })()}
                </div>

                {/* Delete Subfolder Button */}
                {currentFolderPath !== 'root' && (
                  <div className="pt-3 border-t border-slate-100">
                    <button
                      type="button"
                      onClick={() => {
                        const folderName = currentFolderPath.split('/').pop();
                        if (confirm(`Bạn có chắc chắn muốn xóa thư mục "${folderName}" và tất cả thư mục con bên trong?`)) {
                          setFolders(prev => prev.filter(f => f !== currentFolderPath && !f.startsWith(currentFolderPath + '/')));
                          const parentPathParts = currentFolderPath.split('/');
                          parentPathParts.pop();
                          setCurrentFolderPath(parentPathParts.length > 0 ? parentPathParts.join('/') : 'root');
                          triggerNotification(`Đã xóa thư mục "${folderName}"!`);
                        }
                      }}
                      className="w-full py-2 bg-rose-50 hover:bg-rose-100 text-rose-600 font-bold rounded-xl text-xs border border-rose-200 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <Trash2 size={13} /> Xóa thư mục "{currentFolderPath.split('/').pop()}"
                    </button>
                  </div>
                )}
              </div>

              {/* RIGHT MAIN PANEL: DRAG & DROP UPLOAD ZONE + MEDIA GRID */}
              <div className="lg:col-span-9 space-y-6">
                
                {/* Hidden File Input */}
                <input
                  id="media-drag-upload-input"
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={(e) => {
                    if (e.target.files) handleUploadFiles(e.target.files);
                  }}
                  className="hidden"
                />

                {/* MAIN MEDIA PANEL CARD WITH INTEGRATED DRAG DROP */}
                <div
                  className={`bg-white border-2 border-dashed rounded-3xl p-6 shadow-xs space-y-6 transition-all ${
                    isDragOver ? 'border-[#004b87] bg-blue-50/40 ring-4 ring-[#004b87]/10' : 'border-slate-200'
                  }`}
                  onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
                  onDragLeave={() => setIsDragOver(false)}
                  onDrop={(e) => {
                    e.preventDefault();
                    setIsDragOver(false);
                    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
                      handleUploadFiles(e.dataTransfer.files);
                    }
                  }}
                >
                  {/* BREADCRUMB NAVIGATION & UPLOAD PROMPT */}
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-200/80">
                    <div className="flex flex-wrap items-center gap-2 text-xs font-bold text-slate-700">
                      <button
                        type="button"
                        onClick={() => setCurrentFolderPath('root')}
                        className={`hover:underline cursor-pointer flex items-center gap-1 ${currentFolderPath === 'root' ? 'text-[#004b87] font-extrabold' : 'text-slate-600'}`}
                      >
                        <FolderOpen size={13} className="text-amber-500 fill-amber-100" /> File Manager
                      </button>
                      {currentFolderPath !== 'root' && (
                        currentFolderPath.split('/').map((segment, idx, arr) => {
                          const subPath = arr.slice(0, idx + 1).join('/');
                          const isLast = idx === arr.length - 1;
                          return (
                            <div key={subPath} className="flex items-center gap-2">
                              <ChevronRight size={12} className="text-slate-400 shrink-0" />
                              <button
                                type="button"
                                onClick={() => setCurrentFolderPath(subPath)}
                                className={`hover:underline cursor-pointer truncate ${isLast ? 'text-[#004b87] font-black' : 'text-slate-600 font-bold'}`}
                              >
                                {segment}
                              </button>
                            </div>
                          );
                        })
                      )}
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        const el = document.getElementById('media-drag-upload-input');
                        if (el) el.click();
                      }}
                      className="text-[11px] font-bold text-[#004b87] hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      <Upload size={13} /> Kéo thả tệp vào đây hoặc bấm chọn tệp từ máy tính
                    </button>
                  </div>

                  {/* UPLOADING SPINNER INDICATOR */}
                  {isUploadingMedia && (
                    <div className="p-4 bg-blue-50 border border-blue-200 rounded-2xl flex items-center justify-center gap-3 text-xs font-bold text-[#004b87]">
                      <div className="w-5 h-5 border-2 border-[#004b87] border-t-transparent rounded-full animate-spin" />
                      <span>Đang tải tệp hình ảnh lên máy chủ, vui lòng đợi...</span>
                    </div>
                  )}

                  {/* DIRECT SUBFOLDERS CARDS GRID */}
                  {(() => {
                    const getDirectSubfolders = (parent: string) => {
                      if (parent === 'root') {
                        return folders.filter(f => !f.includes('/'));
                      }
                      const prefix = parent + '/';
                      return folders.filter(f => f.startsWith(prefix) && !f.slice(prefix.length).includes('/'));
                    };
                    const directSubfolders = getDirectSubfolders(currentFolderPath);

                    return (
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block">
                            THƯ MỤC CON ({directSubfolders.length})
                          </span>
                          <button
                            type="button"
                            onClick={() => {
                              const parentFolderName = currentFolderPath === 'root' ? 'File Manager' : currentFolderPath.split('/').pop();
                              const name = prompt(`Nhập tên thư mục con mới trong "${parentFolderName}":`);
                              if (name && name.trim()) {
                                const cleanName = name.trim().toLowerCase().replace(/\s+/g, '-');
                                const newFolderPath = currentFolderPath === 'root'
                                  ? cleanName
                                  : `${currentFolderPath}/${cleanName}`;
                                if (!folders.includes(newFolderPath)) {
                                  setFolders(prev => [...prev, newFolderPath]);
                                  triggerNotification(`Đã tạo thư mục con "${cleanName}"!`);
                                } else {
                                  triggerNotification(`Thư mục "${cleanName}" đã tồn tại!`);
                                }
                              }
                            }}
                            className="text-[11px] font-bold text-[#004b87] hover:underline flex items-center gap-1 cursor-pointer"
                          >
                            <Plus size={12} /> + Tạo thư mục con
                          </button>
                        </div>

                        {directSubfolders.length > 0 && (
                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                            {directSubfolders.map(subPath => {
                              const folderName = subPath.split('/').pop();
                              return (
                                <div
                                  key={subPath}
                                  onClick={() => setCurrentFolderPath(subPath)}
                                  className="p-4 border border-slate-200 rounded-2xl bg-slate-50 hover:bg-amber-50/60 hover:border-amber-300 transition-all cursor-pointer flex items-center gap-3 group relative shadow-2xs hover:shadow-md"
                                >
                                  <FolderOpen size={32} className="text-amber-500 fill-amber-100 group-hover:scale-110 transition-transform shrink-0" />
                                  <div className="truncate flex-1">
                                    <span className="text-xs font-bold text-slate-800 block truncate" title={folderName}>
                                      {folderName}
                                    </span>
                                    <span className="text-[10px] text-slate-400 font-mono">Thư mục con</span>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    );
                  })()}

                  {/* MEDIA FILES GRID */}
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block">
                        DANH SÁCH HÌNH ÁNH ({mediaFiles.filter(m => m.filename.toLowerCase().includes(mediaSearchQuery.toLowerCase())).length} TỆP)
                      </span>
                    </div>

                    {mediaFiles.length === 0 ? (
                      <div className="py-16 text-center text-slate-400 space-y-3 bg-slate-50/50 rounded-2xl border border-slate-100">
                        <ImageIcon size={44} className="mx-auto text-slate-300" />
                        <p className="font-bold text-xs text-slate-600">Chưa có tệp hình ảnh nào trong thư viện</p>
                        <p className="text-[11px] text-slate-400">Kéo & thả tập tin vào ô này hoặc bấm "CHỌN TỆP" để bắt đầu tải lên</p>
                      </div>
                    ) : (
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                        {mediaFiles
                          .filter(m => m.filename.toLowerCase().includes(mediaSearchQuery.toLowerCase()))
                          .map((media) => (
                            <div
                              key={media.id}
                              className={`relative rounded-2xl overflow-hidden border p-2 bg-white transition-all group shadow-2xs hover:shadow-md ${
                                selectedMediaIds.includes(media.id)
                                  ? 'border-[#004b87] ring-2 ring-[#004b87]/30 bg-blue-50/20'
                                  : 'border-slate-200 hover:border-slate-300'
                              }`}
                            >
                              {/* Checkbox for selection */}
                              <input
                                type="checkbox"
                                checked={selectedMediaIds.includes(media.id)}
                                onChange={() => {
                                  setSelectedMediaIds(prev =>
                                    prev.includes(media.id) ? prev.filter(i => i !== media.id) : [...prev, media.id]
                                  );
                                }}
                                className="absolute top-3 left-3 z-10 w-4 h-4 rounded text-[#004b87] focus:ring-[#004b87] cursor-pointer"
                              />

                              {/* Thumbnail Container */}
                              <div className="aspect-square rounded-xl overflow-hidden bg-slate-100 mb-2 border border-slate-100 flex items-center justify-center">
                                <img
                                  src={media.url}
                                  alt={media.filename}
                                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                                  onError={(e) => { (e.target as HTMLImageElement).src = '/assets/screening_service.png'; }}
                                />
                              </div>

                              {/* Filename & Info */}
                              <div className="text-[11px] font-bold text-slate-800 truncate px-1" title={media.filename}>
                                {media.filename}
                              </div>
                              <div className="text-[10px] text-slate-400 px-1 font-mono flex items-center justify-between mt-0.5">
                                <span>{media.file_size || 'JPG'}</span>
                                <span className="text-slate-300">#{media.id}</span>
                              </div>

                              {/* Hover Action Overlay */}
                              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center gap-2 transition-opacity p-2 rounded-2xl">
                                <button
                                  type="button"
                                  onClick={() => {
                                    navigator.clipboard.writeText(media.url);
                                    triggerNotification('Đã sao chép đường dẫn hình ảnh!');
                                  }}
                                  className="p-2 bg-white text-slate-800 rounded-xl text-xs font-bold shadow-md cursor-pointer hover:bg-slate-100 transition-transform active:scale-95"
                                  title="Sao chép đường dẫn URL"
                                >
                                  <Copy size={13} />
                                </button>

                                <button
                                  type="button"
                                  onClick={() => window.open(media.url, '_blank')}
                                  className="p-2 bg-blue-600 text-white rounded-xl text-xs font-bold shadow-md cursor-pointer hover:bg-blue-700 transition-transform active:scale-95"
                                  title="Xem ảnh kích thước đầy đủ"
                                >
                                  <Eye size={13} />
                                </button>

                                <button
                                  type="button"
                                  onClick={() => {
                                    if (confirm(`Bạn có chắc chắn muốn xóa tệp "${media.filename}"?`)) {
                                      router.delete(`/admin/media/${media.id}`, {
                                        onSuccess: () => triggerNotification('Đã xóa tệp!')
                                      });
                                    }
                                  }}
                                  className="p-2 bg-rose-600 text-white rounded-xl text-xs font-bold shadow-md cursor-pointer hover:bg-rose-700 transition-transform active:scale-95"
                                  title="Xóa tệp khỏi hệ thống"
                                >
                                  <Trash2 size={13} />
                                </button>
                              </div>
                            </div>
                          ))}
                      </div>
                    )}
                  </div>

                </div>

              </div>

            </div>

          </div>
        )}

        {/* TAB CONFIGS (CẤU HÌNH TRẠNG THÁI - CHUẨN SCREENSHOT 4 MOCKUP) */}
        {activeTab === 'configs' && (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSaveSettings(e);
            }}
            className="space-y-6 w-full pb-12"
          >
            <div>
              <h2 className="text-xl font-extrabold text-[#004b87]">Cấu Hình Trạng Thái</h2>
              <p className="text-xs text-slate-500 mt-1">Thiết lập trạng thái hoạt động hoặc bảo trì của website hệ thống.</p>
            </div>

            <div className="bg-white border border-slate-200/80 rounded-3xl p-8 shadow-xs space-y-6 max-w-2xl">
              <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest border-b border-slate-100 pb-3">
                TRẠNG THÁI HỆ THỐNG
              </h3>

              <div className="space-y-5 text-xs">
                
                {/* Radio Option 1 */}
                <label className="flex items-start gap-3.5 p-4 rounded-2xl border border-slate-200 hover:border-blue-300 transition-colors cursor-pointer bg-slate-50/50">
                  <input
                    type="radio"
                    name="system_status"
                    value="active"
                    checked={(settingsData.system_status || 'active') === 'active'}
                    onChange={(e) => setSettingsData({ ...settingsData, system_status: e.target.value })}
                    className="mt-0.5 w-4 h-4 text-[#004b87] focus:ring-[#004b87] cursor-pointer"
                  />
                  <div>
                    <span className="font-extrabold text-slate-800 text-xs block">Hoạt động bình thường</span>
                    <span className="text-slate-500 text-[11px] mt-0.5 block">Khách hàng truy cập và sử dụng dịch vụ bình thường.</span>
                  </div>
                </label>

                {/* Radio Option 2 */}
                <label className="flex items-start gap-3.5 p-4 rounded-2xl border border-slate-200 hover:border-amber-300 transition-colors cursor-pointer bg-slate-50/50">
                  <input
                    type="radio"
                    name="system_status"
                    value="maintenance"
                    checked={settingsData.system_status === 'maintenance'}
                    onChange={(e) => setSettingsData({ ...settingsData, system_status: e.target.value })}
                    className="mt-0.5 w-4 h-4 text-[#004b87] focus:ring-[#004b87] cursor-pointer"
                  />
                  <div>
                    <span className="font-extrabold text-slate-800 text-xs block">Bảo trì hệ thống</span>
                    <span className="text-slate-500 text-[11px] mt-0.5 block">Khách truy cập sẽ thấy màn hình thông báo bảo trì. Chỉ admin mới truy cập được CMS.</span>
                  </div>
                </label>

                {/* Radio Option 3 */}
                <label className="flex items-start gap-3.5 p-4 rounded-2xl border border-slate-200 hover:border-blue-300 transition-colors cursor-pointer bg-slate-50/50">
                  <input
                    type="radio"
                    name="system_status"
                    value="scheduled"
                    checked={settingsData.system_status === 'scheduled'}
                    onChange={(e) => setSettingsData({ ...settingsData, system_status: e.target.value })}
                    className="mt-0.5 w-4 h-4 text-[#004b87] focus:ring-[#004b87] cursor-pointer"
                  />
                  <div>
                    <span className="font-extrabold text-slate-800 text-xs block">Theo thời gian (Sắp ra mắt)</span>
                    <span className="text-slate-500 text-[11px] mt-0.5 block">Đặt lịch bảo trì theo giờ định sẵn.</span>
                  </div>
                </label>

              </div>
            </div>

            {/* SAVE BUTTON */}
            <div className="flex justify-start">
              <button
                type="submit"
                className="px-8 py-3.5 bg-[#b89a67] hover:bg-[#a38553] text-white font-extrabold text-xs uppercase tracking-wider rounded-xl shadow-lg cursor-pointer transition-all flex items-center gap-2"
              >
                <Save size={16} /> LƯU CÀI ĐẶT
              </button>
            </div>
          </form>
        )}

        {/* OTHER TABS */}
        {activeTab !== 'overview' && activeTab !== 'consultations' && activeTab !== 'appointments' && activeTab !== 'services' && activeTab !== 'articles' && activeTab !== 'authors' && activeTab !== 'media' && activeTab !== 'banners' && activeTab !== 'doctors' && activeTab !== 'results' && activeTab !== 'reviews' && activeTab !== 'schedules' && activeTab !== 'faqs' && activeTab !== 'about' && (
          <div className="bg-white p-8 rounded-2xl border border-slate-200/80 shadow-sm text-sm space-y-4 w-full">
            <h3 className="text-base font-bold text-[#004b87] border-b border-slate-100 pb-4 uppercase">
              {sidebarItems.find(s => s.id === activeTab)?.label}
            </h3>
            <p className="text-slate-500">Đang hiển thị danh mục quản lý <strong>{sidebarItems.find(s => s.id === activeTab)?.label}</strong> của trung tâm.</p>
          </div>
        )}

      {/* MODAL EDIT / CREATE FAQ (CHUẨN HÌNH 3 MOCKUP) */}
      {showFaqModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 p-8 rounded-3xl max-w-xl w-full text-xs space-y-5 shadow-2xl relative">
            <button
              onClick={() => setShowFaqModal(false)}
              className="absolute top-6 right-6 p-2 text-slate-400 hover:text-slate-700 cursor-pointer"
            >
              <X size={20} />
            </button>

            <h3 className="text-base font-black text-slate-800 border-b border-slate-100 pb-3">
              {editingFaq ? 'Chỉnh sửa câu hỏi FAQ' : 'Thêm mới câu hỏi FAQ'}
            </h3>

            <form onSubmit={handleSaveFaq} className="space-y-4">
              <div>
                <label className="block font-black text-slate-700 uppercase tracking-wider mb-1.5">
                  CÂU HỎI *
                </label>
                <input
                  type="text"
                  required
                  value={faqForm.data.question}
                  onChange={(e) => faqForm.setData('question', e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-xs text-slate-800 outline-none focus:border-[#004b87] focus:bg-white font-bold"
                />
              </div>

              <div>
                <label className="block font-black text-slate-700 uppercase tracking-wider mb-1.5">
                  THỨ TỰ HIỂN THỊ (ORDER)
                </label>
                <input
                  type="number"
                  value={faqForm.data.order}
                  onChange={(e) => faqForm.setData('order', parseInt(e.target.value) || 0)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-800 outline-none focus:border-[#004b87] focus:bg-white"
                />
              </div>

              <div>
                <label className="block font-black text-slate-700 uppercase tracking-wider mb-1.5">
                  CÂU TRẢ LỜI GIẢI ĐÁP *
                </label>
                <textarea
                  rows={5}
                  required
                  value={faqForm.data.answer}
                  onChange={(e) => faqForm.setData('answer', e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-xs text-slate-800 outline-none focus:border-[#004b87] focus:bg-white leading-relaxed resize-none"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowFaqModal(false)}
                  className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs cursor-pointer"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  disabled={faqForm.processing}
                  className="px-6 py-2.5 bg-[#b89a67] hover:bg-[#a38553] text-white font-extrabold rounded-xl text-xs shadow-md cursor-pointer"
                >
                  Lưu lại
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      </main>

      {/* USE CASE 2 MODAL: RESCHEDULE APPOINTMENT */}
      {reschedulingAppointment && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 p-8 rounded-3xl max-w-md w-full text-xs space-y-5 shadow-2xl relative">
            <button
              onClick={() => setReschedulingAppointment(null)}
              className="absolute top-6 right-6 p-2 text-slate-400 hover:text-slate-700 cursor-pointer"
            >
              <X size={20} />
            </button>

            <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 font-bold flex items-center justify-center">
                <CalendarRange size={20} />
              </div>
              <div>
                <h3 className="text-base font-black text-[#004b87]">Dời / Điều Chỉnh Lịch Hẹn Khám</h3>
                <p className="text-xs text-slate-500 mt-0.5">Bệnh nhân: <strong>{reschedulingAppointment.patient_name}</strong> ({reschedulingAppointment.phone})</p>
              </div>
            </div>

            <form onSubmit={handleConfirmReschedule} className="space-y-4">
              <div>
                <label className="block text-slate-700 font-bold mb-1.5">Chọn Ngày Khám Mới *</label>
                <input
                  type="date"
                  required
                  value={newRescheduleDate}
                  onChange={(e) => setNewRescheduleDate(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-800 outline-none focus:border-[#004b87]"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1.5">Chọn Khung Giờ Khám Mới *</label>
                <select
                  value={newRescheduleTime}
                  onChange={(e) => setNewRescheduleTime(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-800 outline-none focus:border-[#004b87]"
                >
                  <option value="08:00">08:00 – Ca Sáng</option>
                  <option value="09:00">09:00 – Ca Sáng</option>
                  <option value="10:00">10:00 – Ca Sáng</option>
                  <option value="14:00">14:00 – Ca Chiều</option>
                  <option value="15:30">15:30 – Ca Chiều</option>
                  <option value="17:00">17:00 – Ca Chiều</option>
                </select>
              </div>

              <div className="p-3 bg-blue-50/70 border border-blue-100 rounded-xl text-slate-600 leading-relaxed text-[11px]">
                💡 <strong>Thông báo tự động:</strong> Ngay sau khi dời lịch, hệ thống sẽ tự động gửi tin nhắn Zalo OA / SMS Brandname tới SĐT {reschedulingAppointment.phone} để xác nhận lịch khám mới.
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setReschedulingAppointment(null)}
                  className="px-4 py-2 bg-slate-100 text-slate-700 font-bold rounded-xl"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#004b87] text-white font-bold rounded-xl shadow-md"
                >
                  Xác nhận Dời Lịch ➔
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL CHỈNH SỬA THÔNG TIN BỆNH NHÂN */}
      {editingPatientInfo && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 p-8 rounded-3xl max-w-lg w-full text-xs space-y-5 shadow-2xl relative">
            <button
              onClick={() => setEditingPatientInfo(null)}
              className="absolute top-6 right-6 p-2 text-slate-400 hover:text-slate-700 cursor-pointer"
            >
              <X size={20} />
            </button>

            <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#004b87] font-bold flex items-center justify-center">
                <Edit size={20} />
              </div>
              <div>
                <h3 className="text-base font-black text-[#004b87]">Chỉnh Sửa Hồ Sơ Bệnh Nhân</h3>
                <p className="text-xs text-slate-500 mt-0.5">Cập nhật họ tên, SĐT, gói dịch vụ & trạng thái xử lý ca khám</p>
              </div>
            </div>

            <form onSubmit={handleSavePatientInfoEdit} className="space-y-4">
              {/* Row 1: Tên & SĐT */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-bold mb-1.5">Họ và tên bệnh nhân *</label>
                  <input
                    type="text"
                    required
                    value={patientEditForm.data.patient_name}
                    onChange={(e) => patientEditForm.setData('patient_name', e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-800 outline-none focus:border-[#004b87] focus:bg-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-bold mb-1.5">Số điện thoại *</label>
                  <input
                    type="tel"
                    required
                    value={patientEditForm.data.phone}
                    onChange={(e) => patientEditForm.setData('phone', e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-800 outline-none focus:border-[#004b87] focus:bg-white font-mono font-bold"
                  />
                </div>
              </div>

              {/* Row 2: Email & Cơ sở điều trị */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-bold mb-1.5">Email liên hệ</label>
                  <input
                    type="email"
                    placeholder="khachhang@gmail.com"
                    value={patientEditForm.data.email}
                    onChange={(e) => patientEditForm.setData('email', e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-800 outline-none focus:border-[#004b87] focus:bg-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-bold mb-1.5">Cơ sở điều trị</label>
                  <select
                    value={patientEditForm.data.facility}
                    onChange={(e) => patientEditForm.setData('facility', e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs font-bold text-slate-800 outline-none focus:border-[#004b87] focus:bg-white cursor-pointer"
                  >
                    <option value="MediPlus HP Medical Centre - Hải Phòng">MediPlus HP Medical Centre - Hải Phòng</option>
                    <option value="MediPlus HP - Cơ sở 2 Hà Nội">MediPlus HP - Cơ sở 2 Hà Nội</option>
                  </select>
                </div>
              </div>

              {/* Row 3: Gói dịch vụ & Bác sĩ phụ trách */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-bold mb-1.5">Gói dịch vụ khám</label>
                  <select
                    value={patientEditForm.data.service_slug}
                    onChange={(e) => patientEditForm.setData('service_slug', e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs font-bold text-slate-800 outline-none focus:border-[#004b87] focus:bg-white cursor-pointer"
                  >
                    <option value="Gói Khám Tim Mạch Tổng Quát">Gói Khám Tim Mạch Tổng Quát</option>
                    <option value="Tầm Soát Tăng Huyết Áp & Mạch Máu">Tầm Soát Tăng Huyết Áp & Mạch Máu</option>
                    <option value="Siêu Âm Tim Doppler Màu 4D">Siêu Âm Tim Doppler Màu 4D</option>
                    <option value="Đo Điện Tâm Đồ ECG Chuyên Sâu">Đo Điện Tâm Đồ ECG Chuyên Sâu</option>
                    {services.map(s => (
                      <option key={s.id} value={s.title}>{s.title}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1.5">Bác sĩ phụ trách</label>
                  <select
                    value={patientEditForm.data.doctor_name}
                    onChange={(e) => patientEditForm.setData('doctor_name', e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs font-bold text-slate-800 outline-none focus:border-[#004b87] focus:bg-white cursor-pointer"
                  >
                    <option value="BSCKII Đoàn Khôi">BSCKII Đoàn Khôi (Phòng 101)</option>
                    <option value="BSCKI Nguyễn Văn A">BSCKI Nguyễn Văn A (Phòng 102)</option>
                  </select>
                </div>
              </div>

              {/* Row 4: Triệu chứng */}
              <div>
                <label className="block text-slate-700 font-bold mb-1.5">Nhu cầu / Triệu chứng bệnh nhân</label>
                <textarea
                  rows={2}
                  value={patientEditForm.data.notes}
                  onChange={(e) => patientEditForm.setData('notes', e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-800 outline-none focus:border-[#004b87] focus:bg-white resize-none"
                />
              </div>

              {/* Row 5: Ghi chú tư vấn bác sĩ */}
              <div>
                <label className="block text-slate-700 font-bold mb-1.5">Ghi chú tư vấn bác sĩ / Lịch hẹn</label>
                <textarea
                  rows={2}
                  value={patientEditForm.data.doctor_notes}
                  onChange={(e) => patientEditForm.setData('doctor_notes', e.target.value)}
                  className="w-full bg-amber-50/60 border border-amber-200 rounded-xl p-3 text-xs text-slate-800 outline-none focus:border-[#004b87] focus:bg-white resize-none"
                />
              </div>

              {/* Row 6: Trạng thái hồ sơ */}
              <div>
                <label className="block text-slate-700 font-bold mb-1.5">Trạng thái hồ sơ ca khám</label>
                <select
                  value={patientEditForm.data.status}
                  onChange={(e) => patientEditForm.setData('status', e.target.value as any)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs font-bold text-slate-800 outline-none focus:border-[#004b87] focus:bg-white cursor-pointer"
                >
                  <option value="pending">Chờ liên hệ</option>
                  <option value="confirmed">Đã xác nhận</option>
                  <option value="completed">Đã khám xong</option>
                  <option value="cancelled">Đã hủy</option>
                </select>
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setEditingPatientInfo(null)}
                  className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs cursor-pointer"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  disabled={patientEditForm.processing}
                  className="px-6 py-2.5 bg-[#004b87] hover:bg-[#003866] text-white font-bold rounded-xl text-xs shadow-md cursor-pointer"
                >
                  Cập Nhật Hồ Sơ Bệnh Nhân ➔
                </button>
              </div>
            </form>
          </div>
        </div>
      )}



      {/* USE CASE 5 MODAL: PRINT RECEPTION TICKET */}
      {printingAppointment && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white p-8 rounded-3xl max-w-md w-full space-y-6 shadow-2xl relative border border-slate-200">
            <button
              onClick={() => setPrintingAppointment(null)}
              className="absolute top-6 right-6 p-2 text-slate-400 hover:text-slate-700 cursor-pointer"
            >
              <X size={20} />
            </button>

            {/* Printable Reception Card */}
            <div className="p-6 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-300 space-y-4 text-slate-800">
              <div className="text-center border-b border-slate-200 pb-3">
                <h3 className="font-black text-[#004b87] text-base uppercase">MEDIPLUS HP MEDICAL CENTRE</h3>
                <p className="text-[10px] text-slate-500 font-bold mt-0.5">PHIẾU ĐĂNG KÝ KHÁM BỆNH VÀ THÂM KHÁM TIM MẠCH</p>
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-500">Mã Lịch Hẹn:</span>
                  <span className="font-mono font-bold text-slate-900">#MD-{printingAppointment.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Họ và tên bệnh nhân:</span>
                  <span className="font-bold text-[#004b87] text-sm">{printingAppointment.patient_name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Số điện thoại:</span>
                  <span className="font-bold text-slate-800">{printingAppointment.phone}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Dịch vụ khám:</span>
                  <span className="font-bold text-slate-800">{printingAppointment.service_slug || 'Khám tim mạch'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Bác sĩ phụ trách:</span>
                  <span className="font-bold text-slate-900">BSCKII Đoàn Khôi (Phòng 101)</span>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-200 text-center">
                <span className="text-[10px] text-slate-400 font-mono block mb-1">MÃ QR QUÉT TẠI QUẦY TIẾP ĐÓN</span>
                <div className="w-24 h-24 bg-white border border-slate-300 rounded-xl mx-auto flex items-center justify-center text-[9px] font-mono text-slate-400">
                  [QR CODE #MD-{printingAppointment.id}]
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setPrintingAppointment(null)}
                className="px-4 py-2 bg-slate-100 text-slate-700 font-bold rounded-xl text-xs"
              >
                Hủy
              </button>
              <button
                type="button"
                onClick={() => {
                  window.print();
                  setPrintingAppointment(null);
                }}
                className="flex items-center gap-1.5 px-5 py-2 bg-[#004b87] text-white font-bold rounded-xl text-xs shadow-md cursor-pointer"
              >
                <Printer size={14} /> In Phiếu Nhập Khám ➔
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CREATE & EDIT SERVICE MODAL */}
      {showServiceModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 p-8 rounded-3xl max-w-lg w-full text-xs space-y-5 shadow-2xl relative">
            <button
              onClick={() => setShowServiceModal(false)}
              className="absolute top-6 right-6 p-2 text-slate-400 hover:text-slate-700 cursor-pointer"
            >
              <X size={20} />
            </button>

            <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#004b87] font-bold flex items-center justify-center">
                <Sparkles size={20} />
              </div>
              <div>
                <h3 className="text-base font-black text-[#004b87]">
                  {editingService ? 'Chỉnh Sửa Gói Dịch Vụ Y Khoa' : 'Tạo Mới Gói Dịch Vụ Y Khoa'}
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">Nhập đầy đủ tên dịch vụ, giá niêm yết và phân nhóm trụ cột</p>
              </div>
            </div>

            <form onSubmit={handleSaveService} className="space-y-4">
              <div>
                <label className="block text-slate-700 font-bold mb-1.5">Tên gói dịch vụ y khoa *</label>
                <input
                  type="text"
                  required
                  placeholder="VD: Gói Khám & Chẩn Đán Tim Mạnh Chuyên Sâu"
                  value={serviceForm.data.title}
                  onChange={(e) => serviceForm.setData('title', e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-800 outline-none focus:border-[#004b87] focus:bg-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-bold mb-1.5">Nhóm Danh Mục Dịch Vụ *</label>
                  <select
                    value={serviceForm.data.service_pillar_id}
                    onChange={(e) => serviceForm.setData('service_pillar_id', parseInt(e.target.value))}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs font-bold text-slate-700 outline-none focus:border-[#004b87] cursor-pointer"
                  >
                    {pillars.map((pillar) => (
                      <option key={pillar.id} value={pillar.id}>
                        {pillar.title}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-slate-700 font-bold mb-1.5">Giá niêm yết (VNĐ) *</label>
                  <input
                    type="text"
                    required
                    placeholder="VD: 500,000 VNĐ"
                    value={serviceForm.data.price}
                    onChange={(e) => serviceForm.setData('price', e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-800 outline-none focus:border-[#004b87] focus:bg-white font-mono font-bold"
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="block text-slate-700 font-bold">Mô tả ngắn gọn dịch vụ</label>
                  <button
                    type="button"
                    onClick={() => handleOpenMediaPicker('service')}
                    className="px-2.5 py-1 bg-blue-50 hover:bg-blue-100 text-[#004b87] font-bold rounded-lg border border-blue-200 text-[11px] flex items-center gap-1 cursor-pointer transition-all"
                  >
                    <FolderOpen size={11} className="text-[#004b87] fill-blue-100" /> Chèn Ảnh Từ Quản Lý Tệp
                  </button>
                </div>
                <textarea
                  rows={3}
                  placeholder="Mô tả danh mục hạng mục thăm khám có trong gói..."
                  value={serviceForm.data.description}
                  onChange={(e) => serviceForm.setData('description', e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-800 resize-none outline-none focus:border-[#004b87] focus:bg-white"
                />
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="is_featured"
                  checked={serviceForm.data.is_featured}
                  onChange={(e) => serviceForm.setData('is_featured', e.target.checked)}
                  className="w-4 h-4 rounded text-[#004b87] focus:ring-[#004b87] cursor-pointer"
                />
                <label htmlFor="is_featured" className="text-xs font-bold text-slate-700 cursor-pointer">
                  Đánh dấu dịch vụ NỔI BẬT (Hiển thị ưu tiên trên trang chủ)
                </label>
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowServiceModal(false)}
                  className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs cursor-pointer"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  disabled={serviceForm.processing}
                  className="px-6 py-2.5 bg-[#004b87] hover:bg-[#003866] text-white font-bold rounded-xl text-xs shadow-md cursor-pointer"
                >
                  {editingService ? 'Cập Nhật Dịch Vụ' : 'Lưu Gói Dịch Vụ Mới'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ENHANCED CRM PATIENT DETAIL & NOTES DRAWER / MODAL */}
      {selectedPatient && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 p-8 rounded-3xl max-w-xl w-full text-xs space-y-6 shadow-2xl relative">
            <button
              onClick={() => setSelectedPatient(null)}
              className="absolute top-6 right-6 p-2 text-slate-400 hover:text-slate-700 cursor-pointer"
            >
              <X size={20} />
            </button>

            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#004b87] to-[#00a896] text-white font-bold flex items-center justify-center text-xl shadow-md">
                  {selectedPatient.patient_name[0]}
                </div>
                <div>
                  <h3 className="text-lg font-black text-[#004b87]">{selectedPatient.patient_name}</h3>
                  <p className="text-xs text-[#00a896] font-bold mt-0.5">Hồ sơ CRM Mã KH: #{selectedPatient.id}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={`tel:${selectedPatient.phone}`}
                  className="flex items-center gap-1.5 px-3 py-2 bg-blue-50 text-blue-700 hover:bg-blue-100 rounded-xl text-xs font-bold transition-all"
                >
                  <Phone size={14} /> Gọi
                </a>
                <a
                  href={`https://zalo.me/${selectedPatient.phone}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 px-3 py-2 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 rounded-xl text-xs font-bold transition-all"
                >
                  <MessageCircle size={14} /> Zalo
                </a>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-100">
              <div>
                <span className="text-slate-500 font-medium block">Số điện thoại liên hệ:</span>
                <span className="font-bold text-slate-800 text-sm">{selectedPatient.phone}</span>
              </div>
              <div>
                <span className="text-slate-500 font-medium block">Thời gian đăng ký:</span>
                <span className="font-bold text-slate-800">{formatDate(selectedPatient.created_at)}</span>
              </div>
              <div className="col-span-2 pt-2 border-t border-slate-200/60">
                <span className="text-slate-500 font-medium block mb-1">Nhu cầu / Triệu chứng bệnh nhân đăng ký:</span>
                <p className="text-slate-700 font-medium italic bg-white p-2.5 rounded-xl border border-slate-200/60">
                  "{selectedPatient.notes || 'Đăng ký tư vấn thăm khám tim mạch trực tuyến'}"
                </p>
              </div>
            </div>

            <form onSubmit={handleSavePatientNotes} className="space-y-3">
              <div className="flex justify-between items-center">
                <label className="block text-slate-800 font-extrabold flex items-center gap-1.5">
                  <FileEdit size={16} className="text-[#004b87]" />
                  Ghi chú tư vấn & Lịch hẹn thăm khám (CRM):
                </label>
                <span className="text-[10px] text-slate-400">Lưu thông tin trao đổi với khách</span>
              </div>
              <textarea
                rows={3}
                placeholder="Nhập ghi chú tư vấn, thời gian hẹn khám với BSCKII Đoàn Khôi..."
                value={patientNotesText}
                onChange={(e) => setPatientNotesText(e.target.value)}
                className="w-full bg-amber-50/50 border border-amber-200 rounded-2xl p-3 text-xs text-slate-800 outline-none focus:border-[#004b87] focus:bg-white resize-none"
              />
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="flex items-center gap-1.5 px-4 py-2 bg-[#004b87] hover:bg-[#003866] text-white font-bold rounded-xl text-xs shadow-sm cursor-pointer"
                >
                  <Save size={14} /> Lưu ghi chú CRM
                </button>
              </div>
            </form>

            <div>
              <span className="block text-slate-500 font-bold mb-2">Chuyển đổi trạng thái xử lý hồ sơ:</span>
              <div className="grid grid-cols-4 gap-2">
                <button
                  onClick={() => updateAppointmentStatus(selectedPatient.id, 'pending')}
                  className={`py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                    selectedPatient.status === 'pending' ? 'bg-blue-600 text-white border-blue-600 shadow-sm' : 'bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100'
                  }`}
                >
                  Chờ liên hệ
                </button>
                <button
                  onClick={() => updateAppointmentStatus(selectedPatient.id, 'confirmed')}
                  className={`py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                    selectedPatient.status === 'confirmed' ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm' : 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100'
                  }`}
                >
                  Đã liên hệ
                </button>
                <button
                  onClick={() => updateAppointmentStatus(selectedPatient.id, 'completed')}
                  className={`py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                    selectedPatient.status === 'completed' ? 'bg-purple-600 text-white border-purple-600 shadow-sm' : 'bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100'
                  }`}
                >
                  Đã khám xong
                </button>
                <button
                  onClick={() => updateAppointmentStatus(selectedPatient.id, 'cancelled')}
                  className={`py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                    selectedPatient.status === 'cancelled' ? 'bg-rose-600 text-white border-rose-600 shadow-sm' : 'bg-rose-50 text-rose-700 border-rose-200 hover:bg-rose-100'
                  }`}
                >
                  Đã hủy
                </button>
              </div>
            </div>

            <div className="flex justify-end pt-2 border-t border-slate-100">
              <button
                onClick={() => setSelectedPatient(null)}
                className="px-6 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs cursor-pointer"
              >
                Đóng hồ sơ
              </button>
            </div>

          </div>
        </div>
      )}

      {/* MODAL TẠO LỊCH HẸN MỚI (MATCHING REFERENCE SCREENSHOT 100%) */}
      {showWalkinModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200/80 p-8 rounded-3xl max-w-xl w-full text-xs space-y-6 shadow-2xl relative">
            
            {/* Modal Header */}
            <div className="flex justify-between items-center pb-4 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-800 flex items-center justify-center">
                  <CalendarIcon size={18} />
                </div>
                <h3 className="text-lg font-black text-slate-800 tracking-tight">Tạo Lịch Hẹn Mới</h3>
              </div>
              <button
                type="button"
                onClick={() => setShowWalkinModal(false)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-400 hover:text-slate-700 flex items-center justify-center transition-all cursor-pointer"
              >
                <X size={16} />
              </button>
            </div>

            <form onSubmit={handleCreateWalkin} className="space-y-4">
              
              {/* Row 1: Tên khách hàng & Số điện thoại */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-700 font-extrabold mb-1.5">Tên khách hàng *</label>
                  <input
                    type="text"
                    required
                    placeholder="Nguyễn Văn A"
                    value={walkinForm.data.patient_name}
                    onChange={(e) => walkinForm.setData('patient_name', e.target.value)}
                    className="w-full bg-white border border-slate-200/90 rounded-2xl px-4 py-3 text-xs text-slate-800 outline-none focus:border-[#004b87] focus:ring-2 focus:ring-[#004b87]/10 transition-all placeholder:text-slate-400"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-extrabold mb-1.5">Số điện thoại *</label>
                  <input
                    type="tel"
                    required
                    placeholder="0912345678"
                    value={walkinForm.data.phone}
                    onChange={(e) => walkinForm.setData('phone', e.target.value)}
                    className="w-full bg-white border border-slate-200/90 rounded-2xl px-4 py-3 text-xs text-slate-800 outline-none focus:border-[#004b87] focus:ring-2 focus:ring-[#004b87]/10 transition-all placeholder:text-slate-400"
                  />
                </div>
              </div>

              {/* Row 2: Email & Cơ sở điều trị */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-700 font-extrabold mb-1.5">Email</label>
                  <input
                    type="email"
                    placeholder="khachhang@gmail.com"
                    value={walkinForm.data.email}
                    onChange={(e) => walkinForm.setData('email', e.target.value)}
                    className="w-full bg-white border border-slate-200/90 rounded-2xl px-4 py-3 text-xs text-slate-800 outline-none focus:border-[#004b87] focus:ring-2 focus:ring-[#004b87]/10 transition-all placeholder:text-slate-400"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-extrabold mb-1.5">Cơ sở điều trị</label>
                  <select
                    value={walkinForm.data.facility}
                    onChange={(e) => walkinForm.setData('facility', e.target.value)}
                    className="w-full bg-white border border-slate-200/90 rounded-2xl px-4 py-3 text-xs font-semibold text-slate-700 outline-none focus:border-[#004b87] focus:ring-2 focus:ring-[#004b87]/10 cursor-pointer transition-all"
                  >
                    <option value="">-- Chọn cơ sở --</option>
                    <option value="MediPlus HP Medical Centre - Hải Phòng">MediPlus HP Medical Centre - Hải Phòng</option>
                    <option value="MediPlus HP - Cơ sở 2 Hà Nội">MediPlus HP - Cơ sở 2 Hà Nội</option>
                  </select>
                </div>
              </div>

              {/* Row 3: Dịch vụ & Bác sĩ chỉ định */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-700 font-extrabold mb-1.5">Dịch vụ</label>
                  <select
                    value={walkinForm.data.service_slug}
                    onChange={(e) => walkinForm.setData('service_slug', e.target.value)}
                    className="w-full bg-white border border-slate-200/90 rounded-2xl px-4 py-3 text-xs font-semibold text-slate-700 outline-none focus:border-[#004b87] focus:ring-2 focus:ring-[#004b87]/10 cursor-pointer transition-all"
                  >
                    <option value="">-- Chọn dịch vụ --</option>
                    {services.map(s => (
                      <option key={s.id} value={s.title}>{s.title} ({s.price})</option>
                    ))}
                    {services.length === 0 && (
                      <option value="Gói Khám Tim Mạch Tổng Quát">Gói Khám Tim Mạch Tổng Quát (500,000 VNĐ)</option>
                    )}
                  </select>
                </div>

                <div>
                  <label className="block text-slate-700 font-extrabold mb-1.5">Bác sĩ chỉ định</label>
                  <select
                    value={walkinForm.data.doctor_name}
                    onChange={(e) => walkinForm.setData('doctor_name', e.target.value)}
                    className="w-full bg-white border border-slate-200/90 rounded-2xl px-4 py-3 text-xs font-semibold text-slate-700 outline-none focus:border-[#004b87] focus:ring-2 focus:ring-[#004b87]/10 cursor-pointer transition-all"
                  >
                    <option value="">-- Chọn bác sĩ --</option>
                    <option value="BSCKII Đoàn Khôi">BSCKII Đoàn Khôi (Nội Tim Mạch)</option>
                    <option value="BSCKI Nguyễn Văn A">BSCKI Nguyễn Văn A (Nội Tổng Hợp)</option>
                  </select>
                </div>
              </div>

              {/* Row 4: Ngày hẹn & Khung giờ hẹn */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-700 font-extrabold mb-1.5">Ngày hẹn *</label>
                  <input
                    type="date"
                    required
                    value={walkinForm.data.appointment_date}
                    onChange={(e) => walkinForm.setData('appointment_date', e.target.value)}
                    className="w-full bg-white border border-slate-200/90 rounded-2xl px-4 py-3 text-xs text-slate-800 outline-none focus:border-[#004b87] focus:ring-2 focus:ring-[#004b87]/10 transition-all font-mono font-semibold"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-extrabold mb-1.5">Khung giờ hẹn *</label>
                  <select
                    value={walkinForm.data.time_slot}
                    onChange={(e) => walkinForm.setData('time_slot', e.target.value)}
                    className="w-full bg-white border border-slate-200/90 rounded-2xl px-4 py-3 text-xs font-semibold text-slate-700 outline-none focus:border-[#004b87] focus:ring-2 focus:ring-[#004b87]/10 cursor-pointer transition-all"
                  >
                    <option value="">-- Chọn khung giờ --</option>
                    <option value="08:00 - 09:00">08:00 - 09:00 (Ca Sáng)</option>
                    <option value="09:00 - 10:00">09:00 - 10:00 (Ca Sáng)</option>
                    <option value="10:00 - 11:00">10:00 - 11:00 (Ca Sáng)</option>
                    <option value="14:00 - 15:00">14:00 - 15:00 (Ca Chiều)</option>
                    <option value="15:00 - 16:00">15:00 - 16:00 (Ca Chiều)</option>
                    <option value="16:00 - 17:00">16:00 - 17:00 (Ca Chiều)</option>
                  </select>
                </div>
              </div>

              {/* Row 5: Ghi chú thêm */}
              <div>
                <label className="block text-slate-700 font-extrabold mb-1.5">Ghi chú thêm</label>
                <textarea
                  rows={3}
                  placeholder="Yêu cầu đặc biệt của khách hàng..."
                  value={walkinForm.data.notes}
                  onChange={(e) => walkinForm.setData('notes', e.target.value)}
                  className="w-full bg-white border border-slate-200/90 rounded-2xl p-4 text-xs text-slate-800 resize-none outline-none focus:border-[#004b87] focus:ring-2 focus:ring-[#004b87]/10 transition-all placeholder:text-slate-400"
                />
              </div>

              {/* Footer Action Buttons matching screenshot design */}
              <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowWalkinModal(false)}
                  className="px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold rounded-2xl text-xs transition-all cursor-pointer"
                >
                  Hủy bỏ
                </button>
                <button
                  type="submit"
                  disabled={walkinForm.processing}
                  className="px-8 py-3 bg-[#004b87] hover:bg-[#003866] text-white font-bold rounded-2xl text-xs shadow-md transition-all cursor-pointer"
                >
                  Tạo lịch hẹn
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

      {/* LIVE CLIENT-SIDE ARTICLE PREVIEW MODAL (USE CASE 4) */}
      {showArticlePreviewModal && (
        <div className="fixed inset-0 bg-slate-900/70 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#f4f7fb] border border-slate-200 rounded-3xl max-w-4xl w-full space-y-6 shadow-2xl relative my-8 overflow-hidden text-slate-800">
            {/* Modal Header */}
            <div className="bg-[#004b87] text-white p-6 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-white/10 text-white font-bold flex items-center justify-center border border-white/20">
                  <Eye size={20} />
                </div>
                <div>
                  <h3 className="text-base font-black uppercase tracking-wider">CHẾ ĐỘ XEM TRƯỚC BÀI VIẾT (PATIENT PREVIEW)</h3>
                  <p className="text-xs text-blue-100 mt-0.5">Mô phỏng 100% giao diện đọc bài viết thực tế của bệnh nhân trên trang Client</p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setShowArticlePreviewModal(false)}
                className="p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-xl cursor-pointer transition-all"
              >
                <X size={22} />
              </button>
            </div>

            {/* Article Content Container */}
            <div className="p-8 max-w-3xl mx-auto bg-white rounded-3xl shadow-sm space-y-6 border border-slate-200/80 my-4">
              {/* Category & Title */}
              <div className="space-y-3 border-b border-slate-100 pb-6">
                <span className="px-3 py-1 bg-emerald-50 text-emerald-700 font-extrabold rounded-lg text-xs border border-emerald-200">
                  {articleForm.data.category}
                </span>

                <h1 className="text-2xl sm:text-3xl font-black text-[#004b87] leading-tight">
                  {articleForm.data.title || 'Chưa nhập tiêu đề bài viết...'}
                </h1>

                {/* Metadata Row */}
                <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 font-semibold pt-1">
                  <div className="flex items-center gap-1.5 text-slate-800">
                    <User size={15} className="text-[#004b87]" />
                    <span>Tác giả: <strong>{articleForm.data.author}</strong></span>
                  </div>
                  <span>•</span>
                  <span>{articleForm.data.date}</span>
                  <span>•</span>
                  <span className="text-emerald-700 font-mono font-bold">⚡ {articleForm.data.read_time}</span>
                </div>

                {/* Excerpt Summary */}
                {articleForm.data.excerpt && (
                  <p className="text-sm text-slate-600 font-medium leading-relaxed bg-blue-50/60 p-4 rounded-2xl border border-blue-100 italic">
                    "{articleForm.data.excerpt}"
                  </p>
                )}
              </div>

              {/* Banner Image */}
              {articleForm.data.image && (
                <div className="rounded-3xl overflow-hidden shadow-md max-h-96 border border-slate-200">
                  <img src={articleForm.data.image} alt={articleForm.data.title} className="w-full h-full object-cover" />
                </div>
              )}

              {/* Article Content Body */}
              <div
                className="prose prose-slate max-w-none text-sm text-slate-800 leading-relaxed space-y-4 pt-4 [&_h4]:text-lg [&_h4]:font-black [&_h4]:text-[#004b87] [&_h4]:mt-6 [&_h4]:mb-2 [&_h5]:text-base [&_h5]:font-bold [&_h5]:text-slate-800 [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:list-decimal [&_ol]:pl-6 [&_a]:text-blue-600 [&_a]:underline"
                dangerouslySetInnerHTML={{ __html: articleForm.data.content || '<p className="text-slate-400 italic">Nội dung bài viết chưa được nhập...</p>' }}
              />

              {/* Booking CTA Box */}
              <div className="mt-8 bg-gradient-to-r from-[#004b87] to-[#00a896] text-white p-6 rounded-3xl shadow-lg text-center space-y-3">
                <h4 className="text-lg font-black uppercase">ĐẶT LỊCH THĂM KHÁM TIM MẠCH VỚI BSCKII ĐOÀN KHÔI</h4>
                <p className="text-xs text-blue-100">Bảo vệ sức khỏe tim mạch cho bạn và gia đình ngay hôm nay</p>
                <div className="pt-2">
                  <span className="px-6 py-2.5 bg-white text-[#004b87] font-black rounded-xl text-xs shadow-md inline-block">
                    📞 HOTLINE ĐẶT LỊCH: 038 432 6785
                  </span>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-white border-t border-slate-200 flex justify-between items-center px-8">
              <span className="text-xs text-slate-500 font-mono">
                Xem trước giao diện • {getArticleWordCount(articleForm.data.content)} từ
              </span>
              <button
                type="button"
                onClick={() => setShowArticlePreviewModal(false)}
                className="px-6 py-2.5 bg-[#004b87] text-white font-extrabold rounded-xl text-xs shadow-md cursor-pointer"
              >
                Đóng Chế Độ Xem Trước
              </button>
            </div>
          </div>
        </div>
      )}

      {/* UNIVERSAL MEDIA PICKER MODAL (WITH DRAG & DROP UPLOAD) */}
      {showMediaPickerModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-[70] flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 p-6 rounded-3xl max-w-6xl w-full text-xs space-y-4 shadow-2xl relative max-h-[90vh] flex flex-col">
            <button
              onClick={() => setShowMediaPickerModal(false)}
              className="absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-700 cursor-pointer"
            >
              <X size={20} />
            </button>

            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-100 pb-4 pr-8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#004b87] font-bold flex items-center justify-center shrink-0">
                  <FolderOpen size={20} />
                </div>
                <div>
                  <h3 className="text-base font-black text-[#004b87] uppercase tracking-wide">CHỌN HÌNH ẢNH TỪ QUẢN LÝ TỆP</h3>
                  <p className="text-xs text-slate-500 mt-0.5">Chọn hình có sẵn hoặc Kéo & thả tệp từ máy tính để tải lên</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="px-4 py-2.5 bg-[#004b87] hover:bg-[#003866] text-white font-extrabold rounded-xl text-xs flex items-center gap-2 cursor-pointer shadow-sm transition-all uppercase tracking-wider"
                >
                  <Upload size={14} /> Tải ảnh từ máy tính
                </button>
              </div>
            </div>

            {/* Hidden file input for upload button */}
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept="image/*"
              onChange={(e) => {
                if (e.target.files) handleUploadFiles(e.target.files);
              }}
              className="hidden"
            />

            {/* Two-Column Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start flex-grow overflow-hidden min-h-[350px]">
              
              {/* Left Sidebar: Folder Tree */}
              <div className="lg:col-span-3 bg-slate-50 border border-slate-200/80 rounded-2xl p-4 space-y-4 max-h-[55vh] overflow-y-auto">
                <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                  <h4 className="font-black text-slate-700 uppercase tracking-wider flex items-center gap-1.5 text-[11px]">
                    <FolderOpen size={14} className="text-[#004b87]" /> Thư mục
                  </h4>
                </div>

                <div className="space-y-1">
                  {/* Root Folder Item */}
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => setIsRootCollapsed(prev => !prev)}
                      className="p-1 text-[#004b87] hover:text-slate-700 cursor-pointer rounded-lg hover:bg-slate-200/50"
                    >
                      {isRootCollapsed ? <ChevronRight size={14} /> : <ChevronDown size={14} />}
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setCurrentFolderPath('root');
                        if (isRootCollapsed) setIsRootCollapsed(false);
                      }}
                      className={`flex-1 text-left px-2 py-1.5 rounded-xl flex items-center justify-between transition-all cursor-pointer font-bold ${
                        currentFolderPath === 'root'
                          ? 'bg-amber-100/60 text-amber-900 border border-amber-200'
                          : 'hover:bg-slate-200/30 text-slate-700'
                      }`}
                    >
                      <span className="flex items-center gap-1.5 truncate">
                        <FolderOpen size={13} className="text-amber-500 fill-amber-100" /> File Manager
                      </span>
                      <span className="px-1.5 py-0.2 bg-white/80 rounded text-[9px] text-slate-500 font-mono">{mediaFiles.length}</span>
                    </button>
                  </div>

                  {/* Hierarchical Folders */}
                  {!isRootCollapsed && (() => {
                    const sortFoldersHierarchically = (folderList: string[]) => {
                      const result: string[] = [];
                      const addChildren = (parentPath: string) => {
                        const children = folderList.filter(f => {
                          if (parentPath === 'root') {
                            return !f.includes('/');
                          }
                          const prefix = parentPath + '/';
                          return f.startsWith(prefix) && !f.slice(prefix.length).includes('/');
                        });
                        children.sort((a, b) => a.localeCompare(b));
                        for (const child of children) {
                          result.push(child);
                          addChildren(child);
                        }
                      };
                      addChildren('root');
                      return result;
                    };

                    const sortedFolders = sortFoldersHierarchically(folders);

                    return sortedFolders.map((fPath) => {
                      const depth = fPath.split('/').length - 1;
                      const folderName = fPath.split('/').pop();
                      const hasSubfolders = folders.some(child => child.startsWith(fPath + '/'));
                      const isCollapsed = collapsedFolders.includes(fPath);

                      const parts = fPath.split('/');
                      let isVisible = true;
                      for (let i = 1; i < parts.length; i++) {
                        const ancestor = parts.slice(0, i).join('/');
                        if (collapsedFolders.includes(ancestor)) {
                          isVisible = false;
                          break;
                        }
                      }

                      if (!isVisible) return null;

                      return (
                        <div
                          key={fPath}
                          style={{ paddingLeft: `${(depth + 1) * 8}px` }}
                          className="flex items-center gap-1"
                        >
                          {hasSubfolders ? (
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setCollapsedFolders(prev =>
                                  prev.includes(fPath) ? prev.filter(p => p !== fPath) : [...prev, fPath]
                                );
                              }}
                              className="p-1 text-slate-400 hover:text-slate-700 cursor-pointer rounded-lg hover:bg-slate-200/50"
                            >
                              {isCollapsed ? <ChevronRight size={13} /> : <ChevronDown size={13} />}
                            </button>
                          ) : (
                            <span className="w-4 text-center text-slate-300 font-mono text-[9px]">↳</span>
                          )}

                          <button
                            type="button"
                            onClick={() => {
                              setCurrentFolderPath(fPath);
                              if (isCollapsed) {
                                setCollapsedFolders(prev => prev.filter(p => p !== fPath));
                              }
                            }}
                            className={`flex-1 text-left px-2 py-1.5 rounded-xl flex items-center justify-between transition-all cursor-pointer text-xs ${
                              currentFolderPath === fPath
                                ? 'bg-amber-100/60 text-amber-900 border border-amber-200 font-bold'
                                : 'hover:bg-slate-200/30 text-slate-600'
                            }`}
                          >
                            <span className="flex items-center gap-1.5 truncate">
                              <FolderOpen size={12} className="text-amber-500 fill-amber-100 shrink-0" /> {folderName}
                            </span>
                          </button>
                        </div>
                      );
                    });
                  })()}
                </div>
              </div>

              {/* Right Panel */}
              <div className="lg:col-span-9 flex flex-col gap-4 overflow-hidden max-h-[55vh] w-full">
                
                {/* Drag Drop wrapping panel */}
                <div
                  className={`bg-white border-2 border-dashed rounded-2xl p-4 shadow-2xs transition-all flex flex-col flex-1 overflow-y-auto max-h-[52vh] ${
                    isDragOver ? 'border-[#004b87] bg-blue-50/40 ring-4 ring-[#004b87]/10' : 'border-slate-200'
                  }`}
                  onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
                  onDragLeave={() => setIsDragOver(false)}
                  onDrop={(e) => {
                    e.preventDefault();
                    setIsDragOver(false);
                    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
                      handleUploadFiles(e.dataTransfer.files);
                    }
                  }}
                >
                  
                  {/* Breadcrumbs & Search */}
                  <div className="flex flex-col sm:flex-row gap-3 justify-between items-stretch sm:items-center bg-slate-50 p-3 rounded-xl border border-slate-200 mb-3 shrink-0">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700 truncate">
                      <button
                        type="button"
                        onClick={() => setCurrentFolderPath('root')}
                        className={`hover:underline cursor-pointer flex items-center gap-1 shrink-0 ${currentFolderPath === 'root' ? 'text-[#004b87] font-black' : 'text-slate-600'}`}
                      >
                        <FolderOpen size={12} className="text-amber-500 fill-amber-100" /> File Manager
                      </button>
                      {currentFolderPath !== 'root' && (
                        currentFolderPath.split('/').map((segment, idx, arr) => {
                          const subPath = arr.slice(0, idx + 1).join('/');
                          const isLast = idx === arr.length - 1;
                          return (
                            <div key={subPath} className="flex items-center gap-1.5 truncate">
                              <ChevronRight size={10} className="text-slate-400 shrink-0" />
                              <button
                                type="button"
                                onClick={() => setCurrentFolderPath(subPath)}
                                className={`hover:underline cursor-pointer truncate ${isLast ? 'text-[#004b87] font-black' : 'text-slate-600 font-bold'}`}
                              >
                                {segment}
                              </button>
                            </div>
                          );
                        })
                      )}
                    </div>

                    <div className="relative w-full sm:w-60 shrink-0">
                      <Search size={13} className="absolute left-2.5 top-2 text-slate-400" />
                      <input
                        type="text"
                        placeholder="Tìm tên tệp hình ảnh..."
                        value={mediaSearchQuery}
                        onChange={(e) => setMediaSearchQuery(e.target.value)}
                        className="w-full pl-7 pr-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs outline-none focus:border-[#004b87]"
                      />
                    </div>
                  </div>

                  {/* Uploading indicator */}
                  {isUploadingMedia && (
                    <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl flex items-center justify-center gap-2 text-[11px] font-bold text-[#004b87] mb-3 shrink-0">
                      <div className="w-4 h-4 border-2 border-[#004b87] border-t-transparent rounded-full animate-spin" />
                      <span>Đang tải tệp hình ảnh lên máy chủ, vui lòng đợi...</span>
                    </div>
                  )}

                  {/* Subfolders inside this folder */}
                  {(() => {
                    const getDirectSubfolders = (parent: string) => {
                      if (parent === 'root') {
                        return folders.filter(f => !f.includes('/'));
                      }
                      const prefix = parent + '/';
                      return folders.filter(f => f.startsWith(prefix) && !f.slice(prefix.length).includes('/'));
                    };
                    const directSubfolders = getDirectSubfolders(currentFolderPath);

                    if (directSubfolders.length === 0) return null;

                    return (
                      <div className="space-y-2 mb-4 shrink-0">
                        <span className="text-[9px] font-extrabold text-slate-400 uppercase tracking-wider block">
                          Thư mục con ({directSubfolders.length})
                        </span>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                          {directSubfolders.map(subPath => {
                            const folderName = subPath.split('/').pop();
                            return (
                              <div
                                key={subPath}
                                onClick={() => setCurrentFolderPath(subPath)}
                                className="p-3 border border-slate-200 rounded-xl bg-slate-50 hover:bg-amber-50/50 hover:border-amber-300 transition-all cursor-pointer flex items-center gap-2 shadow-3xs group"
                              >
                                <FolderOpen size={24} className="text-amber-500 fill-amber-100 group-hover:scale-105 transition-transform shrink-0" />
                                <span className="text-[11px] font-bold text-slate-700 truncate" title={folderName}>
                                  {folderName}
                                </span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })()}

                  {/* Files inside this folder */}
                  <div className="flex-1 overflow-y-auto pr-1">
                    <span className="text-[9px] font-extrabold text-slate-400 uppercase tracking-wider block mb-2 shrink-0">
                      Danh sách hình ảnh ({mediaFiles.filter(m => m.filename.toLowerCase().includes(mediaSearchQuery.toLowerCase())).length})
                    </span>

                    {mediaFiles.filter(m => m.filename.toLowerCase().includes(mediaSearchQuery.toLowerCase())).length === 0 ? (
                      <div className="py-12 text-center text-slate-400 space-y-2 bg-slate-50/50 rounded-xl border border-slate-100">
                        <ImageIcon size={32} className="mx-auto text-slate-300" />
                        <p className="font-bold text-[11px] text-slate-500">Chưa có tệp hình ảnh nào khớp</p>
                      </div>
                    ) : (
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                        {mediaFiles
                          .filter(m => m.filename.toLowerCase().includes(mediaSearchQuery.toLowerCase()))
                          .map((media) => (
                            <div
                              key={media.id}
                              onClick={() => handleSelectMediaItem(media.url)}
                              className="group bg-slate-50 border border-slate-200 hover:border-[#004b87] rounded-xl overflow-hidden shadow-3xs hover:shadow-sm transition-all cursor-pointer flex flex-col relative"
                            >
                              <div className="h-24 bg-slate-200 overflow-hidden relative">
                                <img
                                  src={media.url}
                                  alt={media.filename}
                                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                                  onError={(e) => { (e.target as HTMLImageElement).src = '/assets/screening_service.png'; }}
                                />
                                <div className="absolute inset-0 bg-[#004b87]/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                  <span className="px-2.5 py-1 bg-[#004b87] text-white font-extrabold rounded-lg text-[10px] shadow-sm">
                                    ✓ Chọn ảnh này
                                  </span>
                                </div>
                              </div>
                              <div className="p-2 text-[10px] bg-white border-t border-slate-100">
                                <p className="font-bold text-slate-700 truncate" title={media.filename}>
                                  {media.filename}
                                </p>
                                <span className="text-[9px] text-slate-400 font-mono block mt-0.5">
                                  {media.file_size || 'JPG'}
                                </span>
                              </div>
                            </div>
                          ))}
                      </div>
                    )}
                  </div>

                </div>

              </div>

            </div>

            {/* Footer */}
            <div className="flex justify-end pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setShowMediaPickerModal(false)}
                className="px-5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs cursor-pointer shadow-3xs"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}

      {/* SERVICE PREVIEW MODAL */}
      {showServicePreviewModal && (
        <div className="fixed inset-0 bg-slate-900/70 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#f4f7fb] border border-slate-200 rounded-3xl max-w-4xl w-full space-y-6 shadow-2xl relative my-8 overflow-hidden text-slate-800">
            {/* Modal Header */}
            <div className="bg-[#004b87] text-white p-6 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-white/10 text-white font-bold flex items-center justify-center border border-white/20">
                  <Sparkles size={20} />
                </div>
                <div>
                  <h3 className="text-base font-black uppercase tracking-wider">CHẾ ĐỘ XEM TRƯỚC DỊCH VỤ Y KHOA</h3>
                  <p className="text-xs text-blue-100 mt-0.5">Mô phỏng giao diện chi tiết dịch vụ như bệnh nhân xem trên website</p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setShowServicePreviewModal(null)}
                className="p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-xl cursor-pointer transition-all"
              >
                <X size={22} />
              </button>
            </div>

            {/* Service Preview Content */}
            <div className="p-8 max-w-3xl mx-auto bg-white rounded-3xl shadow-sm space-y-6 border border-slate-200/80 my-4">
              <div className="space-y-3 border-b border-slate-100 pb-6">
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 bg-blue-50 text-[#004b87] font-extrabold rounded-lg text-xs border border-blue-200">
                    {showServicePreviewModal.pillar_title}
                  </span>
                  {showServicePreviewModal.is_featured && (
                    <span className="px-3 py-1 bg-amber-50 text-amber-700 font-extrabold rounded-lg text-xs border border-amber-200 flex items-center gap-1">
                      <Star size={12} fill="currentColor" /> Dịch Vụ Nổi Bật
                    </span>
                  )}
                </div>

                <h1 className="text-2xl sm:text-3xl font-black text-[#004b87] leading-tight">
                  {showServicePreviewModal.title}
                </h1>

                {showServicePreviewModal.tagline && (
                  <p className="text-sm font-bold text-[#00a896]">
                    "{showServicePreviewModal.tagline}"
                  </p>
                )}

                <div className="flex items-center justify-between bg-slate-50 p-4 rounded-2xl border border-slate-200/60 font-mono mt-4">
                  <div>
                    <span className="text-xs text-slate-500 block font-sans">Chi phí niêm yết:</span>
                    <span className="text-xl font-black text-slate-900">{showServicePreviewModal.price}</span>
                  </div>
                  {showServicePreviewModal.estimated_time && (
                    <div className="text-right">
                      <span className="text-xs text-slate-500 block font-sans">Thời gian khám:</span>
                      <span className="text-sm font-bold text-slate-700">{showServicePreviewModal.estimated_time}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Service Featured Image */}
              {showServicePreviewModal.image && (
                <div className="rounded-3xl overflow-hidden shadow-md max-h-80 border border-slate-200">
                  <img
                    src={showServicePreviewModal.image}
                    alt={showServicePreviewModal.title}
                    className="w-full h-full object-cover"
                    onError={(e) => { (e.target as HTMLImageElement).src = '/assets/screening_service.png'; }}
                  />
                </div>
              )}

              {/* Excerpt */}
              {showServicePreviewModal.description && (
                <div className="space-y-2">
                  <h4 className="text-xs font-black text-slate-700 uppercase tracking-wider">Mô tả tóm tắt:</h4>
                  <p className="text-xs text-slate-600 leading-relaxed bg-blue-50/40 p-4 rounded-2xl border border-blue-100/70">
                    {showServicePreviewModal.description}
                  </p>
                </div>
              )}

              {/* Includes Grid */}
              {showServicePreviewModal.includes && showServicePreviewModal.includes.length > 0 && (
                <div className="space-y-3 pt-2">
                  <h4 className="text-xs font-black text-[#004b87] uppercase tracking-wider">HẠNG MỤC KHÁM BAO GỒM:</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {showServicePreviewModal.includes.map((inc, i) => (
                      <div key={i} className="flex items-center gap-2 p-3 bg-slate-50 rounded-xl border border-slate-200/60 text-xs font-bold text-slate-800">
                        <CheckCircle2 size={16} className="text-[#00a896] shrink-0" />
                        <span>{inc}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Candidates Grid */}
              {showServicePreviewModal.candidates && showServicePreviewModal.candidates.length > 0 && (
                <div className="space-y-3 pt-2">
                  <h4 className="text-xs font-black text-amber-700 uppercase tracking-wider">ĐỐI TƯỢNG CHỈ ĐỊNH NÊN KHÁM:</h4>
                  <div className="space-y-1.5">
                    {showServicePreviewModal.candidates.map((cand, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-slate-700 font-medium">
                        <span className="w-2 h-2 rounded-full bg-amber-500 shrink-0" />
                        <span>{cand}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Detailed Description HTML */}
              {showServicePreviewModal.detailed_description && (
                <div className="space-y-3 pt-4 border-t border-slate-100">
                  <h4 className="text-xs font-black text-slate-700 uppercase tracking-wider">QUY TRÌNH & PHÁC ĐỒ ĐIỀU TRỊ CHI TIẾT:</h4>
                  <div
                    className="prose prose-slate max-w-none text-xs text-slate-700 leading-relaxed [&_h4]:text-base [&_h4]:font-bold [&_h4]:text-[#004b87] [&_ul]:list-disc [&_ul]:pl-5"
                    dangerouslySetInnerHTML={{ __html: showServicePreviewModal.detailed_description }}
                  />
                </div>
              )}

              {/* Booking CTA Button */}
              <div className="mt-8 bg-gradient-to-r from-[#004b87] to-[#00a896] text-white p-6 rounded-3xl shadow-lg text-center space-y-3">
                <h4 className="text-base font-black uppercase">ĐẶT LỊCH HẸN KHÁM GÓI DỊCH VỤ NÀY</h4>
                <p className="text-xs text-blue-100">Được trực tiếp BSCKII Đoàn Khôi thăm khám và tư vấn</p>
                <div className="pt-2">
                  <span className="px-6 py-2.5 bg-white text-[#004b87] font-black rounded-xl text-xs shadow-md inline-block">
                    Đặt Lịch Ngay Qua Hotline: 038 432 6785
                  </span>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-white border-t border-slate-200 flex justify-between items-center px-8">
              <span className="text-xs text-slate-500 font-mono">
                Xem trước giao diện dịch vụ khách hàng
              </span>
              <button
                type="button"
                onClick={() => setShowServicePreviewModal(null)}
                className="px-6 py-2.5 bg-[#004b87] text-white font-extrabold rounded-xl text-xs shadow-md cursor-pointer"
              >
                Đóng Chế Độ Xem Trước
              </button>
            </div>
          </div>
        </div>
      )}

      {/* DOCTOR PREVIEW MODAL */}
      {showDoctorPreviewModal && (
        <div className="fixed inset-0 bg-slate-900/70 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#f4f7fb] border border-slate-200 rounded-3xl max-w-3xl w-full space-y-6 shadow-2xl relative my-8 overflow-hidden text-slate-800">
            <div className="bg-[#004b87] text-white p-6 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-white/10 text-white font-bold flex items-center justify-center border border-white/20">
                  <UserCheck size={20} />
                </div>
                <div>
                  <h3 className="text-base font-black uppercase tracking-wider">XEM TRƯỚC HỒ SƠ BÁC SĨ</h3>
                  <p className="text-xs text-blue-100 mt-0.5">Mô phỏng trang chi tiết bác sĩ hiển thị cho bệnh nhân</p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setShowDoctorPreviewModal(null)}
                className="p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-xl cursor-pointer transition-all"
              >
                <X size={22} />
              </button>
            </div>

            <div className="p-8 max-w-2xl mx-auto bg-white rounded-3xl shadow-sm space-y-6 border border-slate-200/80 my-4 text-center">
              <div className="relative w-32 h-32 rounded-full overflow-hidden mx-auto border-4 border-[#004b87]/20 shadow-xl">
                <img src={showDoctorPreviewModal.avatar || '/assets/doctor_khoi.png'} alt={showDoctorPreviewModal.name} className="w-full h-full object-cover" />
              </div>

              <div>
                <h1 className="text-2xl font-black text-[#004b87]">{showDoctorPreviewModal.name}</h1>
                <p className="text-sm font-bold text-emerald-700 mt-1">{showDoctorPreviewModal.specialty}</p>
                <span className="inline-block mt-2 px-3 py-1 bg-blue-50 text-[#004b87] font-bold rounded-lg text-xs border border-blue-200">
                  {showDoctorPreviewModal.experience}
                </span>
              </div>

              {showDoctorPreviewModal.bio && (
                <p className="text-xs text-slate-600 leading-relaxed bg-blue-50/40 p-4 rounded-2xl border border-blue-100 text-left">
                  {showDoctorPreviewModal.bio}
                </p>
              )}

              {showDoctorPreviewModal.detailed_bio && (
                <div className="space-y-3 pt-4 border-t border-slate-100 text-left">
                  <h4 className="text-xs font-black text-slate-700 uppercase tracking-wider">QUÁ TRÌNH ĐÀO TẠO & HỒ SƠ CHUYÊN MÔN:</h4>
                  <div
                    className="prose prose-slate max-w-none text-xs text-slate-700 leading-relaxed [&_h4]:text-base [&_h4]:font-bold [&_h4]:text-[#004b87] [&_ul]:list-disc [&_ul]:pl-5"
                    dangerouslySetInnerHTML={{ __html: showDoctorPreviewModal.detailed_bio }}
                  />
                </div>
              )}
            </div>

            <div className="p-4 bg-white border-t border-slate-200 flex justify-end px-8">
              <button
                type="button"
                onClick={() => setShowDoctorPreviewModal(null)}
                className="px-6 py-2.5 bg-[#004b87] text-white font-extrabold rounded-xl text-xs shadow-md cursor-pointer"
              >
                Đóng Chế Độ Xem Trước
              </button>
            </div>
          </div>
        </div>
      )}

      {/* RESULT PREVIEW MODAL */}
      {showResultPreviewModal && (
        <div className="fixed inset-0 bg-slate-900/70 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#f4f7fb] border border-slate-200 rounded-3xl max-w-3xl w-full space-y-6 shadow-2xl relative my-8 overflow-hidden text-slate-800">
            <div className="bg-[#004b87] text-white p-6 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-white/10 text-white font-bold flex items-center justify-center border border-white/20">
                  <CheckCircle2 size={20} />
                </div>
                <div>
                  <h3 className="text-base font-black uppercase tracking-wider">XEM TRƯỚC CA ĐIỀU TRỊ THỰC TẾ</h3>
                  <p className="text-xs text-blue-100 mt-0.5">Mô phỏng ca lâm sàng thực tế hiển thị cho bệnh nhân</p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setShowResultPreviewModal(null)}
                className="p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-xl cursor-pointer transition-all"
              >
                <X size={22} />
              </button>
            </div>

            <div className="p-8 max-w-2xl mx-auto bg-white rounded-3xl shadow-sm space-y-6 border border-slate-200/80 my-4">
              <div className="border-b border-slate-100 pb-4 space-y-2">
                <span className="px-3 py-1 bg-emerald-50 text-emerald-700 font-extrabold rounded-lg text-xs border border-emerald-200">
                  {showResultPreviewModal.diagnosis}
                </span>
                <h1 className="text-2xl font-black text-[#004b87]">{showResultPreviewModal.patient_title}</h1>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {showResultPreviewModal.before_image && (
                  <div className="space-y-1">
                    <span className="text-[11px] font-extrabold text-slate-500 uppercase">Trước điều trị (Before):</span>
                    <img src={showResultPreviewModal.before_image} alt="Before" className="w-full h-44 object-cover rounded-2xl border border-slate-200" />
                  </div>
                )}
                {showResultPreviewModal.after_image && (
                  <div className="space-y-1">
                    <span className="text-[11px] font-extrabold text-emerald-600 uppercase">Sau điều trị (After):</span>
                    <img src={showResultPreviewModal.after_image} alt="After" className="w-full h-44 object-cover rounded-2xl border border-slate-200" />
                  </div>
                )}
              </div>

              {showResultPreviewModal.outcome && (
                <div className="space-y-2">
                  <h4 className="text-xs font-black text-slate-700 uppercase tracking-wider">TÓM TẮT KẾT QUẢ ĐIỀU TRỊ:</h4>
                  <p className="text-xs text-slate-600 leading-relaxed bg-emerald-50/50 p-4 rounded-2xl border border-emerald-100">
                    {showResultPreviewModal.outcome}
                  </p>
                </div>
              )}

              {showResultPreviewModal.detailed_case && (
                <div className="space-y-3 pt-4 border-t border-slate-100 text-left">
                  <h4 className="text-xs font-black text-slate-700 uppercase tracking-wider">DIỄN TIẾN CA LÂM SÀNG CHI TIẾT:</h4>
                  <div
                    className="prose prose-slate max-w-none text-xs text-slate-700 leading-relaxed [&_h4]:text-base [&_h4]:font-bold [&_h4]:text-[#004b87] [&_ul]:list-disc [&_ul]:pl-5"
                    dangerouslySetInnerHTML={{ __html: showResultPreviewModal.detailed_case }}
                  />
                </div>
              )}
            </div>

            <div className="p-4 bg-white border-t border-slate-200 flex justify-end px-8">
              <button
                type="button"
                onClick={() => setShowResultPreviewModal(null)}
                className="px-6 py-2.5 bg-[#004b87] text-white font-extrabold rounded-xl text-xs shadow-md cursor-pointer"
              >
                Đóng Chế Độ Xem Trước
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CREATE & EDIT REVIEW MODAL */}
      {showReviewModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 p-8 rounded-3xl max-w-lg w-full text-xs space-y-5 shadow-2xl relative">
            <button
              onClick={() => setShowReviewModal(false)}
              className="absolute top-6 right-6 p-2 text-slate-400 hover:text-slate-700 cursor-pointer"
            >
              <X size={20} />
            </button>

            <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#004b87] font-bold flex items-center justify-center">
                <MessageSquare size={20} />
              </div>
              <div>
                <h3 className="text-base font-black text-[#004b87]">
                  {editingReview ? 'Chỉnh Sửa Đánh Giá Bệnh Nhân' : 'Thêm Mới Đánh Giá Bệnh Nhân'}
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">Nhập đầy đủ tên bệnh nhân, dịch vụ, số sao và nội dung nhận xét</p>
              </div>
            </div>

            <form onSubmit={handleSaveReview} className="space-y-4">
              <div>
                <label className="block text-slate-700 font-bold mb-1.5">Họ và tên bệnh nhân *</label>
                <input
                  type="text"
                  required
                  placeholder="VD: Bác Trần Văn Hùng (68 tuổi)"
                  value={reviewForm.data.patient_name}
                  onChange={(e) => reviewForm.setData('patient_name', e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-800 outline-none focus:border-[#004b87] focus:bg-white font-bold"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1.5">Gói dịch vụ đã thăm khám</label>
                <input
                  type="text"
                  placeholder="VD: Tầm soát tăng huyết áp & Holter 24h"
                  value={reviewForm.data.service_name}
                  onChange={(e) => reviewForm.setData('service_name', e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-800 outline-none focus:border-[#004b87] focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1.5">Điểm xếp hạng (Rating 1 - 5 sao)</label>
                <div className="flex items-center gap-2 bg-slate-50 p-3 rounded-xl border border-slate-200">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => reviewForm.setData('rating', star)}
                      className="p-1 hover:scale-125 transition-transform cursor-pointer"
                    >
                      <Star
                        size={22}
                        className={star <= reviewForm.data.rating ? 'fill-amber-400 text-amber-500' : 'text-slate-300'}
                      />
                    </button>
                  ))}
                  <span className="ml-2 font-black text-amber-700 text-sm font-mono">{reviewForm.data.rating} Sao</span>
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1.5">Nội dung đánh giá & nhận xét *</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Nhập nội dung nhận xét chi tiết của bệnh nhân..."
                  value={reviewForm.data.comment}
                  onChange={(e) => reviewForm.setData('comment', e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-800 outline-none focus:border-[#004b87] focus:bg-white resize-none leading-relaxed"
                />
              </div>

              <div className="flex items-center justify-between p-3 bg-blue-50/50 rounded-xl border border-blue-100">
                <div>
                  <span className="block font-bold text-slate-800 text-xs">Trạng thái Phê Duyệt</span>
                  <span className="text-[11px] text-slate-500">Cho phép hiển thị nhận xét này lên trang chủ website</span>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={reviewForm.data.is_approved}
                    onChange={(e) => reviewForm.setData('is_approved', e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
                </label>
              </div>

              <div className="flex justify-end gap-3 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowReviewModal(false)}
                  className="px-4 py-2 bg-slate-100 text-slate-700 font-bold rounded-xl text-xs hover:bg-slate-200"
                >
                  Hủy bỏ
                </button>
                <button
                  type="submit"
                  disabled={reviewForm.processing}
                  className="px-6 py-2 bg-[#004b87] hover:bg-[#003866] text-white font-extrabold rounded-xl text-xs shadow-md transition-all uppercase tracking-wider"
                >
                  {editingReview ? 'LƯU CẬP NHẬT' : 'THÊM ĐÁNH GIÁ'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* CREATE & EDIT BANNER MODAL (EXACT MATCH USER MOCKUP) */}
      {showBannerModal && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white border border-slate-200 p-8 rounded-3xl max-w-3xl w-full text-xs space-y-6 shadow-2xl relative my-8 text-slate-800">
            <div className="flex justify-between items-center border-b border-slate-100 pb-4">
              <h3 className="text-base font-extrabold text-[#004b87]">
                {editingBanner ? 'Chỉnh sửa slide banner' : 'Thêm mới slide banner'}
              </h3>
              <button
                type="button"
                onClick={() => setShowBannerModal(false)}
                className="p-2 text-slate-400 hover:text-slate-700 cursor-pointer rounded-lg hover:bg-slate-100"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSaveBanner} className="space-y-5">
              {/* Row 1: NHÃN PHỤ & TIÊU ĐỀ CHÍNH */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-extrabold text-slate-600 uppercase mb-1.5">
                    NHÃN PHỤ (EYEBROW)
                  </label>
                  <input
                    type="text"
                    placeholder="KT Beauty Medical Centre"
                    value={bannerForm.data.eyebrow}
                    onChange={(e) => bannerForm.setData('eyebrow', e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-800 outline-none focus:border-[#004b87] focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-extrabold text-slate-600 uppercase mb-1.5">
                    TIÊU ĐỀ CHÍNH (TITLE) *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Kiến tạo"
                    value={bannerForm.data.title}
                    onChange={(e) => bannerForm.setData('title', e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-800 outline-none focus:border-[#004b87] focus:bg-white font-bold"
                  />
                </div>
              </div>

              {/* Row 2: TIÊU ĐỀ PHỤ & MÔ TẢ */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-extrabold text-slate-600 uppercase mb-1.5">
                    TIÊU ĐỀ PHỤ (SUBTITLE)
                  </label>
                  <input
                    type="text"
                    placeholder="Vẻ đẹp độc bản"
                    value={bannerForm.data.subtitle}
                    onChange={(e) => bannerForm.setData('subtitle', e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-800 outline-none focus:border-[#004b87] focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-extrabold text-slate-600 uppercase mb-1.5">
                    MÔ TẢ (SUBHEADING)
                  </label>
                  <input
                    type="text"
                    placeholder="KT Beauty Medical Centre mang đến dịch vụ thẩm mỹ chuẩn..."
                    value={bannerForm.data.subheading}
                    onChange={(e) => bannerForm.setData('subheading', e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-800 outline-none focus:border-[#004b87] focus:bg-white"
                  />
                </div>
              </div>

              {/* Row 3: ẢNH PC & ẢNH MOBILE */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* ẢNH PC (DESKTOP IMAGE) */}
                <div>
                  <label className="block text-[11px] font-extrabold text-slate-600 uppercase mb-1.5">
                    ẢNH PC (DESKTOP IMAGE) <span className="text-rose-500">*</span>
                  </label>
                  <div className="w-full h-44 rounded-2xl overflow-hidden bg-slate-50 relative border-2 border-dashed border-slate-300 group flex flex-col justify-between">
                    {bannerForm.data.desktop_image ? (
                      <img
                        src={bannerForm.data.desktop_image}
                        alt="Desktop Preview"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center text-slate-400 space-y-2 p-4 text-center">
                        <FolderOpen size={36} className="text-slate-400" />
                        <span className="text-xs font-bold text-slate-500">Chưa chọn ảnh desktop</span>
                      </div>
                    )}

                    <div className="absolute inset-x-0 bottom-0 p-2.5 bg-white/95 backdrop-blur-xs flex items-center justify-between gap-2 border-t border-slate-200/80 shadow-xs">
                      <span className="text-[10px] font-bold text-slate-600 truncate font-mono max-w-[170px]" title={bannerForm.data.desktop_image}>
                        {bannerForm.data.desktop_image || '/assets/heart_care.png'}
                      </span>
                      <div className="flex items-center gap-1.5 shrink-0">
                        {bannerForm.data.desktop_image && (
                          <button
                            type="button"
                            onClick={() => bannerForm.setData('desktop_image', '')}
                            className="text-rose-600 hover:text-rose-700 font-extrabold text-[11px] px-2 py-1 rounded cursor-pointer"
                          >
                            Xóa
                          </button>
                        )}
                        <button
                          type="button"
                          onClick={() => handleOpenMediaPicker('banner_desktop')}
                          className="bg-[#004b87] hover:bg-[#003866] text-white font-extrabold text-[11px] px-3 py-1.5 rounded-xl shadow-xs transition-all cursor-pointer flex items-center gap-1"
                        >
                          Đổi ảnh <FolderOpen size={11} className="text-white fill-white/20" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* ẢNH MOBILE (TÙY CHỌN) */}
                <div>
                  <label className="block text-[11px] font-extrabold text-slate-600 uppercase mb-1.5">
                    ẢNH MOBILE (TÙY CHỌN)
                  </label>
                  <div className="w-full h-44 rounded-2xl overflow-hidden bg-slate-50 relative border-2 border-dashed border-slate-300 group flex flex-col justify-between">
                    {bannerForm.data.mobile_image ? (
                      <img
                        src={bannerForm.data.mobile_image}
                        alt="Mobile Preview"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center text-slate-400 space-y-2 p-4 text-center">
                        <FolderOpen size={36} className="text-slate-400" />
                        <span className="text-xs font-bold text-slate-500">Dùng chung ảnh Desktop nếu bỏ trống</span>
                      </div>
                    )}

                    <div className="absolute inset-x-0 bottom-0 p-2.5 bg-white/95 backdrop-blur-xs flex items-center justify-between gap-2 border-t border-slate-200/80 shadow-xs">
                      <span className="text-[10px] font-bold text-slate-600 truncate font-mono max-w-[170px]" title={bannerForm.data.mobile_image}>
                        {bannerForm.data.mobile_image || 'Tự động lấy ảnh Desktop'}
                      </span>
                      <div className="flex items-center gap-1.5 shrink-0">
                        {bannerForm.data.mobile_image && (
                          <button
                            type="button"
                            onClick={() => bannerForm.setData('mobile_image', '')}
                            className="text-rose-600 hover:text-rose-700 font-extrabold text-[11px] px-2 py-1 rounded cursor-pointer"
                          >
                            Xóa
                          </button>
                        )}
                        <button
                          type="button"
                          onClick={() => handleOpenMediaPicker('banner_mobile')}
                          className="bg-[#004b87] hover:bg-[#003866] text-white font-extrabold text-[11px] px-3 py-1.5 rounded-xl shadow-xs transition-all cursor-pointer flex items-center gap-1"
                        >
                          Đổi ảnh <FolderOpen size={11} className="text-white fill-white/20" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* NÚT LIÊN KẾT CHÍNH (PRIMARY CTA) */}
              <div className="pt-2 space-y-3">
                <span className="block text-[11px] font-extrabold text-amber-800 uppercase tracking-wider">
                  NÚT LIÊN KẾT CHÍNH (PRIMARY CTA)
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">
                      CHỮ HIỂN THỊ
                    </label>
                    <input
                      type="text"
                      placeholder="Đặt Lịch Khám Ngay"
                      value={bannerForm.data.primary_button_text}
                      onChange={(e) => bannerForm.setData('primary_button_text', e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-800 outline-none focus:border-[#004b87] focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">
                      ĐƯỜNG DẪN LIÊN KẾT
                    </label>
                    <input
                      type="text"
                      placeholder="/dat-lich"
                      value={bannerForm.data.primary_button_link}
                      onChange={(e) => bannerForm.setData('primary_button_link', e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-800 outline-none focus:border-[#004b87] focus:bg-white font-mono"
                    />
                  </div>
                </div>
              </div>

              {/* NÚT LIÊN KẾT PHỤ (SECONDARY CTA) */}
              <div className="pt-2 space-y-3">
                <span className="block text-[11px] font-extrabold text-amber-800 uppercase tracking-wider">
                  NÚT LIÊN KẾT PHỤ (SECONDARY CTA)
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">
                      CHỮ HIỂN THỊ
                    </label>
                    <input
                      type="text"
                      placeholder="Tìm Hiểu Dịch Vụ"
                      value={bannerForm.data.secondary_button_text}
                      onChange={(e) => bannerForm.setData('secondary_button_text', e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-800 outline-none focus:border-[#004b87] focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">
                      ĐƯỜNG DẪN LIÊN KẾT
                    </label>
                    <input
                      type="text"
                      placeholder="#services"
                      value={bannerForm.data.secondary_button_link}
                      onChange={(e) => bannerForm.setData('secondary_button_link', e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-800 outline-none focus:border-[#004b87] focus:bg-white font-mono"
                    />
                  </div>
                </div>
              </div>

              {/* THỨ TỰ HIỂN THỊ & HIỂN THỊ NGAY */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div>
                  <label className="block text-[11px] font-extrabold text-slate-600 uppercase mb-1.5">
                    THỨ TỰ HIỂN THỊ (ORDER)
                  </label>
                  <input
                    type="number"
                    value={bannerForm.data.order}
                    onChange={(e) => bannerForm.setData('order', Number(e.target.value))}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-800 outline-none focus:border-[#004b87] focus:bg-white font-mono font-bold"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-extrabold text-slate-600 uppercase mb-1.5">
                    HIỂN THỊ NGAY
                  </label>
                  <select
                    value={bannerForm.data.is_active ? 'active' : 'inactive'}
                    onChange={(e) => bannerForm.setData('is_active', e.target.value === 'active')}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-800 font-bold outline-none focus:border-[#004b87] cursor-pointer"
                  >
                    <option value="active">Kích hoạt</option>
                    <option value="inactive">Tạm ẩn</option>
                  </select>
                </div>
              </div>

              {/* FOOTER BUTTONS */}
              <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowBannerModal(false)}
                  className="px-6 py-2.5 bg-slate-100 text-slate-700 font-bold rounded-xl text-xs hover:bg-slate-200 cursor-pointer transition-all"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  disabled={bannerForm.processing}
                  className="px-8 py-2.5 bg-[#b89a67] hover:bg-[#a38654] text-white font-extrabold rounded-xl text-xs shadow-md cursor-pointer transition-all uppercase tracking-wider"
                >
                  Lưu lại
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}

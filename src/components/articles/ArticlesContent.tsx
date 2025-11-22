'use client'

import * as React from 'react'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import CardActions from '@mui/material/CardActions'
import Grid from '@mui/material/GridLegacy'
import IconButton from '@mui/material/IconButton'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import TextField from '@mui/material/TextField'
import MenuItem from '@mui/material/MenuItem'
import Alert from '@mui/material/Alert'
import CircularProgress from '@mui/material/CircularProgress'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import AddIcon from '@mui/icons-material/Add'
import FormatBoldIcon from '@mui/icons-material/FormatBold'
import FormatItalicIcon from '@mui/icons-material/FormatItalic'
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted'
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered'
import FormatQuoteIcon from '@mui/icons-material/FormatQuote'
import CodeIcon from '@mui/icons-material/Code'
import { Article } from '@/types/database'
import { getAllArticles, createArticle, updateArticle, deleteArticle, uploadImage } from '@/utils/articles-client'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Placeholder from '@tiptap/extension-placeholder'

const CATEGORIES = [
  'Technology',
  'Science',
  'Health',
  'Education',
  'Business',
  'Lifestyle',
  'Other',
]

interface ArticleFormData {
  title: string
  body: string
  category: string
  thumbnail: File | null
  thumbnailUrl: string | null
}

export default function ArticlesContent() {
  const [articles, setArticles] = React.useState<Article[]>([])
  const [loading, setLoading] = React.useState(true)
  const [openDialog, setOpenDialog] = React.useState(false)
  const [editingArticle, setEditingArticle] = React.useState<Article | null>(null)
  const [formData, setFormData] = React.useState<ArticleFormData>({
    title: '',
    body: '',
    category: '',
    thumbnail: null,
    thumbnailUrl: null,
  })
  const [error, setError] = React.useState<string | null>(null)
  const [submitting, setSubmitting] = React.useState(false)

  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: 'Write your article content here...',
      }),
    ],
    content: formData.body,
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      setFormData((prev) => ({ ...prev, body: editor.getHTML() }))
    },
    editorProps: {
      attributes: {
        class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none',
      },
    },
  })

  React.useEffect(() => {
    loadArticles()
  }, [])

  React.useEffect(() => {
    if (editor && openDialog) {
      editor.commands.setContent(formData.body)
    }
  }, [editor, formData.body, openDialog])

  const loadArticles = async () => {
    try {
      setLoading(true)
      const data = await getAllArticles()
      setArticles(data)
    } catch (err) {
      setError('Failed to load articles')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleOpenDialog = (article?: Article) => {
    if (article) {
      setEditingArticle(article)
      setFormData({
        title: article.title,
        body: article.body,
        category: article.category || '',
        thumbnail: null,
        thumbnailUrl: article.thumbnail_url,
      })
    } else {
      setEditingArticle(null)
      setFormData({
        title: '',
        body: '',
        category: '',
        thumbnail: null,
        thumbnailUrl: null,
      })
    }
    setError(null)
    setOpenDialog(true)
  }

  const handleCloseDialog = () => {
    setOpenDialog(false)
    setEditingArticle(null)
    setFormData({
      title: '',
      body: '',
      category: '',
      thumbnail: null,
      thumbnailUrl: null,
    })
    setError(null)
  }

  const handleSubmit = async () => {
    if (!formData.title.trim() || !formData.body.trim()) {
      setError('Title and body are required')
      return
    }

    try {
      setSubmitting(true)
      setError(null)

      let thumbnailUrl = formData.thumbnailUrl

      // Upload thumbnail if a new file is selected
      if (formData.thumbnail) {
        const timestamp = Date.now()
        const fileName = `${timestamp}-${formData.thumbnail.name}`
        thumbnailUrl = await uploadImage(formData.thumbnail, fileName)
      }

      if (editingArticle) {
        await updateArticle(editingArticle.id, {
          title: formData.title,
          body: formData.body,
          category: formData.category || null,
          thumbnail_url: thumbnailUrl,
        })
      } else {
        await createArticle({
          title: formData.title,
          body: formData.body,
          category: formData.category || null,
          thumbnail_url: thumbnailUrl,
        })
      }

      handleCloseDialog()
      loadArticles()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save article')
      console.error(err)
    } finally {
      setSubmitting(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this article?')) {
      return
    }

    try {
      await deleteArticle(id)
      loadArticles()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete article')
      console.error(err)
    }
  }

  const handleThumbnailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setFormData((prev) => ({
        ...prev,
        thumbnail: file,
        thumbnailUrl: URL.createObjectURL(file),
      }))
    }
  }

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 400 }}>
        <CircularProgress />
      </Box>
    )
  }

  return (
    <Box sx={{ width: '100%', maxWidth: 1200, p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1">
          Articles
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog()}
        >
          Create Article
        </Button>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError(null)}>
          {error}
        </Alert>
      )}

      {articles.length === 0 ? (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Typography variant="body1" color="text.secondary">
            No articles yet. Create your first article!
          </Typography>
        </Box>
      ) : (
        <Grid container spacing={3}>
          {articles.map((article) => (
            <Grid item xs={12} sm={6} md={4} key={article.id}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                {article.thumbnail_url && (
                  <CardMedia
                    component="img"
                    height="200"
                    image={article.thumbnail_url}
                    alt={article.title}
                    sx={{ objectFit: 'cover' }}
                  />
                )}
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h6" component="h2" gutterBottom noWrap>
                    {article.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      mb: 1,
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      display: '-webkit-box',
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: 'vertical',
                    }}
                    dangerouslySetInnerHTML={{
                      __html: article.body.substring(0, 150) + '...',
                    }}
                  />
                  {article.category && (
                    <Typography variant="caption" color="primary" sx={{ display: 'block', mt: 1 }}>
                      {article.category}
                    </Typography>
                  )}
                </CardContent>
                <CardActions>
                  <IconButton
                    size="small"
                    onClick={() => handleOpenDialog(article)}
                    aria-label="edit"
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    size="small"
                    onClick={() => handleDelete(article.id)}
                    aria-label="delete"
                    color="error"
                  >
                    <DeleteIcon />
                  </IconButton>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        <DialogTitle>{editingArticle ? 'Edit Article' : 'Create Article'}</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 1 }}>
            <TextField
              label="Title"
              fullWidth
              value={formData.title}
              onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
              required
            />
            <TextField
              select
              label="Category"
              fullWidth
              value={formData.category}
              onChange={(e) => setFormData((prev) => ({ ...prev, category: e.target.value }))}
            >
              {CATEGORIES.map((category) => (
                <MenuItem key={category} value={category}>
                  {category}
                </MenuItem>
              ))}
            </TextField>
            <Box>
              <Typography variant="body2" sx={{ mb: 1 }}>
                Thumbnail
              </Typography>
              <input
                type="file"
                accept="image/*"
                onChange={handleThumbnailChange}
                style={{ marginBottom: 8 }}
              />
              {formData.thumbnailUrl && (
                <Box
                  component="img"
                  src={formData.thumbnailUrl}
                  alt="Thumbnail preview"
                  sx={{ maxWidth: '100%', maxHeight: 200, mt: 1, borderRadius: 1 }}
                />
              )}
            </Box>
            <Box>
              <Typography variant="body2" sx={{ mb: 1 }}>
                Body <span style={{ color: 'red' }}>*</span>
              </Typography>
              <Box
                sx={{
                  border: '1px solid',
                  borderColor: 'divider',
                  borderRadius: 1,
                  overflow: 'hidden',
                }}
              >
                {editor && (
                  <Box
                    sx={{
                      borderBottom: '1px solid',
                      borderColor: 'divider',
                      p: 1,
                      display: 'flex',
                      gap: 0.5,
                      flexWrap: 'wrap',
                    }}
                  >
                    <IconButton
                      size="small"
                      onClick={() => editor.chain().focus().toggleBold().run()}
                      color={editor.isActive('bold') ? 'primary' : 'default'}
                      aria-label="bold"
                    >
                      <FormatBoldIcon fontSize="small" />
                    </IconButton>
                    <IconButton
                      size="small"
                      onClick={() => editor.chain().focus().toggleItalic().run()}
                      color={editor.isActive('italic') ? 'primary' : 'default'}
                      aria-label="italic"
                    >
                      <FormatItalicIcon fontSize="small" />
                    </IconButton>
                    <IconButton
                      size="small"
                      onClick={() => editor.chain().focus().toggleBulletList().run()}
                      color={editor.isActive('bulletList') ? 'primary' : 'default'}
                      aria-label="bullet list"
                    >
                      <FormatListBulletedIcon fontSize="small" />
                    </IconButton>
                    <IconButton
                      size="small"
                      onClick={() => editor.chain().focus().toggleOrderedList().run()}
                      color={editor.isActive('orderedList') ? 'primary' : 'default'}
                      aria-label="ordered list"
                    >
                      <FormatListNumberedIcon fontSize="small" />
                    </IconButton>
                    <IconButton
                      size="small"
                      onClick={() => editor.chain().focus().toggleBlockquote().run()}
                      color={editor.isActive('blockquote') ? 'primary' : 'default'}
                      aria-label="blockquote"
                    >
                      <FormatQuoteIcon fontSize="small" />
                    </IconButton>
                    <IconButton
                      size="small"
                      onClick={() => editor.chain().focus().toggleCode().run()}
                      color={editor.isActive('code') ? 'primary' : 'default'}
                      aria-label="code"
                    >
                      <CodeIcon fontSize="small" />
                    </IconButton>
                  </Box>
                )}
                <Box
                  sx={{
                    p: 2,
                    minHeight: 300,
                    '& .ProseMirror': {
                      outline: 'none',
                      minHeight: 250,
                      '& p.is-editor-empty:first-child::before': {
                        content: 'attr(data-placeholder)',
                        float: 'left',
                        color: 'text.disabled',
                        pointerEvents: 'none',
                        height: 0,
                      },
                    },
                  }}
                >
                  {editor && <EditorContent editor={editor} />}
                </Box>
              </Box>
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} disabled={submitting}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} variant="contained" disabled={submitting}>
            {submitting ? <CircularProgress size={20} /> : editingArticle ? 'Update' : 'Create'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}
